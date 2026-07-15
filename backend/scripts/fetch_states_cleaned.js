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

const stateCorrections = {
  'RAJESTHAN': 'RAJASTHAN',
  'RAJASTHAN': 'RAJASTHAN',
  'MP': 'MADHYA PRADESH',
  'MADHYAPRADESH': 'MADHYA PRADESH',
  'UP': 'UTTAR PRADESH',
  'UTTARPRADESH': 'UTTAR PRADESH',
  'AP': 'ANDHRA PRADESH',
  'ANDHRAPRADESH': 'ANDHRA PRADESH'
};

async function run() {
  try {
    await mongoose.connect(uri);
    const students = await Student.find({});

    const stateStats = {};

    students.forEach(student => {
      let state = student.state || 'UNKNOWN';
      state = state.trim().toUpperCase();
      
      if (stateCorrections[state]) {
        state = stateCorrections[state];
      }

      if (!stateStats[state]) {
        stateStats[state] = {
          total: 0,
          registeredJklu: 0,
          confirmedAarambh: 0,
          notComing: 0,
          notContinuing: 0
        };
      }

      stateStats[state].total++;
      if (student.confirmedJklu) {
        stateStats[state].registeredJklu++;
      }
      if (student.confirmedAarambh) {
        stateStats[state].confirmedAarambh++;
      }
      if (student.notComingAarambh) {
        stateStats[state].notComing++;
      }
      if (student.notContinuing) {
        stateStats[state].notContinuing++;
      }
    });

    const sortedStates = Object.keys(stateStats).sort((a, b) => stateStats[b].total - stateStats[a].total);

    console.log("\n### State-wise Registration Summary");
    console.log("| State | Total Students | Registered at JKLU | Aarambh Confirmed | Not Coming to Aarambh | Not Continuing | Active Target |");
    console.log("| :--- | :---: | :---: | :---: | :---: | :---: | :---: |");
    
    let totalAll = 0;
    let totalReg = 0;
    let totalAar = 0;
    let totalNotC = 0;
    let totalNotCont = 0;
    let totalActiveTarget = 0;

    sortedStates.forEach(state => {
      const stats = stateStats[state];
      totalAll += stats.total;
      totalReg += stats.registeredJklu;
      totalAar += stats.confirmedAarambh;
      totalNotC += stats.notComing;
      totalNotCont += stats.notContinuing;
      
      // Active Target = Total - Not Continuing - Not Coming
      const activeTarget = stats.total - stats.notContinuing - stats.notComing;
      totalActiveTarget += activeTarget;

      console.log(`| ${state} | ${stats.total} | ${stats.registeredJklu} | ${stats.confirmedAarambh} | ${stats.notComing} | ${stats.notContinuing} | ${activeTarget} |`);
    });
    
    console.log(`| **TOTAL** | **${totalAll}** | **${totalReg}** | **${totalAar}** | **${totalNotC}** | **${totalNotCont}** | **${totalActiveTarget}** |`);

  } catch (error) {
    console.error("Error:", error);
  } finally {
    await mongoose.disconnect();
  }
}

run();
