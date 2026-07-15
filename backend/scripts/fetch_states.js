const mongoose = require('mongoose');
const dotenv = require('dotenv');
const path = require('path');

// Load environment variables
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
  region: String,
  cluster: String,
  cohort: String,
  confirmedJklu: { type: Boolean, default: false },
  confirmedAarambh: { type: Boolean, default: false },
  notContinuing: { type: Boolean, default: false },
  notComingAarambh: { type: Boolean, default: false }
});

const Student = mongoose.model('Student', studentSchema);

async function run() {
  try {
    console.log("Connecting to MongoDB...");
    await mongoose.connect(uri);
    console.log("Connected successfully.");

    const students = await Student.find({});
    console.log(`Fetched ${students.length} students from database.`);

    if (students.length === 0) {
      console.log("No students found in the database.");
      await mongoose.disconnect();
      return;
    }

    // Grouping by state
    const stateStats = {};

    students.forEach(student => {
      let state = student.state || 'UNKNOWN';
      state = state.trim().toUpperCase();

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

    // Sort states by total students descending
    const sortedStates = Object.keys(stateStats).sort((a, b) => stateStats[b].total - stateStats[a].total);

    console.log("\nSTATE-WISE DETAILS OF REGISTERED STUDENTS");
    console.log("=".repeat(100));
    console.log("State".padEnd(25) + "Total".padStart(8) + "Reg at JKLU".padStart(15) + "Aarambh Conf".padStart(15) + "Not Coming".padStart(12) + "Not Cont.".padStart(10) + "Active Target".padStart(15));
    console.log("-".repeat(100));
    
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
      
      // Active Target = Total - Not Continuing
      const activeTarget = stats.total - stats.notContinuing;
      totalActiveTarget += activeTarget;

      console.log(
        state.padEnd(25) + 
        stats.total.toString().padStart(8) + 
        stats.registeredJklu.toString().padStart(15) + 
        stats.confirmedAarambh.toString().padStart(15) + 
        stats.notComing.toString().padStart(12) + 
        stats.notContinuing.toString().padStart(10) +
        activeTarget.toString().padStart(15)
      );
    });
    console.log("-".repeat(100));
    console.log(
      "TOTAL".padEnd(25) + 
      totalAll.toString().padStart(8) + 
      totalReg.toString().padStart(15) + 
      totalAar.toString().padStart(15) + 
      totalNotC.toString().padStart(12) + 
      totalNotCont.toString().padStart(10) +
      totalActiveTarget.toString().padStart(15)
    );
    console.log("=".repeat(100));

  } catch (error) {
    console.error("Error running script:", error);
  } finally {
    await mongoose.disconnect();
    console.log("Disconnected from MongoDB.");
  }
}

run();
