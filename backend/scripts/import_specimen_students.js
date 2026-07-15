const fs = require('fs');
const path = require('path');
const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config({ path: path.join(__dirname, '../.env') });

const { sendEmail } = require('../services/email');
const Student = require('../models/Student');
const User = require('../models/User');

const jsonPath = "C:/Users/MSI1/.gemini/antigravity/brain/f4b99109-a86f-4ae1-acc2-ba2637e9a877/scratch/specimen_students.json";

// Static fallback mappings
const fallbackMapping = {
  "A1": "B.Tech", "A2": "BBA", "A3": "B.Tech", "A4": "BBA", "A5": "B.Tech",
  "B1": "B.Tech", "B2": "B.Tech", "B3": "B.Tech", "B4": "BBA",
  "C1": "B.Des", "C2": "B.Tech", "C3": "BBA", "C4": "BBA",
  "D1": "B.Tech", "D2": "B.Tech", "D3": "B.Tech", "D4": "BBA", "D5": "B.Tech",
  "E1": "B.Des", "E2": "BBA", "E3": "B.Tech", "E4": "B.Tech", "E5": "BBA",
  "F1": "BBA", "F2": "BBA", "F3": "B.Tech", "F4": "BBA", "F5": "B.Tech",
  "G1": "B.Des", "G2": "B.Tech", "G3": "B.Tech", "G4": "B.Tech", "G5": "B.Tech",
  "H1": "B.Tech", "H2": "BBA", "H3": "B.Tech", "H4": "B.Des", "H5": "B.Tech",
  "I1": "B.Tech", "I2": "B.Tech", "I3": "B.Tech",
  "J1": "B.Tech", "J2": "B.Tech", "J3": "B.Tech",
  "K1": "B.Tech", "K2": "B.Tech", "K3": "B.Tech",
  "L1": "B.Tech", "L2": "B.Tech", "L3": "B.Tech"
};

async function main() {
  try {
    console.log('Connecting to MongoDB...');
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected.');

    const adminUser = await User.findOne({ role: 'super_admin' });
    const adminUserId = adminUser ? adminUser._id : new mongoose.Types.ObjectId();

    // 1. Read JSON file
    if (!fs.existsSync(jsonPath)) {
      throw new Error(`JSON file not found at: ${jsonPath}`);
    }
    const rawData = fs.readFileSync(jsonPath, 'utf8');
    const importStudents = JSON.parse(rawData);
    console.log(`Loaded ${importStudents.length} students from JSON.`);

    // 2. Read email template
    const templatePath = path.join(__dirname, '../templates/aarambh_email_template.html');
    if (!fs.existsSync(templatePath)) {
      throw new Error(`Email template not found at: ${templatePath}`);
    }
    const templateContent = fs.readFileSync(templatePath, 'utf8');

    // 3. Process each student
    for (const item of importStudents) {
      const appNo = item.applicationNo.trim().toUpperCase();
      const studentName = item.name.trim().toUpperCase();
      
      // Check if already exists in DB
      const existing = await Student.findOne({ applicationNo: appNo });
      if (existing) {
        console.log(`[SKIP] Already exists: ${appNo} - ${studentName}`);
        continue;
      }

      console.log(`\n--- Importing: ${studentName} (${appNo}) ---`);

      // Determine details
      const studentGender = item.gender.trim().toLowerCase().startsWith('f') ? 'Female' : 'Male';
      
      let studentCourse = 'B.Tech';
      const rawCourse = item.course.trim().toUpperCase();
      if (rawCourse.includes('BBA')) studentCourse = 'BBA';
      else if (rawCourse.includes('DES') || rawCourse.includes('DESIGN')) studentCourse = 'B.Des';

      // Determine region
      let region = 'North';
      const stateUpper = String(item.state || '').toUpperCase();
      if (
        stateUpper.includes('ANDHRA') || 
        stateUpper.includes('TELANGANA') || 
        stateUpper.includes('TAMIL') || 
        stateUpper.includes('KARNATAKA') || 
        stateUpper.includes('KERALA')
      ) {
        region = 'South';
      }

      // Dynamic cohort assignment logic
      const cohortLeaders = await User.find({ role: 'cohort_leader' });
      const activeCohorts = cohortLeaders.map(cl => cl.cohort).filter(Boolean);

      // Map cohorts to course by scanning database
      const cohortCourses = {};
      const dbStudents = await Student.find({}, 'cohort course');
      dbStudents.forEach(s => {
        if (s.cohort && s.course) {
          if (!cohortCourses[s.cohort]) cohortCourses[s.cohort] = {};
          cohortCourses[s.cohort][s.course] = (cohortCourses[s.cohort][s.course] || 0) + 1;
        }
      });

      const cohortToCourse = {};
      for (const cohort in cohortCourses) {
        const courses = cohortCourses[cohort];
        let maxCount = 0;
        let dominantCourse = null;
        for (const c in courses) {
          if (courses[c] > maxCount) {
            maxCount = courses[c];
            dominantCourse = c;
          }
        }
        cohortToCourse[cohort] = dominantCourse;
      }

      const getCohortCourse = (c) => cohortToCourse[c] || fallbackMapping[c] || "B.Tech";

      // Count active students per cohort
      const cohortCounts = {};
      activeCohorts.forEach(c => { cohortCounts[c] = 0; });
      const activeStudents = await Student.find({ notContinuing: { $ne: true }, notComingAarambh: { $ne: true } });
      activeStudents.forEach(s => {
        if (s.cohort && cohortCounts[s.cohort] !== undefined) {
          cohortCounts[s.cohort]++;
        }
      });

      // Filter matching cohorts
      const matchingCohorts = activeCohorts.filter(c => getCohortCourse(c) === studentCourse);

      // Pick matching cohort with the minimum size
      let selectedCohort = null;
      let minCount = Infinity;
      matchingCohorts.forEach(c => {
        if (cohortCounts[c] < minCount) {
          minCount = cohortCounts[c];
          selectedCohort = c;
        }
      });

      if (!selectedCohort) {
        selectedCohort = Object.keys(fallbackMapping).find(c => fallbackMapping[c] === studentCourse) || "A1";
      }

      // Determine next S.No
      const maxStudent = await Student.findOne().sort({ sno: -1 });
      const nextSno = maxStudent ? maxStudent.sno + 1 : 430;

      // Generate random 6-digit arrival code
      const arrivalCode = String(Math.floor(100000 + Math.random() * 900000));

      // Construct student document
      const newStudent = new Student({
        sno: nextSno,
        applicationNo: appNo,
        name: studentName,
        gender: studentGender,
        course: studentCourse,
        specialization: item.specialization || '',
        mobile: item.mobile,
        email: item.email,
        fatherName: item.fatherName,
        fatherMobile: item.fatherMobile,
        fatherEmail: item.fatherEmail,
        city: item.city,
        district: item.district,
        state: item.state,
        region: region,
        cohort: selectedCohort,
        cluster: selectedCohort.charAt(0),
        confirmedAarambh: true,
        confirmedJklu: true,
        confirmedAt: new Date().toISOString(),
        confirmedBy: adminUserId,
        documentsVerified: false,
        mailReceived: false,
        arrivalCode: arrivalCode,
        callLogs: [],
        callCount: 0
      });

      await newStudent.save();
      console.log(`[SAVED] ${studentName} -> S.No: ${nextSno} | Cohort: ${selectedCohort}`);

      // Fetch cohort leader details
      const cohortLeader = await User.findOne({ role: 'cohort_leader', cohort: selectedCohort });
      const clName = cohortLeader ? cohortLeader.name : 'N/A';
      const clPhone = cohortLeader ? cohortLeader.phone : 'N/A';
      const clEmail = cohortLeader ? cohortLeader.email : 'N/A';
      const ccEmail = cohortLeader ? cohortLeader.email : '';

      // Parse template variables
      const rawFirstName = studentName.trim().split(' ')[0];
      const firstName = rawFirstName ? (rawFirstName.charAt(0).toUpperCase() + rawFirstName.slice(1).toLowerCase()) : '';

      const parsedBody = templateContent
        .replace(/\{\{name\}\}/g, studentName)
        .replace(/\{\{firstName\}\}/g, firstName)
        .replace(/\{\{applicationNo\}\}/g, appNo)
        .replace(/\{\{course\}\}/g, studentCourse)
        .replace(/\{\{cohort\}\}/g, selectedCohort)
        .replace(/\{\{cohortLeaderName\}\}/g, clName)
        .replace(/\{\{cohortLeaderPhone\}\}/g, clPhone)
        .replace(/\{\{cohortLeaderEmail\}\}/g, clEmail);

      // Attachments
      const attachments = [];
      const bannerPath = path.join(__dirname, '../../admin_aarambh/public/banner_compiled.jpg');
      if (parsedBody.includes('cid:bannerImage') && fs.existsSync(bannerPath)) {
        attachments.push({
          filename: 'banner.jpg',
          path: bannerPath,
          cid: 'bannerImage'
        });
      }

      const qrPath = path.join(__dirname, '../../admin_aarambh/public/registration_qr.png');
      if (parsedBody.includes('cid:registrationQr') && fs.existsSync(qrPath)) {
        attachments.push({
          filename: 'registration_qr.png',
          path: qrPath,
          cid: 'registrationQr'
        });
      }

      const attachmentDir = path.join(__dirname, '../../admin_aarambh/public/Email Attachment');
      if (fs.existsSync(attachmentDir)) {
        const files = fs.readdirSync(attachmentDir);
        files.forEach(file => {
          const filePath = path.join(attachmentDir, file);
          const stat = fs.statSync(filePath);
          if (stat.isFile()) {
            attachments.push({ filename: file, path: filePath });
          }
        });
      }

      console.log(`Triggering welcome email to ${item.email} CC: ${ccEmail}...`);
      const emailResult = await sendEmail({
        to: item.email,
        subject: 'Invitation to AARAMBH 2026 - Your Journey at JKLU Begins Here!',
        body: parsedBody,
        cc: ccEmail || undefined,
        attachments: attachments.length > 0 ? attachments : undefined
      });

      if (emailResult.success || emailResult.queued) {
        newStudent.mailReceived = true;
        await newStudent.save();
        console.log(`[EMAIL] Sent/queued successfully to ${item.email}`);
      } else {
        console.log(`[EMAIL FAILED] to ${item.email}: ${emailResult.error}`);
      }
    }

  } catch (error) {
    console.error('Import process failed:', error);
  } finally {
    await mongoose.disconnect();
    console.log('MongoDB disconnected.');
  }
}

main();
