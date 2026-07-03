const mongoose = require('mongoose');
const dotenv = require('dotenv');
const path = require('path');
const User = require('./models/User');

dotenv.config({ path: path.join(__dirname, '.env') });

const run = async () => {
  const uri = process.env.MONGODB_URI;
  if (!uri) {
    console.error("MONGODB_URI is not defined.");
    process.exit(1);
  }
  
  await mongoose.connect(uri);
  
  const email = "hosteladmin@jklu.edu.in";
  // Delete any existing first to avoid duplicate keys
  await User.deleteMany({ email });
  
  const hostelAdmin = new User({
    name: "Hostel Admin",
    email: email,
    password: "AarambhHostel@2026#Secure", // Strong secure password
    role: "admin",
    phone: "9999999999",
    studentId: "HOSTEL_ADMIN"
  });
  
  await hostelAdmin.save();
  console.log("Successfully created Hostel Admin account in MongoDB!");
  process.exit(0);
};

run().catch(err => {
  console.error(err);
  process.exit(1);
});
