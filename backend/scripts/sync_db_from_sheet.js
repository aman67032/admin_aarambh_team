const mongoose = require('mongoose');
const dotenv = require('dotenv');
const path = require('path');
const https = require('https');
const Student = require('../models/Student');

dotenv.config({ path: path.join(__dirname, '../.env') });

const normalizeAppNo = (val) => (val || '').replace(/[\/\.\s_-]/g, '').replace('2025', '2026').toUpperCase();

const fetchSpreadsheet = () => {
  return new Promise((resolve, reject) => {
    const sheetId = process.env.REGISTRATION_SHEET_ID;
    if (!sheetId) {
      return reject(new Error('REGISTRATION_SHEET_ID environment variable is missing'));
    }
    const url = `https://docs.google.com/spreadsheets/d/${sheetId}/export?format=csv&t=${Date.now()}`;

    const getRedirected = (targetUrl) => {
      https.get(targetUrl, (res) => {
        if (res.statusCode === 200) {
          let data = '';
          res.on('data', chunk => data += chunk);
          res.on('end', () => {
            try {
              const lines = data.split(/\r?\n/);
              const appNos = [];
              
              // Simple quote-aware CSV parser
              const parseCSVLine = (line) => {
                const result = [];
                let current = '';
                let inQuotes = false;
                for (let i = 0; i < line.length; i++) {
                  const char = line[i];
                  if (char === '"') {
                    inQuotes = !inQuotes;
                  } else if (char === ',' && !inQuotes) {
                    result.push(current.trim());
                    current = '';
                  } else {
                    current += char;
                  }
                }
                result.push(current.trim());
                return result;
              };

              lines.forEach((line, idx) => {
                if (idx === 0 || !line.trim()) return; // skip header/empty
                const cols = parseCSVLine(line);
                if (cols.length > 3 && cols[3]) {
                  appNos.push(cols[3]);
                }
              });

              resolve(appNos);
            } catch (e) {
              reject(new Error('CSV parse error: ' + e.message));
            }
          });
        } else if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
          getRedirected(res.headers.location);
        } else {
          reject(new Error(`HTTP Status ${res.statusCode}`));
        }
      }).on('error', err => reject(err));
    };

    getRedirected(url);
  });
};

async function sync() {
  try {
    console.log('Connecting to MongoDB...');
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected.');

    console.log('Fetching live Google Sheet registrations...');
    const sheetAppNos = await fetchSpreadsheet();
    console.log(`Found ${sheetAppNos.length} registrations in Google Sheet.`);

    const normalizedSheetAppNos = new Set(sheetAppNos.map(appNo => normalizeAppNo(appNo)));
    console.log('Normalized Sheet App Nos list:', Array.from(normalizedSheetAppNos));

    // Fetch all students from DB
    const students = await Student.find({});
    console.log(`Fetched ${students.length} students from MongoDB.`);

    let updatedCount = 0;
    let alreadyRegistered = 0;

    for (const student of students) {
      const normalizedStudentAppNo = normalizeAppNo(student.applicationNo);
      
      if (normalizedSheetAppNos.has(normalizedStudentAppNo)) {
        if (!student.confirmedJklu) {
          student.confirmedJklu = true;
          student.confirmedAt = new Date();
          await student.save();
          console.log(`[UPDATED] Marked ${student.name} (${student.applicationNo}) as registered.`);
          updatedCount++;
        } else {
          alreadyRegistered++;
        }
      }
    }

    console.log(`\nSync Summary:`);
    console.log(`- Students updated now: ${updatedCount}`);
    console.log(`- Students already registered in DB: ${alreadyRegistered}`);
    console.log(`- Total registered in DB now: ${updatedCount + alreadyRegistered}`);

  } catch (err) {
    console.error('Error during sync:', err);
  } finally {
    await mongoose.disconnect();
    console.log('Disconnected.');
  }
}

sync();
