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
  confirmedJklu: { type: Boolean, default: false }
});

const Student = mongoose.model('Student', studentSchema);

async function run() {
  try {
    await mongoose.connect(uri);
    
    // Search terms
    const queries = [
      { name: /Aarvick/i },
      { mobile: /7300201970/ },
      { mobile: /9414647803/ },
      { name: /Ananya/i },
      { applicationNo: /0377/ },
      { mobile: /9351771615/ },
      { name: /Swaroop/i },
      { mobile: /6377005952/ },
      { name: /Bhavyanshu/i },
      { name: /Riddhi/i },
      { name: /Rajat/i },
      { name: /Rudraksh/i },
      { name: /Kartavya/i },
      { name: /Jagan/i },
      { name: /Srujan/i }
    ];

    console.log("Searching DB for unmatched entities:");
    console.log("=" * 80);

    for (const q of queries) {
      const match = await Student.find(q);
      if (match.length > 0) {
        console.log(`\nQuery: ${JSON.stringify(q)} (found ${match.length} records):`);
        for (const s of match) {
          console.log(` - App No: ${s.applicationNo} | Name: ${s.name} | Phone: ${s.mobile} | Conf Jklu: ${s.confirmedJklu}`);
        }
      }
    }
  } catch (error) {
    console.error("Error:", error);
  } finally {
    await mongoose.disconnect();
  }
}

run();
