const fs = require('fs');
const path = require('path');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const User = require('../models/User');

// Load environment variables
dotenv.config({ path: path.join(__dirname, '../.env') });

const CSV_PATH = path.join(__dirname, '../../details of cluster.csv');
const CREDENTIALS_OUTPUT_PATH = path.join(__dirname, '../../credentials.json');

async function seedDatabase() {
  try {
    const mongoUri = process.env.MONGODB_URI;
    if (!mongoUri) {
      throw new Error('MONGODB_URI is not defined in environment variables');
    }

    console.log('Connecting to MongoDB...');
    await mongoose.connect(mongoUri);
    console.log('Connected to MongoDB.');

    // Clear existing users
    console.log('Clearing existing users...');
    await User.deleteMany({});
    console.log('Cleared users.');

    const credentialsList = [];

    // Create Super Admin
    const superAdminEmail = 'amanpratapsingh@jklu.edu.in';
    const superAdminPassword = 'superpassadmin'; // Random/fixed password
    const superAdmin = new User({
      name: 'Aman Pratap Singh',
      email: superAdminEmail,
      password: superAdminPassword,
      role: 'super_admin'
    });
    await superAdmin.save();
    credentialsList.push({
      name: 'Aman Pratap Singh',
      email: superAdminEmail,
      password: superAdminPassword,
      role: 'super_admin',
      cluster: null,
      cohort: null
    });
    console.log('Super Admin created.');

    // Create Admin
    const adminEmail = 'deepaksogani@jklu.edu.in';
    const adminPassword = 'Winningspirit'; // Random/fixed password
    const admin = new User({
      name: 'Deepak Sogani',
      email: adminEmail,
      password: adminPassword,
      role: 'admin'
    });
    await admin.save();
    credentialsList.push({
      name: 'Deepak Sogani',
      email: adminEmail,
      password: adminPassword,
      role: 'admin',
      cluster: null,
      cohort: null
    });
    console.log('Admin created.');

    // Parse details of cluster.csv
    if (!fs.existsSync(CSV_PATH)) {
      throw new Error(`CSV file not found at ${CSV_PATH}`);
    }

    const fileContent = fs.readFileSync(CSV_PATH, 'utf-8');
    const lines = fileContent.split(/\r?\n/);

    let currentCluster = null;
    let cohortCounter = 1;

    for (let line of lines) {
      line = line.trim();
      if (!line) continue;

      // Match "Cluster A", "Cluster B", etc.
      const clusterMatch = line.match(/^Cluster\s+([A-L])/i);
      if (clusterMatch) {
        currentCluster = clusterMatch[1].toUpperCase();
        cohortCounter = 1;
        console.log(`Processing Cluster ${currentCluster}...`);
        continue;
      }

      // Match data lines starting with S.No
      const parts = line.split(',');
      if (parts.length >= 7 && !isNaN(parseInt(parts[0]))) {
        const sno = parseInt(parts[0]);
        const name = parts[1].trim();
        
        const studentId = parts[2].trim();
        const gender = parts[3].trim();
        const rawRole = parts[4].trim();
        const phone = parts[5].trim();
        const email = parts[6].trim().toLowerCase();

        if (!email) continue;

        let role = '';
        let cohort = null;

        if (rawRole.toLowerCase().includes('head')) {
          role = 'cluster_head';
        } else if (rawRole.toLowerCase().includes('leader') || rawRole.toLowerCase().includes('cohort')) {
          role = 'cohort_leader';
          cohort = `${currentCluster}${cohortCounter}`;
          cohortCounter++;
        } else {
          continue;
        }

        // Generate password
        const cleanName = name.toLowerCase().replace(/[^a-z0-9]/g, '');
        const password = `${cleanName}@2026`;

        const user = new User({
          name,
          email,
          password,
          role,
          cluster: currentCluster,
          cohort,
          phone,
          studentId
        });

        await user.save();

        credentialsList.push({
          name,
          email,
          password,
          role,
          cluster: currentCluster,
          cohort
        });
      }
    }

    console.log(`Seeded ${credentialsList.length} users successfully.`);

    // Save credentials to credentials.json for reference
    fs.writeFileSync(CREDENTIALS_OUTPUT_PATH, JSON.stringify(credentialsList, null, 2), 'utf-8');
    console.log(`Credentials written to ${CREDENTIALS_OUTPUT_PATH}`);

  } catch (error) {
    console.error('Error during seeding:', error);
  } finally {
    await mongoose.disconnect();
    console.log('MongoDB disconnected.');
  }
}

// If run directly
if (require.main === module) {
  seedDatabase();
}

module.exports = seedDatabase;
