const mongoose = require('mongoose');
const dotenv = require('dotenv');
const path = require('path');
const fs = require('fs');
const Student = require('../models/Student');

dotenv.config({ path: path.join(__dirname, '../.env') });

const escapeCSV = (val) => {
  if (val === null || val === undefined) return '';
  let str = String(val);
  str = str.replace(/"/g, '""');
  if (str.includes(',') || str.includes('"') || str.includes('\n') || str.includes('\r')) {
    return `"${str}"`;
  }
  return str;
};

async function exportCSV() {
  try {
    console.log('Connecting to MongoDB...');
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected.');

    const students = await Student.find({}).sort({ name: 1 });
    console.log(`Fetched ${students.length} students from database.`);

    const headers = [
      'Student Name',
      'Gender',
      'Application Number',
      'Course',
      'Phone Number',
      'Email',
      'Father Name',
      'Father Phone',
      'Father Email',
      'Pincode',
      'City',
      'District',
      'State',
      'Cohort',
      'Cluster',
      'Registered at JKLU (confirmedJklu)',
      'Confirmed Aarambh',
      'Documents Verified',
      'Not Continuing',
      'Not Continuing Reason'
    ];

    let csvContent = headers.join(',') + '\n';

    students.forEach(student => {
      const row = [
        student.name,
        student.gender,
        student.applicationNo,
        student.course,
        student.mobile,
        student.email,
        student.fatherName,
        student.fatherMobile,
        student.fatherEmail,
        student.pincode,
        student.city,
        student.district,
        student.state,
        student.cohort,
        student.cluster,
        student.confirmedJklu ? 'TRUE' : 'FALSE',
        student.confirmedAarambh ? 'TRUE' : 'FALSE',
        student.documentsVerified ? 'TRUE' : 'FALSE',
        student.notContinuing ? 'TRUE' : 'FALSE',
        student.confirmationNote || ''
      ];

      csvContent += row.map(val => escapeCSV(val)).join(',') + '\n';
    });

    const outputPath = path.join("F:\\Aarambh 2026\\Team_portal", "all_students_153_combined.csv");
    fs.writeFileSync(outputPath, csvContent, 'utf-8');
    console.log(`Successfully exported all students to: ${outputPath}`);

  } catch (err) {
    console.error('Error exporting CSV:', err);
  } finally {
    await mongoose.disconnect();
    console.log('Disconnected.');
  }
}

exportCSV();
