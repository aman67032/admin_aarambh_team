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
    const students = await Student.find({});

    let jaipurStats = {
      total: 0,
      registeredJklu: 0,
      confirmedAarambh: 0,
      notComing: 0,
      notContinuing: 0
    };

    let rajasthanNonJaipurStats = {
      total: 0,
      registeredJklu: 0,
      confirmedAarambh: 0,
      notComing: 0,
      notContinuing: 0
    };

    let otherStatesStats = {
      total: 0,
      registeredJklu: 0,
      confirmedAarambh: 0,
      notComing: 0,
      notContinuing: 0
    };

    students.forEach(student => {
      let state = (student.state || 'UNKNOWN').trim().toUpperCase();
      let city = (student.city || '').trim().toUpperCase();
      let district = (student.district || '').trim().toUpperCase();

      const isRajasthan = (state === 'RAJASTHAN' || state === 'RAJESTHAN');
      const isJaipur = city.includes('JAIPUR') || district.includes('JAIPUR');

      if (isRajasthan) {
        if (isJaipur) {
          jaipurStats.total++;
          if (student.confirmedJklu) jaipurStats.registeredJklu++;
          if (student.confirmedAarambh) jaipurStats.confirmedAarambh++;
          if (student.notComingAarambh) jaipurStats.notComing++;
          if (student.notContinuing) jaipurStats.notContinuing++;
        } else {
          rajasthanNonJaipurStats.total++;
          if (student.confirmedJklu) rajasthanNonJaipurStats.registeredJklu++;
          if (student.confirmedAarambh) rajasthanNonJaipurStats.confirmedAarambh++;
          if (student.notComingAarambh) rajasthanNonJaipurStats.notComing++;
          if (student.notContinuing) rajasthanNonJaipurStats.notContinuing++;
        }
      } else {
        otherStatesStats.total++;
        if (student.confirmedJklu) otherStatesStats.registeredJklu++;
        if (student.confirmedAarambh) otherStatesStats.confirmedAarambh++;
        if (student.notComingAarambh) otherStatesStats.notComing++;
        if (student.notContinuing) otherStatesStats.notContinuing++;
      }
    });

    console.log("\n### JAIPUR VS OTHER REGIONS");
    console.log("=".repeat(110));
    console.log("Region".padEnd(30) + "Total".padStart(8) + "Reg at JKLU".padStart(15) + "Aarambh Conf".padStart(15) + "Not Coming".padStart(12) + "Not Cont.".padStart(10) + "Active Target".padStart(15));
    console.log("-".repeat(110));

    const printRow = (label, stats) => {
      const activeTarget = stats.total - stats.notContinuing - stats.notComing;
      console.log(
        label.padEnd(30) + 
        stats.total.toString().padStart(8) + 
        stats.registeredJklu.toString().padStart(15) + 
        stats.confirmedAarambh.toString().padStart(15) + 
        stats.notComing.toString().padStart(12) + 
        stats.notContinuing.toString().padStart(10) +
        activeTarget.toString().padStart(15)
      );
    };

    printRow("JAIPUR (City/District)", jaipurStats);
    printRow("RAJASTHAN (Excl. Jaipur)", rajasthanNonJaipurStats);
    printRow("OTHER STATES", otherStatesStats);
    console.log("-".repeat(110));
    
    const grandTotal = {
      total: jaipurStats.total + rajasthanNonJaipurStats.total + otherStatesStats.total,
      registeredJklu: jaipurStats.registeredJklu + rajasthanNonJaipurStats.registeredJklu + otherStatesStats.registeredJklu,
      confirmedAarambh: jaipurStats.confirmedAarambh + rajasthanNonJaipurStats.confirmedAarambh + otherStatesStats.confirmedAarambh,
      notComing: jaipurStats.notComing + rajasthanNonJaipurStats.notComing + otherStatesStats.notComing,
      notContinuing: jaipurStats.notContinuing + rajasthanNonJaipurStats.notContinuing + otherStatesStats.notContinuing
    };
    
    printRow("GRAND TOTAL", grandTotal);
    console.log("=".repeat(110));

  } catch (error) {
    console.error("Error:", error);
  } finally {
    await mongoose.disconnect();
  }
}

run();
