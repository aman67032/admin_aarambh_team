const mongoose = require('mongoose');
const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '../.env') });

const User = require('../models/User');

// Define temporary schema for teammembers since we might not have a model for it in backend
const TeamMemberSchema = new mongoose.Schema({}, { collection: 'teammembers', strict: false });
const TeamMember = mongoose.models.TeamMember || mongoose.model('TeamMember', TeamMemberSchema);

async function run() {
  const mongoUri = process.env.MONGODB_URI;
  if (!mongoUri) {
    console.error('MONGODB_URI is not set in environment!');
    process.exit(1);
  }

  console.log('Connecting to database...');
  await mongoose.connect(mongoUri);
  console.log('Connected successfully!');

  const allMembers = await TeamMember.find({});
  console.log(`Found ${allMembers.length} team members total in database.`);

  const defaultPassword = 'aarambh2026';
  let createdCount = 0;
  let skippedCount = 0;

  for (const m of allMembers) {
    const email = m.get('email');
    if (!email) {
      console.log(`Skipping member without email: ${m.get('name')}`);
      continue;
    }

    const emailLower = email.toLowerCase().trim();
    // Check if user already exists
    const existingUser = await User.findOne({ email: emailLower });

    if (existingUser) {
      // Ensure existing user has correct role if they are in teammembers but general member
      skippedCount++;
      continue;
    }

    // Determine role. If they are already in the users collection as cohort_leader or cluster_head, they'd be found.
    // If not found in users, we create them as 'teammember' role.
    const name = m.get('name') || 'Volunteer';
    const mobile = m.get('mobile') || '';
    const rollNo = m.get('rollNo') || '';

    try {
      const newUser = new User({
        name: name,
        email: emailLower,
        password: defaultPassword,
        role: 'teammember',
        phone: mobile,
        studentId: rollNo
      });

      await newUser.save();
      createdCount++;
      console.log(`[CREATED] User account for ${name} (${emailLower})`);
    } catch (err) {
      console.error(`[ERROR] Failed to save user for ${name}:`, err.message);
    }
  }

  console.log('\n=============================================');
  console.log(`Script finished!`);
  console.log(`Created new teammember users: ${createdCount}`);
  console.log(`Skipped existing users: ${skippedCount}`);
  console.log('=============================================');

  await mongoose.disconnect();
}

run().catch(err => {
  console.error('Fatal error running script:', err);
  process.exit(1);
});
