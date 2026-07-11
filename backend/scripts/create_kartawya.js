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

    // Check if user already exists
    const existing = await User.findOne({ email: 'kartawya@jklu.edu.in' });
    if (existing) {
      console.log('User kartawya@jklu.edu.in already exists.');
      await mongoose.disconnect();
      return;
    }

    const kartawya = new User({
      name: 'Kartawya',
      email: 'kartawya@jklu.edu.in',
      password: 'Kartawya@123',
      role: 'admin'
    });

    await kartawya.save();
    console.log('User Kartawya created successfully!');
    console.log('  Email: kartawya@jklu.edu.in');
    console.log('  Password: Kartawya@123');
    console.log('  Role: admin');

  } catch (error) {
    console.error('Error creating user:', error);
  } finally {
    await mongoose.disconnect();
    console.log('MongoDB disconnected.');
  }
}

main();
