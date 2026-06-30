const mongoose = require('mongoose');
const dotenv = require('dotenv');
const path = require('path');
const Student = require('../models/Student');

dotenv.config({ path: path.join(__dirname, '../.env') });

const sheetAppNos = [
  'JKLU/B.TECH/2026/0865',
  'JKLU/B.TECH/2026/1309',
  'JKLU/B.TECH/2026/1959',
  'JKLU/BBA/2026/0286',
  'JKLU/BDES/2026/0328',
  'JKLU/BBA/2026/0029',
  'JKLU/B.DES/2026/0521',
  'JKLU/BBA/2026/0140',
  'JKLU/B.TECH/2026/0480',
  'JKLU/B.DES/2026/0446',
  'JKLU/B.TECH/2026/2351',
  'JKLU/B.DES./2026/0047',
  'JKLU/B.TECH/2026/0083',
  'JKLU/BDES/2026/0687',
  'JKLU/BDES/2025/0612'
];

const normalize = (val) => (val || '').replace(/[\/\.\s-]/g, '').toUpperCase();

async function run() {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    
    const dbStudents = await Student.find({});
    const dbAppNosNormalized = {};
    dbStudents.forEach(s => {
      dbAppNosNormalized[normalize(s.applicationNo)] = s;
    });

    console.log(`Checking matching status of sheet application numbers:`);
    sheetAppNos.forEach(appNo => {
      const norm = normalize(appNo);
      const match = dbAppNosNormalized[norm];
      if (match) {
        console.log(`  - MATCH: ${appNo} -> ${match.name} (${match.cohort})`);
      } else {
        console.log(`  - NO MATCH: ${appNo}`);
      }
    });
  } catch (err) {
    console.error(err);
  } finally {
    await mongoose.disconnect();
  }
}

run();
