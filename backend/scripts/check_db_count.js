const mongoose = require('mongoose');
const dotenv = require('dotenv');
const path = require('path');

dotenv.config({ path: path.join(__dirname, '../.env') });

const uri = process.env.MONGODB_URI;
if (!uri) {
  console.error("MONGODB_URI not found in env!");
  process.exit(1);
}

const studentSchema = new mongoose.Schema({
  confirmedJklu: { type: Boolean, default: false },
  notContinuing: { type: Boolean, default: false },
  notComingAarambh: { type: Boolean, default: false },
  applicationNo: String,
  name: String,
  state: String
});

const Student = mongoose.model('Student', studentSchema);

async function run() {
  try {
    await mongoose.connect(uri);
    const totalStudents = await Student.countDocuments();
    const confirmedCount = await Student.countDocuments({ confirmedJklu: true });
    
    const allConfirmed = await Student.find({ confirmedJklu: true }).lean();
    
    // Check duplicates
    const seen = new Set();
    const dups = [];
    const unique = [];
    
    for (const s of allConfirmed) {
      const norm = s.applicationNo ? s.applicationNo.trim().toUpperCase().replace(/ /g, '').replace(/\./g, '').replace(/_/g, '') : '';
      if (seen.has(norm)) {
        dups.push(s);
      } else {
        seen.add(norm);
        unique.push(s);
      }
    }
    
    console.log("Total students in DB:", totalStudents);
    console.log("Total confirmedJklu: true in DB:", confirmedCount);
    console.log("Total unique confirmedJklu: true in DB:", unique.length);
    console.log("Total duplicate confirmedJklu: true in DB:", dups.length);
    
    if (dups.length > 0) {
      console.log("\nDuplicates detail:");
      for (const d of dups) {
        console.log(` - App No: ${d.applicationNo} | Name: ${d.name} | State: ${d.state}`);
      }
    }
  } catch (error) {
    console.error("Error:", error);
  } finally {
    await mongoose.disconnect();
  }
}

run();
