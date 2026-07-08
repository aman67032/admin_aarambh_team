const fs = require('fs');
const path = require('path');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config({ path: path.join(__dirname, '../.env') });

const { sendEmail } = require('../services/email');
const Student = require('../models/Student');
const User = require('../models/User');

// ===== STUDENT ALLOCATIONS (from simulation) =====
const allocations = [
  { name: "ANSHIKA SRIVASTAVA", applicationNo: "JKLU/B.TECH/2026/1578", gender: "Female", course: "B.Tech", specialization: "ELECTRONICS AND COMMUNICATION ENGINEERING", mobile: "`+91-6263131461", email: "ANSHIKASRIVASTAVA0310@GMAIL.COM", fatherName: "", fatherMobile: "", fatherEmail: "", city: "", district: "", state: "MADHYA PRADESH", cohort: "D3", cluster: "D", region: "North" },
  { name: "HARSHITA YADAV", applicationNo: "JKLU/B.TECH/2026/2069", gender: "Female", course: "B.Tech", specialization: "COMPUTER SCIENCE AND ENGINEERING (ARTIFICIAL INTELLIGENCE)", mobile: "`+91-7073337617", email: "HARSHITAYADAV4321@GMAIL.COM", fatherName: "", fatherMobile: "", fatherEmail: "", city: "", district: "", state: "RAJASTHAN", cohort: "G3", cluster: "G", region: "North" },
  { name: "ROLI BISHNOI", applicationNo: "JKLU/B.TECH/2026/2509", gender: "Female", course: "B.Tech", specialization: "COMPUTER SCIENCE AND ENGINEERING (ARTIFICIAL INTELLIGENCE)", mobile: "`+91-7014343399", email: "BSHNROLI@GMAIL.COM", fatherName: "", fatherMobile: "", fatherEmail: "", city: "", district: "", state: "RAJASTHAN", cohort: "G4", cluster: "G", region: "North" },
  { name: "GAURAV SONI", applicationNo: "JKLU/BBA/2026/0273", gender: "Male", course: "BBA", specialization: "BBA (3 YEARS)", mobile: "`+91-8239200220", email: "GAURAVSONI7424@GMAIL.COM", fatherName: "", fatherMobile: "", fatherEmail: "", city: "", district: "", state: "RAJASTHAN", cohort: "D4", cluster: "D", region: "North" },
  { name: "VEDANSHI JAIN", applicationNo: "JKLU/B.DES./2026/0292", gender: "Female", course: "B.Des.", specialization: "B.DES.", mobile: "`+91-9024434080", email: "VEDANSHIJAIN.V08@GMAIL.COM", fatherName: "", fatherMobile: "", fatherEmail: "", city: "", district: "", state: "RAJASTHAN", cohort: "F2", cluster: "F", region: "North" },
  { name: "ANUBHAV CHHAPARWAL", applicationNo: "JKLU/B.TECH/2026/0449", gender: "Male", course: "B.Tech", specialization: "COMPUTER SCIENCE AND ENGINEERING (ARTIFICIAL INTELLIGENCE)", mobile: "`+91-7568671148", email: "ANUBHAVCHHAPARWAL638@GMAIL.COM", fatherName: "SURYA PRAKASH CHHAPARWAL", fatherMobile: "`+91-9783607673", fatherEmail: "", city: "", district: "", state: "RAJASTHAN", cohort: "H3", cluster: "H", region: "North" },
  { name: "SHIVANSH GUPTA", applicationNo: "JKLU/B.TECH/2026/0527", gender: "Male", course: "B.Tech", specialization: "COMPUTER SCIENCE AND ENGINEERING (ARTIFICIAL INTELLIGENCE)", mobile: "`+91-6377694404", email: "DWARKA2424@GMAIL.COM", fatherName: "DWARKA NATH GUPTA", fatherMobile: "`+91-6377694404", fatherEmail: "", city: "", district: "", state: "RAJASTHAN", cohort: "H5", cluster: "H", region: "North" },
  { name: "ROHIT SHARMA", applicationNo: "JKLU/B.TECH/2026/0758", gender: "Male", course: "B.Tech", specialization: "COMPUTER SCIENCE AND ENGINEERING (CYBER SECURITY)", mobile: "`+91-8949766001", email: "ROHITSHARMA894976@GMAIL.COM", fatherName: "RAKESH KUMAR SHARMA", fatherMobile: "`+91-9782113588", fatherEmail: "", city: "", district: "", state: "RAJASTHAN", cohort: "A3", cluster: "A", region: "North" },
  { name: "SHOURYA AGRAVANSHI", applicationNo: "JKLU/B.TECH/2026/0990", gender: "Male", course: "B.Tech", specialization: "COMPUTER SCIENCE AND ENGINEERING", mobile: "`+91-7014030787", email: "S.AGRAVANSHI09@GMAIL.COM", fatherName: "ASHWANI MANGAL", fatherMobile: "`+91-9414234282", fatherEmail: "", city: "", district: "", state: "RAJASTHAN", cohort: "A3", cluster: "A", region: "North" },
  { name: "JAYESH SHARMA", applicationNo: "JKLU/B.TECH/2026/1241", gender: "Male", course: "B.Tech", specialization: "COMPUTER SCIENCE AND ENGINEERING (ARTIFICIAL INTELLIGENCE)", mobile: "`+91-7877277788", email: "JAYESHSALUJA2003@GMAIL.COM", fatherName: "", fatherMobile: "", fatherEmail: "", city: "", district: "", state: "RAJASTHAN", cohort: "D5", cluster: "D", region: "North" },
  { name: "NAIVEDHYA JAIN", applicationNo: "JKLU/B.TECH/2026/1313", gender: "Male", course: "B.Tech", specialization: "COMPUTER SCIENCE AND ENGINEERING (ARTIFICIAL INTELLIGENCE)", mobile: "`+91-9660614999", email: "NAIVEDHYAJAIN1@GMAIL.COM", fatherName: "", fatherMobile: "", fatherEmail: "", city: "", district: "", state: "RAJASTHAN", cohort: "D5", cluster: "D", region: "North" },
  { name: "GAURANG TOSHNIWAL", applicationNo: "JKLU/B.TECH/2026/1851", gender: "Male", course: "B.Tech", specialization: "COMPUTER SCIENCE AND ENGINEERING", mobile: "`+91-7737756767", email: "GAURANGTOSHNIWAL@GMAIL.COM", fatherName: "", fatherMobile: "", fatherEmail: "", city: "", district: "", state: "RAJASTHAN", cohort: "F3", cluster: "F", region: "North" },
  { name: "CHIRAG JAIN", applicationNo: "JKLU/B.TECH/2026/2175", gender: "Male", course: "B.Tech", specialization: "COMPUTER SCIENCE AND ENGINEERING (ARTIFICIAL INTELLIGENCE)", mobile: "`+91-8696059594", email: "CHIRAGJAIN120805@GMAIL.COM", fatherName: "", fatherMobile: "", fatherEmail: "", city: "", district: "", state: "RAJASTHAN", cohort: "F5", cluster: "F", region: "North" },
  { name: "OJAS MAHESHWARI", applicationNo: "JKLU/B.TECH/2026/2279", gender: "Male", course: "B.Tech", specialization: "COMPUTER SCIENCE AND ENGINEERING", mobile: "`+91-8209299891", email: "OJASMAHESHWARI1906@GMAIL.COM", fatherName: "", fatherMobile: "", fatherEmail: "", city: "", district: "", state: "RAJASTHAN", cohort: "H2", cluster: "H", region: "North" },
  { name: "HITENDRA TALWAR", applicationNo: "JKLU/B.TECH/2026/2333", gender: "Male", course: "B.Tech", specialization: "COMPUTER SCIENCE AND ENGINEERING (ARTIFICIAL INTELLIGENCE)", mobile: "`+91-8827277777", email: "HITENDRAT9@GMAIL.COM", fatherName: "", fatherMobile: "", fatherEmail: "", city: "", district: "", state: "MADHYA PRADESH", cohort: "H4", cluster: "H", region: "North" },
  { name: "ANIRUDDH VARDHAN SINGH", applicationNo: "JKLU/B.TECH/2026/2400", gender: "Male", course: "B.Tech", specialization: "COMPUTER SCIENCE AND ENGINEERING (ARTIFICIAL INTELLIGENCE)", mobile: "`+91-9696969696", email: "ANIRUDDHVARDHAN369@GMAIL.COM", fatherName: "", fatherMobile: "", fatherEmail: "", city: "", district: "", state: "UTTAR PRADESH", cohort: "G1", cluster: "G", region: "North" },
  { name: "TEJESH KUMAWAT", applicationNo: "JKLU/B.TECH/2026/2477", gender: "Male", course: "B.Tech", specialization: "COMPUTER SCIENCE AND ENGINEERING (CYBER SECURITY)", mobile: "`+91-9079534280", email: "TEJESHKUMAWAT41@GMAIL.COM", fatherName: "", fatherMobile: "", fatherEmail: "", city: "", district: "", state: "RAJASTHAN", cohort: "G1", cluster: "G", region: "North" },
];

async function sendWelcomeEmail(student, cohortLeader) {
  const templatePath = path.join(__dirname, '../templates/aarambh_email_template.html');
  if (!fs.existsSync(templatePath)) {
    console.log(`[WARN] Template not found, skipping email for ${student.name}`);
    return;
  }
  const templateContent = fs.readFileSync(templatePath, 'utf8');
  const clName = cohortLeader ? cohortLeader.name : 'N/A';
  const clPhone = cohortLeader ? cohortLeader.phone : 'N/A';
  const clEmail = cohortLeader ? cohortLeader.email : 'N/A';
  const rawFirstName = student.name.trim().split(' ')[0];
  const firstName = rawFirstName ? (rawFirstName.charAt(0).toUpperCase() + rawFirstName.slice(1).toLowerCase()) : '';
  const greetingName = student.region === 'South' ? student.name : firstName;
  const parsedBody = templateContent
    .replace(/\{\{name\}\}/g, student.name)
    .replace(/\{\{firstName\}\}/g, greetingName)
    .replace(/\{\{applicationNo\}\}/g, student.applicationNo)
    .replace(/\{\{course\}\}/g, student.course)
    .replace(/\{\{cohort\}\}/g, student.cohort)
    .replace(/\{\{cohortLeaderName\}\}/g, clName)
    .replace(/\{\{cohortLeaderPhone\}\}/g, clPhone)
    .replace(/\{\{cohortLeaderEmail\}\}/g, clEmail);
  const attachments = [];
  const bannerPath = path.join(__dirname, '../../admin_aarambh/public/banner_compiled.jpg');
  if (parsedBody.includes('cid:bannerImage') && fs.existsSync(bannerPath)) {
    attachments.push({ filename: 'banner.jpg', path: bannerPath, cid: 'bannerImage' });
  }
  const qrPath = path.join(__dirname, '../../admin_aarambh/public/registration_qr.png');
  if (parsedBody.includes('cid:registrationQr') && fs.existsSync(qrPath)) {
    attachments.push({ filename: 'registration_qr.png', path: qrPath, cid: 'registrationQr' });
  }
  const attachmentDir = path.join(__dirname, '../../admin_aarambh/public/Email Attachment');
  if (fs.existsSync(attachmentDir)) {
    fs.readdirSync(attachmentDir).forEach(file => {
      const fp = path.join(attachmentDir, file);
      if (fs.statSync(fp).isFile()) attachments.push({ filename: file, path: fp });
    });
  }
  const result = await sendEmail({
    to: student.email,
    subject: 'Invitation to AARAMBH 2026 - Your Journey at JKLU Begins Here!',
    body: parsedBody,
    cc: clEmail || undefined,
    attachments: attachments.length > 0 ? attachments : undefined
  });
  if (result.success) console.log(`  -> Email SENT to ${student.name} (${student.email})`);
  else if (result.queued) console.log(`  -> Email QUEUED for ${student.name}`);
  else console.log(`  -> Email FAILED for ${student.name}: ${result.error}`);
}

async function main() {
  try {
    console.log('Connecting to MongoDB...');
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected.\n');

    // Get max sno
    const maxSnoDoc = await Student.findOne().sort({ sno: -1 }).select('sno');
    let nextSno = (maxSnoDoc ? maxSnoDoc.sno : 0) + 1;
    console.log(`Starting sno from: ${nextSno}`);

    let inserted = 0, skipped = 0, emailSent = 0;

    for (const alloc of allocations) {
      // Check if already exists
      const existing = await Student.findOne({ applicationNo: alloc.applicationNo });
      if (existing) {
        console.log(`[SKIP] Already in DB: ${alloc.name} (${alloc.applicationNo})`);
        skipped++;
        continue;
      }

      const cohortLeader = await User.findOne({ role: 'cohort_leader', cohort: alloc.cohort });

      const newStudent = new Student({
        sno: nextSno++,
        applicationNo: alloc.applicationNo,
        name: alloc.name,
        gender: alloc.gender,
        course: alloc.course,
        specialization: alloc.specialization,
        mobile: alloc.mobile,
        email: alloc.email,
        fatherName: alloc.fatherName,
        fatherMobile: alloc.fatherMobile,
        fatherEmail: alloc.fatherEmail,
        city: alloc.city,
        district: alloc.district,
        state: alloc.state,
        region: alloc.region,
        cluster: alloc.cluster,
        cohort: alloc.cohort,
        mailReceived: false,
        documentsVerified: false,
        callLogs: [],
        callCount: 0,
        confirmedAarambh: false,
        confirmedJklu: false,
        notContinuing: false,
        notComingAarambh: false,
      });
      await newStudent.save();
      console.log(`[INSERT] ${alloc.name} -> Cohort ${alloc.cohort} (${alloc.course}, ${alloc.gender})`);
      inserted++;

      // Send email
      await sendWelcomeEmail(newStudent, cohortLeader);
      emailSent++;
    }

    console.log(`\n=== Import Complete ===`);
    console.log(`Inserted: ${inserted} | Skipped: ${skipped} | Emails Sent/Queued: ${emailSent}`);

  } catch (err) {
    console.error('Error:', err);
  } finally {
    await mongoose.disconnect();
    console.log('MongoDB disconnected.');
  }
}

main();
