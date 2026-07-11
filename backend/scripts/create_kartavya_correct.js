const path = require('path');
const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config({ path: path.join(__dirname, '../.env') });

const User = require('../models/User');

async function main() {
  try {
    console.log('Connecting to MongoDB...');
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected.');

    // 1. Delete the user with email 'kartawya@jklu.edu.in' (with w)
    const delRes1 = await User.deleteMany({ email: 'kartawya@jklu.edu.in' });
    console.log(`Deleted incorrect spelling user 'kartawya@jklu.edu.in': matched and deleted ${delRes1.deletedCount} documents.`);

    // 2. Delete any existing user with email 'kartavya@jklu.edu.in' (with v) just in case
    const delRes2 = await User.deleteMany({ email: 'kartavya@jklu.edu.in' });

    // 3. Create the user with correct spelling 'kartavya@jklu.edu.in'
    const kartavya = new User({
      name: 'Kartavya',
      email: 'kartavya@jklu.edu.in',
      password: 'Kartavya@123',
      role: 'admin'
    });

    await kartavya.save();
    console.log('User Kartavya created successfully with correct spelling!');
    console.log('  Email: kartavya@jklu.edu.in');
    console.log('  Password: Kartavya@123');
    console.log('  Role: admin');

  } catch (error) {
    console.error('Error creating user:', error);
  } finally {
    await mongoose.disconnect();
    console.log('MongoDB disconnected.');
  }
}

main();
