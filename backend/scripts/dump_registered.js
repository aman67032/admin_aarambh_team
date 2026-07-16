const mongoose = require('mongoose');
const dotenv = require('dotenv');
const path = require('path');
const fs = require('fs');

dotenv.config({ path: path.join(__dirname, '../.env') });

const uri = process.env.MONGODB_URI;
if (!uri) {
  console.error("MONGODB_URI not found in env!");
  process.exit(1);
}

const studentSchema = new mongoose.Schema({
  sno: Number,
  applicationNo: String,
  name: String,
  gender: String,
  course: String,
  specialization: String,
  mobile: String,
  email: String,
  city: String,
  district: String,
  state: String,
  confirmedJklu: { type: Boolean, default: false },
  confirmedAarambh: { type: Boolean, default: false },
  notContinuing: { type: Boolean, default: false },
  notComingAarambh: { type: Boolean, default: false }
});

const Student = mongoose.model('Student', studentSchema);

async function run() {
  try {
    await mongoose.connect(uri);
    // Find all students with confirmedJklu: true
    const students = await Student.find({ confirmedJklu: true });
    console.log(`Dumping ${students.length} registered students to JSON...`);
    
    const dumpPath = path.join(__dirname, '../../scratch/registered_dump.json');
    fs.writeFileSync(dumpPath, JSON.stringify(students, null, 2));
    console.log(`Successfully dumped to ${dumpPath}`);
  } catch (error) {
    console.error("Error:", error);
  } finally {
    await mongoose.disconnect();
  }
}

run();
