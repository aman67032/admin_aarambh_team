const mongoose = require('mongoose');
const dotenv = require('dotenv');
const path = require('path');
const fs = require('fs');
const Student = require('../models/Student');

dotenv.config({ path: path.join(__dirname, '../.env') });

const normalizeAppNo = (val) => (val || '').replace(/[\/\.\s_-]/g, '').replace('2025', '2026').toUpperCase();

const csvFilePath = "C:\\Users\\MSI1\\Downloads\\transactions (1).csv";

// Manual quote-aware CSV parser
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

    console.log(`Reading Cashfree transactions CSV from "${csvFilePath}"...`);
    const csvRows = await readCSV(csvFilePath);
    console.log(`Found ${csvRows.length} total rows in CSV.`);

    // Extract reference IDs from successful transactions
    const successfulRefIds = [];
    csvRows.forEach(row => {
      const status = row['Transaction Status'];
      const refId = row['Customer Reference ID'];
      if (status === 'SUCCESS' && refId) {
        successfulRefIds.push(refId);
      }
    });

    console.log(`Found ${successfulRefIds.length} successful transactions in CSV.`);
    console.log('Successful Reference IDs:', successfulRefIds);

    const normalizedRefs = successfulRefIds.map(ref => normalizeAppNo(ref));
    const uniqueNormalizedRefs = new Set(normalizedRefs);

    // Fetch all students from DB
    const students = await Student.find({});
    console.log(`Fetched ${students.length} students from MongoDB.`);

    let updatedCount = 0;
    let alreadyRegistered = 0;
    let unmatchedRefs = [];

    // Loop through CSV references and update database
    for (const ref of successfulRefIds) {
      const normRef = normalizeAppNo(ref);
      const matchedStudent = students.find(s => normalizeAppNo(s.applicationNo) === normRef);

      if (matchedStudent) {
        if (!matchedStudent.confirmedJklu) {
          matchedStudent.confirmedJklu = true;
          matchedStudent.confirmedAt = new Date();
          await matchedStudent.save();
          console.log(`[UPDATED] Marked ${matchedStudent.name} (${matchedStudent.applicationNo}) as registered.`);
          updatedCount++;
        } else {
          alreadyRegistered++;
        }
      } else {
        unmatchedRefs.push(ref);
      }
    }

    console.log(`\n=== Sync Summary ===`);
    console.log(`- Total SUCCESS in CSV: ${successfulRefIds.length}`);
    console.log(`- Students newly updated in DB: ${updatedCount}`);
    console.log(`- Students already registered in DB: ${alreadyRegistered}`);
    console.log(`- Total registered in DB now: ${await Student.countDocuments({ confirmedJklu: true })}`);
    
    if (unmatchedRefs.length > 0) {
      console.log('\n❌ Unmatched Reference IDs (not found in DB):');
      unmatchedRefs.forEach(ref => console.log(`  - "${ref}"`));
    }

  } catch (err) {
    console.error('Error during CSV sync:', err);
  } finally {
    await mongoose.disconnect();
    console.log('Disconnected.');
  }
}

run();
