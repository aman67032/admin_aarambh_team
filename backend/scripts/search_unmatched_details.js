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
  mobile: String,
  email: String,
  confirmedJklu: { type: Boolean, default: false },
  notContinuing: { type: Boolean, default: false },
  notComingAarambh: { type: Boolean, default: false }
});

const Student = mongoose.model('Student', studentSchema);

async function run() {
  try {
    await mongoose.connect(uri);
    
    console.log("Searching DB for exact phone numbers:");
    const phones = ['6350608058', '7300201970', '9414647803'];
    for (const p of phones) {
      const match = await Student.find({ $or: [{ mobile: new RegExp(p) }, { fatherMobile: new RegExp(p) }] });
      console.log(`\nPhone ${p} (found ${match.length} records):`);
      for (const s of match) {
        console.log(` - App No: ${s.applicationNo} | Name: ${s.name} | Phone: ${s.mobile} | Conf Jklu: ${s.confirmedJklu}`);
      }
    }

    console.log("\nSearching DB for sequence numbers (tight match):");
    const seqs = ['3010', '0310', '0230', '0377'];
    for (const seq of seqs) {
      const match = await Student.find({ applicationNo: new RegExp(seq + '$') });
      console.log(`\nSequence ${seq} (found ${match.length} records):`);
      for (const s of match) {
        console.log(` - App No: ${s.applicationNo} | Name: ${s.name} | Phone: ${s.mobile} | Conf Jklu: ${s.confirmedJklu}`);
      }
    }
  } catch (error) {
    console.error("Error:", error);
  } finally {
    await mongoose.disconnect();
  }
}

run();
