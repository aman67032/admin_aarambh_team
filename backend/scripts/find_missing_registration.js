const mongoose = require('mongoose');
const dotenv = require('dotenv');
const path = require('path');
const fs = require('fs');
const Student = require('../models/Student');

dotenv.config({ path: path.join(__dirname, '../.env') });

const normalizeAppNo = (val) => (val || '').replace(/[\/\.\s_-]/g, '').replace('2025', '2026').toUpperCase();

const csvFilePath = "C:\\Users\\MSI1\\Downloads\\transactions (19).csv";

function parseCSVLine(line) {
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
}

function readCSV(filePath) {
  if (!fs.existsSync(filePath)) {
    throw new Error(`File not found at: ${filePath}`);
  }
  const content = fs.readFileSync(filePath, 'utf-8');
  const lines = content.split(/\r?\n/);
  const headers = parseCSVLine(lines[0]);
  
  const results = [];
  for (let i = 1; i < lines.length; i++) {
    const line = lines[i];
    if (!line.trim()) continue;
    const cols = parseCSVLine(line);
    const row = {};
    headers.forEach((h, idx) => {
      row[h] = cols[idx];
    });
    results.push(row);
  }
  return results;
}

async function run() {
  try {
    console.log('Connecting to MongoDB...');
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected.');

    console.log(`Reading CSV from "${csvFilePath}"...`);
    const csvRows = readCSV(csvFilePath);
    console.log(`Found ${csvRows.length} total rows in CSV.`);

    // Extract successful references from CSV
    const csvSuccesses = [];
    csvRows.forEach(row => {
      const status = row['Transaction Status'];
      const refId = row['Customer Reference ID'];
      const orderId = row['Order Id'];
      const amount = row['Order Amount'];
      if (status === 'SUCCESS' && refId) {
        csvSuccesses.push({
          refId,
          orderId,
          amount,
          normalized: normalizeAppNo(refId)
        });
      }
    });

    console.log(`Found ${csvSuccesses.length} successful transactions in CSV.`);

    // Fetch all students from DB
    const dbStudents = await Student.find({});
    console.log(`Fetched ${dbStudents.length} total students from MongoDB.`);

    const confirmedStudents = dbStudents.filter(s => s.confirmedJklu === true);
    console.log(`Fetched ${confirmedStudents.length} confirmed (registered) students from MongoDB.`);

    // Check which CSV items are not confirmed in DB
    console.log('\n--- Analyzing differences ---');
    const missingInDb = [];
    const notConfirmedInDb = [];

    csvSuccesses.forEach(item => {
      const matchedStudent = dbStudents.find(s => normalizeAppNo(s.applicationNo) === item.normalized);
      if (!matchedStudent) {
        missingInDb.push(item);
      } else if (!matchedStudent.confirmedJklu) {
        notConfirmedInDb.push({
          item,
          student: matchedStudent
        });
      }
    });

    console.log(`\n❌ [SUCCESS IN CSV BUT MISSING FROM DATABASE ENTIRELY] - ${missingInDb.length} items:`);
    missingInDb.forEach(m => {
      console.log(`  - Ref ID: "${m.refId}" | Order ID: "${m.orderId}" | Amount: ${m.amount}`);
    });

    console.log(`\n⚠️ [SUCCESS IN CSV BUT NOT CONFIRMED IN DB] - ${notConfirmedInDb.length} items:`);
    notConfirmedInDb.forEach(nc => {
      console.log(`  - Ref ID: "${nc.item.refId}" matched Student: "${nc.student.name}" (${nc.student.applicationNo})`);
    });

    // Check which confirmed students are not in the CSV
    const confirmedNotInCsv = [];
    confirmedStudents.forEach(s => {
      const normAppNo = normalizeAppNo(s.applicationNo);
      const matchedCsv = csvSuccesses.find(csv => csv.normalized === normAppNo);
      if (!matchedCsv) {
        confirmedNotInCsv.push(s);
      }
    });

    console.log(`\n✅ [CONFIRMED IN DB BUT NO SUCCESS TRANSACTION IN CSV] - ${confirmedNotInCsv.length} students:`);
    confirmedNotInCsv.forEach(s => {
      console.log(`  - Name: "${s.name}" | Application No: "${s.applicationNo}"`);
    });

  } catch (err) {
    console.error('Error during analysis:', err);
  } finally {
    await mongoose.disconnect();
    console.log('Disconnected.');
  }
}

run();
