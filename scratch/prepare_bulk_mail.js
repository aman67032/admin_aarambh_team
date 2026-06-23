const fs = require('fs');
const path = require('path');

// Path to test.csv
const csvPath = path.join(__dirname, '../test.csv');
const outputPath = path.join(__dirname, 'prepared_emails.json');

// Ensure scratch directory exists
if (!fs.existsSync(__dirname)) {
  fs.mkdirSync(__dirname);
}

const fileContent = fs.readFileSync(csvPath, 'utf8');

// Parse CSV manually (robust split)
const lines = fileContent.split(/\r?\n/).map(line => line.trim()).filter(Boolean);
if (lines.length < 2) {
  console.error("CSV file is empty or lacks headers");
  process.exit(1);
}

// Extract headers
const headers = lines[0].split(',').map(h => h.trim());

// Function to split CSV row taking quotes into account
function splitCsvRow(rowText) {
  const result = [];
  let current = '';
  let inQuotes = false;
  
  for (let i = 0; i < rowText.length; i++) {
    const char = rowText[i];
    if (char === '"') {
      inQuotes = !inQuotes;
    } else if (char === ',' && !inQuotes) {
      result.push(current.trim());
      current = '';
    } else {
      current += char;
    }
  }
  result.push(current.trim());
  return result;
}

const records = [];
for (let i = 1; i < lines.length; i++) {
  const row = splitCsvRow(lines[i]);
  // Skip row 2 placeholder/blank line
  if (row.filter(Boolean).length === 0) continue;
  if (i === 1 && row[0] === '') continue; // Skip line 2 if empty header note
  
  const record = {};
  headers.forEach((header, index) => {
    record[header] = row[index] || '';
  });
  records.push(record);
}

// Normalise key names to avoid leading/trailing whitespace issues
const normalizedRecords = records.map(record => {
  const normalized = {};
  for (const key of Object.keys(record)) {
    const val = record[key] ? record[key].trim() : '';
    normalized[key.trim()] = val;
  }
  return normalized;
});
function capitalizeName(nameStr) {
  if (!nameStr) return '';
  return nameStr
    .split(/\s+/)
    .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(' ');
}

// Find Organizing Heads (OH)
const ohList = normalizedRecords.filter(r => r['Position'] === 'Organizing Head');
const ohHtml = ohList.map(o => `<div style="margin-bottom: 6px;">• <strong>${capitalizeName(o['Name'])}</strong> — ${o['Mobile Number']}</div>`).join('');

// Find all Team Leaders
const teamLeaders = normalizedRecords.filter(r => r['Position'].includes('Team Leader') || r['Position'].includes('Team-Leader'));

// Find all Volunteers
const volunteers = normalizedRecords.filter(r => r['Position'].includes('Volunteer'));

const preparedEmails = [];

volunteers.forEach(v => {
  const name = capitalizeName(v['Name']);
  const email = v['Mail ID'];
  const position = v['Position'];
  
  // Extract committee name (e.g. "Event &Venue Committee - Volunteer" -> "Event &Venue Committee")
  let committee = position;
  if (position.includes(' - Volunteer')) {
    committee = position.split(' - Volunteer')[0].trim();
  } else if (position.includes(' Volunteer')) {
    committee = position.split(' Volunteer')[0].trim();
  }

  // Find Team Leaders for this committee
  // Match if team leader's position contains the committee name
  const matchingLeaders = teamLeaders.filter(tl => {
    const tlPosition = tl['Position'];
    return tlPosition.toLowerCase().includes(committee.toLowerCase());
  });

  const leadersHtml = matchingLeaders.length > 0 
    ? matchingLeaders.map(tl => `<div style="margin-bottom: 6px;">• <strong>${capitalizeName(tl['Name'])}</strong> — ${tl['Mobile Number']}</div>`).join('')
    : '<div style="color: #ef4444;">N/A (To be assigned)</div>';

  const body = `
<div style="font-family: 'Inter', -apple-system, sans-serif; max-width: 600px; margin: 0 auto; padding: 24px; border: 1px solid #E2E8F0; border-radius: 24px; background-color: #FFFFFF;">
  
  <!-- Header -->
  <div style="text-align: center; border-bottom: 2px solid #F1F5F9; padding-bottom: 20px; margin-bottom: 24px;">
    <h2 style="color: #FF5A1F; font-size: 24px; font-weight: 800; margin: 0; text-transform: uppercase; letter-spacing: 1px;">Aarambh &apos;26</h2>
    <p style="color: #1E3A8A; font-size: 12px; font-weight: 700; margin: 4px 0 0 0; text-transform: uppercase; letter-spacing: 1px;">JK Lakshmipat University</p>
  </div>

  <!-- Content -->
  <div style="font-size: 14px; line-height: 1.6; color: #334155;">
    <p style="margin-top: 0; font-size: 16px; font-weight: 700; color: #0F172A;">Hello ${name},</p>
    
    <p>This is a test mail regarding your coordination role for the upcoming <strong>Aarambh 2026 Orientation Program</strong>.</p>
    
    <!-- Role Badge -->
    <div style="display: inline-block; background-color: #EFF6FF; border: 1px solid #BFDBFE; border-radius: 12px; padding: 8px 16px; margin: 16px 0; font-size: 13px; font-weight: 700; color: #1E40AF;">
      Role: ${position}
    </div>

    <!-- Team Leaders Section -->
    <div style="background-color: #F8FAFC; border: 1px solid #E2E8F0; border-radius: 16px; padding: 16px; margin-bottom: 20px;">
      <h3 style="color: #1E3A8A; margin-top: 0; margin-bottom: 12px; font-size: 14px; font-weight: 800; text-transform: uppercase; letter-spacing: 0.5px;">👥 Your Team Leaders</h3>
      <div style="color: #475569; font-weight: 600;">
        ${leadersHtml}
      </div>
    </div>

    <!-- Organizing Heads Section -->
    <div style="background-color: #FFF7ED; border: 1px solid #FFEDD5; border-radius: 16px; padding: 16px; margin-bottom: 24px;">
      <h3 style="color: #C2410C; margin-top: 0; margin-bottom: 12px; font-size: 14px; font-weight: 800; text-transform: uppercase; letter-spacing: 0.5px;">👑 Organizing Heads (OH)</h3>
      <div style="color: #7C2D12; font-weight: 600; font-size: 13px;">
        ${ohHtml}
      </div>
    </div>

    <p style="margin-bottom: 0;">Please check the attached <code>test.csv</code> file for the complete team roster and list of committee allocations.</p>
  </div>

  <!-- Footer/Signature -->
  <div style="margin-top: 32px; border-top: 1px solid #F1F5F9; padding-top: 20px; font-size: 13px; color: #64748B;">
    <p style="margin: 0; font-weight: 700; color: #334155;">Regards,</p>
    <p style="margin: 4px 0 0 0; font-size: 15px; font-weight: 800; color: #1E3A8A;">Aman</p>
    <p style="margin: 2px 0 0 0; font-size: 11px; font-weight: 600; color: #94A3B8; text-transform: uppercase;">Aarambh 2026 Organizing Team</p>
  </div>

</div>
  `.trim();

  preparedEmails.push({
    name,
    email,
    position,
    committee,
    subject: 'test mail',
    cc: 'amanpratapsingh@jklu.edu.in',
    body,
    teamLeaders: matchingLeaders.map(tl => tl['Name'])
  });
});

fs.writeFileSync(outputPath, JSON.stringify(preparedEmails, null, 2));

console.log(`Successfully parsed test.csv!`);
console.log(`Total Volunteers Found: ${volunteers.length}`);
console.log(`Total Organizing Heads: ${ohList.length} (${ohList.map(o => capitalizeName(o['Name'])).join(', ')})`);
console.log(`Total Team Leaders: ${teamLeaders.length}`);
console.log(`Prepared ${preparedEmails.length} emails. Saved to prepared_emails.json`);

// Show first 3 prepared emails for validation
console.log('\n--- SAMPLE PREPARED EMAILS (First 3) ---');
preparedEmails.slice(0, 3).forEach((email, idx) => {
  console.log(`\nEmail #${idx + 1}:`);
  console.log(`To: ${email.name} <${email.email}>`);
  console.log(`CC: ${email.cc}`);
  console.log(`Subject: ${email.subject}`);
  console.log(`Body:\n${email.body}`);
});
