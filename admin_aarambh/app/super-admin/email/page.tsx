'use client';

import React, { useEffect, useState } from 'react';
import { api } from '../../lib/api';

export default function EmailSystem() {
  const [testEmail, setTestEmail] = useState('');
  const [subject, setSubject] = useState('Invitation to AARAMBH 2026 - Your Journey at JKLU Begins Here!');
  const [bodyTemplate, setBodyTemplate] = useState(`<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Invitation to AARAMBH 2026</title>
  <meta name="color-scheme" content="light dark">
  <meta name="supported-color-schemes" content="light dark">
  <style>
    :root {
      color-scheme: light dark;
      supported-color-schemes: light dark;
    }
    body {
      font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;
      background-color: #f3f4f6;
      margin: 0;
      padding: 0;
      -webkit-font-smoothing: antialiased;
    }
    .email-container {
      max-width: 650px;
      margin: 30px auto;
      background-color: #ffffff;
      border-radius: 0px;
      overflow: hidden;
      border: none;
      box-shadow: 0 4px 15px rgba(0, 0, 0, 0.05);
    }
    .email-banner-img {
      width: 100%;
      max-width: 650px;
      display: block;
      border: 0;
    }
    .email-body {
      padding: 45px 30px;
      color: #111827; /* Black text */
      line-height: 1.7;
    }
    .email-body h2 {
      font-size: 22px;
      color: #0F2C59; /* Dark Blue title */
      margin-top: 0;
      font-weight: 800;
      border-bottom: 2px solid #E36414; /* Orange line */
      padding-bottom: 10px;
    }
    .email-body p {
      font-size: 14.5px;
      margin-bottom: 20px;
      color: #111827; /* Black body text */
    }
    .email-body ul {
      margin-bottom: 20px;
      padding-left: 20px;
      color: #111827;
    }
    .email-body li {
      font-size: 14px;
      margin-bottom: 8px;
    }
    .section-title {
      font-size: 16px;
      font-weight: 800;
      color: #0F2C59; /* Dark Blue section title */
      margin-top: 35px;
      margin-bottom: 12px;
      text-transform: uppercase;
      letter-spacing: 0.5px;
    }
    .cohort-card {
      background-color: #f9fafb;
      border-left: 5px solid #E36414; /* Dark Orange left border */
      padding: 24px;
      margin: 30px 0;
      border-radius: 0px;
    }
    .cohort-title {
      font-size: 11px;
      text-transform: uppercase;
      letter-spacing: 1.5px;
      color: #0F2C59; /* Dark Blue */
      font-weight: 800;
      margin-bottom: 6px;
    }
    .cohort-value {
      font-size: 24px;
      color: #0F2C59; /* Dark Blue */
      font-weight: 800;
      margin-bottom: 18px;
    }
    .leader-info {
      font-size: 13.5px;
      color: #111827; /* Black */
      border-top: 1px solid #e5e7eb;
      padding-top: 15px;
    }
    .leader-info div {
      margin-bottom: 6px;
    }
    .leader-info strong {
      color: #0F2C59; /* Dark Blue for labels */
    }
    .cta-button {
      display: inline-block;
      background-color: #E36414; /* Dark Orange button */
      color: #ffffff !important;
      text-decoration: none;
      padding: 14px 35px;
      border-radius: 0px; /* Sharp corners */
      font-weight: 800;
      font-size: 14.5px;
      text-align: center;
      letter-spacing: 0.5px;
      margin: 15px 0;
      border: 2px solid #E36414;
      cursor: pointer;
      text-transform: uppercase;
    }
    .cta-button:hover {
      background-color: #ffffff;
      color: #E36414 !important;
    }
    .qr-container {
      text-align: center;
      margin: 35px 0;
      padding: 25px;
      border: 2px dashed #e5e7eb;
      border-radius: 0px; /* Sharp corners */
      background-color: #fffdf9;
    }
    .qr-container img {
      margin: 0 auto 12px auto;
      border: 6px solid #ffffff;
      box-shadow: 0 4px 10px rgba(0, 0, 0, 0.06);
    }
    .qr-text {
      font-size: 11.5px;
      color: #0F2C59; /* Dark Blue */
      font-weight: 700;
    }
    .signature-section {
      margin-top: 40px;
      border-top: 1px solid #edf2f7;
      padding-top: 25px;
      font-size: 14.5px;
      color: #111827; /* Black */
    }
    .signature-title {
      font-weight: 800;
      color: #0F2C59; /* Dark Blue */
    }
    .signature-sub {
      font-size: 12.5px;
      color: #E36414; /* Dark Orange */
      font-weight: 600;
    }

    /* Responsive Media Queries */
    @media only screen and (max-width: 600px) {
      .email-container {
        margin: 0 auto !important;
        width: 100% !important;
      }
      .email-body {
        padding: 30px 20px !important;
      }
    }

    /* Dark Mode Media Queries */
    @media (prefers-color-scheme: dark) {
      body {
        background-color: #121212 !important;
      }
      .email-container {
        background-color: #1a1a1a !important;
        box-shadow: 0 4px 15px rgba(0, 0, 0, 0.5) !important;
      }
      .email-body {
        color: #e0e0e0 !important;
      }
      .email-body h2 {
        color: #93C5FD !important; /* Brighter Blue */
        border-bottom: 2px solid #FB923C !important; /* Brighter Orange */
      }
      .email-body p, .email-body ul, .email-body li {
        color: #e0e0e0 !important;
      }
      .section-title {
        color: #93C5FD !important;
      }
      .cohort-card {
        background-color: #242424 !important;
        border-left: 5px solid #FB923C !important;
      }
      .cohort-title {
        color: #93C5FD !important;
      }
      .cohort-value {
        color: #93C5FD !important;
      }
      .leader-info {
        color: #e0e0e0 !important;
        border-top: 1px solid #333333 !important;
      }
      .leader-info strong {
        color: #93C5FD !important;
      }
      .qr-container {
        border: 2px dashed #444444 !important;
        background-color: #202020 !important;
      }
      .qr-text {
        color: #93C5FD !important;
      }
      .signature-section {
        border-top: 1px solid #333333 !important;
        color: #e0e0e0 !important;
      }
      .signature-title {
        color: #93C5FD !important;
      }
      .signature-sub {
        color: #FB923C !important;
      }
    }

    /* Outlook Dark Mode Targeting */
    [data-ogsc] body, [data-ogsb] body {
      background-color: #121212 !important;
    }
    [data-ogsc] .email-container, [data-ogsb] .email-container {
      background-color: #1a1a1a !important;
    }
    [data-ogsc] .email-body, [data-ogsb] .email-body {
      color: #e0e0e0 !important;
    }
    [data-ogsc] .email-body h2, [data-ogsb] .email-body h2 {
      color: #93C5FD !important;
      border-bottom: 2px solid #FB923C !important;
    }
    [data-ogsc] .email-body p, [data-ogsb] .email-body p,
    [data-ogsc] .email-body ul, [data-ogsb] .email-body ul,
    [data-ogsc] .email-body li, [data-ogsb] .email-body li {
      color: #e0e0e0 !important;
    }
    [data-ogsc] .section-title, [data-ogsb] .section-title {
      color: #93C5FD !important;
    }
    [data-ogsc] .cohort-card, [data-ogsb] .cohort-card {
      background-color: #242424 !important;
      border-left: 5px solid #FB923C !important;
    }
    [data-ogsc] .cohort-title, [data-ogsb] .cohort-title {
      color: #93C5FD !important;
    }
    [data-ogsc] .cohort-value, [data-ogsb] .cohort-value {
      color: #93C5FD !important;
    }
    [data-ogsc] .leader-info, [data-ogsb] .leader-info {
      color: #e0e0e0 !important;
      border-top: 1px solid #333333 !important;
    }
    [data-ogsc] .leader-info strong, [data-ogsb] .leader-info strong {
      color: #93C5FD !important;
    }
    [data-ogsc] .qr-container, [data-ogsb] .qr-container {
      border: 2px dashed #444444 !important;
      background-color: #202020 !important;
    }
    [data-ogsc] .qr-text, [data-ogsb] .qr-text {
      color: #93C5FD !important;
    }
    [data-ogsc] .signature-section, [data-ogsb] .signature-section {
      border-top: 1px solid #333333 !important;
      color: #e0e0e0 !important;
    }
    [data-ogsc] .signature-title, [data-ogsb] .signature-title {
      color: #93C5FD !important;
    }
    [data-ogsc] .signature-sub, [data-ogsb] .signature-sub {
      color: #FB923C !important;
    }
  </style>
</head>
<body>
  <div class="email-container">
    <!-- Embedded composite banner image -->
    <img src="cid:bannerImage" class="email-banner-img" alt="Welcome Home | AARAMBH 2026" />
    
    <div class="email-body">
      <h2>Welcome to JK Lakshmipat University!</h2>
      <p>Dear {{firstName}},</p>
      <p>Congratulations on becoming a part of the JKLU family!</p>
      <p>You are now joining a vibrant community of learners, innovators, creators, and future leaders, and we are honoured to be a part of your journey over the coming years.</p>
      <p>Your admission to JKLU marks the beginning of an exciting new chapter filled with opportunities to learn, explore, innovate, and grow. As you prepare to embark on this transformative journey, we are delighted to invite you to AARAMBH 2026, JKLU's Official Orientation and Induction Programme.</p>
      <p>Designed to help you transition smoothly into university life, AARAMBH is where your academic journey begins, lifelong friendships are formed, and your connection with the JKLU community takes shape.</p>
      <p>At JKLU, we believe that your university experience begins long before your first class, it begins the moment you become a part of our community, and AARAMBH is our way of welcoming you into it.</p>

      <div class="section-title">AARAMBH 2026 Details</div>
      <ul>
        <li><strong>Programme Duration:</strong> 14 July to 21 July 2026</li>
        <li><strong>Venue:</strong> JK Lakshmipat University Campus, Jaipur</li>
        <li><strong>Reporting & Registration:</strong> From 13 July 2026 onwards</li>
      </ul>

      <div class="section-title">What is AARAMBH?</div>
      <p>AARAMBH, meaning "A New Beginning," is much more than an orientation programme, it is your first experience of life at JKLU.</p>
      <p>During these eight days, you will:</p>
      <ul>
        <li>Discover JKLU's distinctive academic philosophy and learning environment.</li>
        <li>Meet your faculty members, mentors, and fellow students.</li>
        <li>Build friendships with peers from across the country.</li>
        <li>Participate in experiential workshops, leadership sessions, team-building activities, and cultural events.</li>
        <li>Explore the campus, student life, clubs, sports, and opportunities beyond the classroom.</li>
        <li>Develop the confidence, skills, and mindset required to thrive at university.</li>
      </ul>
      <p>By the end of AARAMBH, you will not only know your campus, you will truly feel at home.</p>

      <div class="section-title">Dedicated Support Throughout Your Journey</div>
      <p>Beginning university is both exciting and a significant life transition. To ensure that your experience is smooth, comfortable, and memorable, a dedicated team of over 200 trained student leaders, faculty members, and Student Affairs professionals, including myself, will be available on campus 24x7 throughout AARAMBH.</p>
      <p>Whether you need guidance, assistance, or simply someone to talk to, we will always be there to support you every step of the way.</p>

      <div class="section-title">Your First Friend at JKLU - Your Cohort Leader</div>
      <p>At JKLU, we believe that every student deserves a friendly face to guide them through their first days on campus.</p>
      <p>To make your transition seamless, every incoming student is assigned a Cohort Leader, a carefully selected and trained senior student who will serve as your first friend, mentor, and guide throughout AARAMBH and beyond.</p>

      <div class="cohort-card">
        <div class="cohort-title">Your Assigned Cohort Leader</div>
        <div class="cohort-value">Cohort {{cohort}}</div>
        <div class="leader-info">
          <div>👤 <strong>Name:</strong> {{cohortLeaderName}}</div>
          <div>📞 <strong>Mobile:</strong> {{cohortLeaderPhone}}</div>
          <div>✉️ <strong>Email:</strong> {{cohortLeaderEmail}}</div>
        </div>
      </div>

      <p>Your Cohort Leader will personally connect with you within 24 hours of receiving this email to introduce themselves, assist you with your preparations, answer your questions, and help make your arrival at JKLU comfortable and stress-free.</p>
      <p>Please save your Cohort Leader's contact details. They will be your primary point of contact before your arrival and throughout AARAMBH 2026.</p>

      <div class="section-title">Registration for AARAMBH 2026</div>
      <p>Participation in AARAMBH 2026 is mandatory for all newly admitted students.</p>
      <p>A one-time registration fee of ₹2,500 is payable at the time of registration. This fee includes:</p>
      <ul>
        <li>Non-AC accommodation</li>
        <li>Meals throughout the programme</li>
        <li>AARAMBH Participant Kit</li>
        <li>Access to all academic sessions, workshops, activities, and cultural events</li>
      </ul>
      <p>Students may opt for Air-Conditioned accommodation by paying an additional ₹2,000, subject to availability.</p>
      <p>Students who have already paid their semester hostel fees will be allotted their permanent hostel rooms directly.</p>

      <div class="section-title">Important Notes</div>
      <ul>
        <li>The AARAMBH Registration Fee is strictly non-refundable and non-transferable under any circumstances.</li>
        <li>Students must carry proof of payment of their complete semester fees while reporting on campus in order to participate in AARAMBH.</li>
      </ul>

      <div class="section-title">Registration Portal</div>
      <p>Register online through the AARAMBH Portal:</p>
      <div style="text-align: center;">
        <a href="https://aarambh.jklu.edu.in" class="cta-button">Register for AARAMBH 2026</a>
      </div>

      <div class="qr-container">
        <img src="/registration_qr.png" width="120" height="120" alt="Registration QR Code" />
        <div class="qr-text">Scan to register directly from your phone</div>
      </div>

      <div class="section-title">Guidelines & Preparation</div>
      <p>Please carefully read the attached AARAMBH Guidelines, which contains important information regarding:</p>
      <ul>
        <li>Documents and completed admission forms to be submitted.</li>
        <li>Hostel and arrival guidelines.</li>
        <li>Packing checklist.</li>
        <li>Campus regulations and code of conduct.</li>
        <li>Other important instructions to help you prepare for a smooth transition to university life.</li>
      </ul>

      <div class="section-title">What Awaits You?</div>
      <p>At AARAMBH, you can look forward to:</p>
      <ul>
        <li>Academic orientation and interactions with faculty members.</li>
        <li>Leadership and life-skill development sessions.</li>
        <li>Experiential learning and team-building activities.</li>
        <li>Cultural evenings, performances, music, and open mics.</li>
        <li>Sports, recreation, and community engagement.</li>
        <li>Opportunities to connect, collaborate, and create memories that will last a lifetime.</li>
      </ul>
      <p>Every aspect of AARAMBH has been thoughtfully designed to ensure that your first week at JKLU is inspiring, engaging, and unforgettable.</p>

      <div class="section-title">Your Next Steps</div>
      <p>Your AARAMBH journey begins the moment you register. We encourage you to complete the steps below at the earliest to ensure a smooth and hassle-free arrival on campus.</p>
      <ol>
        <li>Register online through the AARAMBH Portal: <a href="https://aarambh.jklu.edu.in">https://aarambh.jklu.edu.in</a></li>
        <li>Complete all admission-related formalities through <a href="https://sahayak.jklu.edu.in">https://sahayak.jklu.edu.in</a>.</li>
        <li>Print all admission forms, obtain parent/guardian signatures wherever required, and bring the original signed copies during AARAMBH for document verification.</li>
        <li>Plan your arrival on campus on or before 13th July 2026.</li>
        <li>Carefully review the attached Guidelines Handbook and packing checklist.</li>
        <li>Connect with your Cohort Leader for any assistance before your arrival.</li>
      </ol>

      <div class="section-title">A Message to Parents</div>
      <p>Dear Parents,</p>
      <p>Entrusting your child to a university is an important milestone, and we understand the confidence and trust you place in us.</p>
      <p>At JK Lakshmipat University, the safety, well-being, and holistic development of every student remain our highest priority. Throughout AARAMBH and beyond, our Student Affairs Team, faculty members, hostel staff, healthcare professionals, security personnel, and trained student leaders will work together to ensure that every student feels welcomed, supported, and cared for from the moment they arrive on campus.</p>
      <p>As partners in your child's educational journey, we are committed to creating an environment where every student can learn with confidence, grow with purpose, and thrive as a responsible global citizen.</p>
      <p>We look forward to welcoming your family to the JKLU community.</p>

      <div class="section-title">Need Assistance?</div>
      <p>If you have any questions regarding AARAMBH 2026, registration, accommodation, travel, reporting, documentation, or any other aspect of joining JKLU, please do not hesitate to reach out to your Cohort Leader or the Student Affairs Office.</p>
      <p>No question is too small, we are always happy to assist you. Our goal is to ensure that you and your family feel informed, comfortable, and confident as you prepare to join the JKLU community.</p>
      <p>We are excited to welcome you to the JKLU campus and look forward to beginning this remarkable journey together.</p>
      <p>We understand that starting university is a significant milestone, not only for you but also for your parents and family. It is natural to have questions and expectations as you prepare for this new phase of life. Please be assured that our Student Affairs Team, along with your Cohort Leader, will remain available to support and guide you before your arrival, throughout AARAMBH, and beyond. We are committed to ensuring that your transition to JKLU is smooth, comfortable, safe, and truly memorable.</p>
      <p>May AARAMBH 2026 be the beginning of lifelong friendships, inspiring experiences, meaningful learning, and countless opportunities to discover your potential.</p>
      <p>Thank you for choosing JK Lakshmipat University. We are honoured to be a part of your academic journey and look forward to helping you create memories, friendships, and experiences that will stay with you for a lifetime.</p>
      <p>I look forward to personally welcoming each one of you to the JKLU campus. Have a safe journey, and see you at AARAMBH 2026!</p>
      
      <p>Welcome to JKLU. Welcome Home.</p>

      <div class="signature-section">
        <div class="signature-title">Warm Regards,</div>
        <div class="signature-title" style="margin-top: 10px;">Deepak Sogani</div>
        <div class="signature-sub">Head, Student Affairs</div>
        <div class="signature-sub">JK Lakshmipat University</div>
      </div>
    </div>
  </div>
</body>
</html>`);

  const [bcc, setBcc] = useState('');
  
  // Trial Bulk Form State
  const [trialRecipients, setTrialRecipients] = useState('');
  const [trialSubject, setTrialSubject] = useState('Test Campaign - Aarambh 2026');
  const [trialBody, setTrialBody] = useState('<p>This is a custom test bulk email sent from the Aarambh 2026 Team Portal.</p>');
  const [trialCc, setTrialCc] = useState('');
  const [trialBcc, setTrialBcc] = useState('');
  const [trialAttachment, setTrialAttachment] = useState<File | null>(null);

  const [logs, setLogs] = useState<any[]>([]);
  const [rateStatus, setRateStatus] = useState<any>(null);
  
  const [loading, setLoading] = useState(false);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<'send' | 'trial-bulk' | 'logs' | 'students'>('send');

  // Student email status state
  const [students, setStudents] = useState<any[]>([]);
  const [loadingStudents, setLoadingStudents] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [sendingStudentId, setSendingStudentId] = useState<string | null>(null);

  const fetchStudents = async () => {
    setLoadingStudents(true);
    try {
      const data = await api.email.getStudentsStatus();
      setStudents(data);
    } catch (err) {
      console.error('Failed to load student status data:', err);
    } finally {
      setLoadingStudents(false);
    }
  };

  const handleSendIndividualEmail = async (studentId: string) => {
    setSendingStudentId(studentId);
    setSuccessMsg(null);
    setErrorMsg(null);
    try {
      const res = await api.email.sendBulk({
        studentIds: [studentId],
        subject,
        bodyTemplate,
        bcc
      });
      if (res.success) {
        if (res.failedCount > 0) {
          setErrorMsg(res.errors[0]?.error || 'Failed to send email to student.');
        } else {
          setSuccessMsg('Email sent successfully!');
          fetchStudents();
          fetchLogsAndRate();
        }
      }
    } catch (err: any) {
      setErrorMsg(err.message || 'Error sending email to student.');
    } finally {
      setSendingStudentId(null);
    }
  };

  const fetchLogsAndRate = async () => {
    try {
      const logData = await api.email.getLogs();
      setLogs(logData);
      const rate = await api.email.getRateStatus();
      setRateStatus(rate);
    } catch (err) {
      console.error('Failed to load email system data:', err);
    }
  };

  useEffect(() => {
    fetchLogsAndRate();
    const interval = setInterval(fetchLogsAndRate, 30000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (activeTab === 'students') {
      fetchStudents();
    }
  }, [activeTab]);

  const handleSendTrial = async () => {
    setLoading(true);
    setSuccessMsg(null);
    setErrorMsg(null);
    try {
      const res = await api.email.sendTrial(testEmail || undefined);
      if (res.success) {
        setSuccessMsg(res.message);
        fetchLogsAndRate();
      }
    } catch (err: any) {
      setErrorMsg(err.message || 'Error sending trial email.');
    } finally {
      setLoading(false);
    }
  };

  const handleSendBulk = async () => {
    if (!confirm('Are you sure you want to trigger emails to ALL distributed students?')) return;
    setLoading(true);
    setSuccessMsg(null);
    setErrorMsg(null);
    try {
      const res = await api.email.sendBulk({
        subject,
        bodyTemplate,
        bcc: bcc || undefined
      });
      if (res.success) {
        setSuccessMsg(res.message);
        fetchLogsAndRate();
      }
    } catch (err: any) {
      setErrorMsg(err.message || 'Error triggering bulk emails.');
    } finally {
      setLoading(false);
    }
  };

  const handleSendTrialBulk = async () => {
    if (!trialRecipients || !trialSubject || !trialBody) {
      setErrorMsg('Please enter recipients, subject, and body.');
      return;
    }

    if (trialAttachment && trialAttachment.size > 4 * 1024 * 1024) {
      setErrorMsg('Attachment file size is too large. The maximum file size allowed is 4MB.');
      return;
    }

    setLoading(true);
    setSuccessMsg(null);
    setErrorMsg(null);
    
    try {
      const formData = new FormData();
      formData.append('toEmails', trialRecipients);
      formData.append('subject', trialSubject);
      formData.append('body', trialBody);
      if (trialCc) formData.append('ccEmails', trialCc);
      if (trialBcc) formData.append('bccEmails', trialBcc);
      if (trialAttachment) formData.append('attachment', trialAttachment);

      const res = await api.email.sendTestBulk(formData);
      if (res.success) {
        setSuccessMsg(res.message);
        // Reset file uploader
        setTrialAttachment(null);
        fetchLogsAndRate();
      }
    } catch (err: any) {
      setErrorMsg(err.message || 'Error sending trial bulk emails.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-8">
      {/* Title */}
      <div>
        <h1 className="text-3xl font-extrabold tracking-tight font-outfit text-slate-900">Email Outreach Center</h1>
        <p className="text-sm text-slate-500 font-semibold mt-1">Send communication emails to new students using Outlook SMTP. CCs Cohort Leaders and respects strict rate limits.</p>
      </div>

      {/* Success/Error alerts */}
      {successMsg && (
        <div className="p-4 bg-emerald-50 border border-emerald-100 text-emerald-800 text-sm font-semibold rounded-2xl flex items-center gap-3">
          <span className="text-xl">✅</span>
          <span>{successMsg}</span>
        </div>
      )}

      {errorMsg && (
        <div className="p-4 bg-red-50 border border-red-100 text-red-800 text-sm font-semibold rounded-2xl flex items-center gap-3">
          <span className="text-xl">❌</span>
          <span>{errorMsg}</span>
        </div>
      )}

      {/* Tabs & Quota display */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
        {/* Left/Middle content */}
        <div className="lg:col-span-2 space-y-6">
          <div className="flex border-b border-card-border gap-6">
            <button
              onClick={() => setActiveTab('send')}
              className={`pb-3 font-bold text-sm transition-all cursor-pointer ${
                activeTab === 'send' ? 'border-b-2 border-primary text-primary' : 'text-slate-400'
              }`}
            >
              Compose & Send
            </button>
            <button
              onClick={() => setActiveTab('trial-bulk')}
              className={`pb-3 font-bold text-sm transition-all cursor-pointer ${
                activeTab === 'trial-bulk' ? 'border-b-2 border-primary text-primary' : 'text-slate-400'
              }`}
            >
              Trial Bulk (Test Campaign)
            </button>
            <button
              onClick={() => setActiveTab('students')}
              className={`pb-3 font-bold text-sm transition-all cursor-pointer ${
                activeTab === 'students' ? 'border-b-2 border-primary text-primary' : 'text-slate-400'
              }`}
            >
              Student List & Status
            </button>
            <button
              onClick={() => setActiveTab('logs')}
              className={`pb-3 font-bold text-sm transition-all cursor-pointer ${
                activeTab === 'logs' ? 'border-b-2 border-primary text-primary' : 'text-slate-400'
              }`}
            >
              Email Logs ({logs.length})
            </button>
          </div>

          {activeTab === 'send' ? (
            /* Compose Tab */
            <div className="glass-card p-6 space-y-6">
              <div className="space-y-4">
                <div>
                  <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Email Subject</label>
                  <input
                    type="text"
                    value={subject}
                    onChange={(e) => setSubject(e.target.value)}
                    className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-2xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:bg-white text-slate-900 font-semibold"
                    placeholder="Enter email subject"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">HTML Body Template</label>
                  <textarea
                    rows={12}
                    value={bodyTemplate}
                    onChange={(e) => setBodyTemplate(e.target.value)}
                    className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-2xl text-sm font-mono focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:bg-white text-slate-900"
                  />
                  <span className="text-[10px] text-slate-400 font-bold block mt-1">
                    Available variables: &#123;&#123;name&#125;&#125;, &#123;&#123;firstName&#125;&#125;, &#123;&#123;applicationNo&#125;&#125;, &#123;&#123;course&#125;&#125;, &#123;&#123;cohort&#125;&#125;, &#123;&#123;cohortLeaderName&#125;&#125;, &#123;&#123;cohortLeaderPhone&#125;&#125;, &#123;&#123;cohortLeaderEmail&#125;&#125;
                  </span>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Custom BCC Addresses (Optional, comma-separated)</label>
                  <input
                    type="text"
                    value={bcc}
                    onChange={(e) => setBcc(e.target.value)}
                    className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-2xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:bg-white text-slate-900 font-medium"
                    placeholder="e.g. registrar@jklu.edu.in, dean@jklu.edu.in"
                  />
                  <span className="text-[10px] text-slate-400 font-bold block mt-1">
                    Note: deepaksogani@jklu.edu.in is automatically BCC&apos;d on all student emails.
                  </span>
                </div>
              </div>

              <div className="pt-4 border-t border-slate-100 flex justify-end gap-3">
                <button
                  onClick={handleSendBulk}
                  disabled={loading || !rateStatus?.allowed}
                  className={`px-6 py-3 rounded-full text-xs font-bold text-white shadow-md cursor-pointer ${
                    rateStatus?.allowed && !loading ? 'bg-indigo-600 hover:bg-indigo-700' : 'bg-slate-300 cursor-not-allowed shadow-none'
                  }`}
                >
                  {loading ? 'Sending...' : 'Trigger Bulk Mail to All Students'}
                </button>
              </div>
            </div>
          ) : activeTab === 'trial-bulk' ? (
            /* Trial Bulk Tab */
            <div className="glass-card p-6 space-y-6">
              <div className="space-y-4">
                <div>
                  <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Recipient Emails (Comma-separated)</label>
                  <input
                    type="text"
                    value={trialRecipients}
                    onChange={(e) => setTrialRecipients(e.target.value)}
                    className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-2xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:bg-white text-slate-900 font-medium"
                    placeholder="recipient1@gmail.com, recipient2@gmail.com"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Email Subject</label>
                  <input
                    type="text"
                    value={trialSubject}
                    onChange={(e) => setTrialSubject(e.target.value)}
                    className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-2xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:bg-white text-slate-900 font-semibold"
                    placeholder="Enter subject line"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">HTML Email Body</label>
                  <textarea
                    rows={8}
                    value={trialBody}
                    onChange={(e) => setTrialBody(e.target.value)}
                    className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-2xl text-sm font-mono focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:bg-white text-slate-900"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Custom CC Emails</label>
                    <input
                      type="text"
                      value={trialCc}
                      onChange={(e) => setTrialCc(e.target.value)}
                      className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-2xl text-xs focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:bg-white text-slate-900"
                      placeholder="cc1@gmail.com, cc2@gmail.com"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Custom BCC Emails</label>
                    <input
                      type="text"
                      value={trialBcc}
                      onChange={(e) => setTrialBcc(e.target.value)}
                      className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-2xl text-xs focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:bg-white text-slate-900"
                      placeholder="bcc1@gmail.com"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">File Attachment</label>
                  <input
                    type="file"
                    onChange={(e) => setTrialAttachment(e.target.files ? e.target.files[0] : null)}
                    className="w-full text-xs text-slate-500 file:mr-4 file:py-2.5 file:px-4 file:rounded-full file:border-0 file:text-xs file:font-bold file:bg-indigo-50 file:text-primary hover:file:bg-indigo-100 cursor-pointer"
                  />
                  <span className="text-[10px] text-slate-400 font-bold block mt-1">
                    Maximum allowed attachment size is 4MB.
                  </span>
                </div>
              </div>

              <div className="pt-4 border-t border-slate-100 flex justify-end">
                <button
                  onClick={handleSendTrialBulk}
                  disabled={loading || !rateStatus?.allowed}
                  className={`px-6 py-3 rounded-full text-xs font-bold text-white shadow-md cursor-pointer ${
                    rateStatus?.allowed && !loading ? 'bg-primary hover:bg-primary-hover shadow-indigo-100' : 'bg-slate-300 cursor-not-allowed shadow-none'
                  }`}
                >
                  {loading ? 'Sending Campaign...' : 'Send Trial Campaign'}
                </button>
              </div>
            </div>
          ) : activeTab === 'students' ? (
            /* Students Tab */
            <div className="glass-card p-6 space-y-4">
              <div className="flex flex-col md:flex-row gap-4 justify-between items-center pb-2 border-b border-slate-100">
                <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider">Student Email Delivery Status</h3>
                <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
                  <input
                    type="text"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="px-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:bg-white text-slate-900 w-full sm:w-48"
                    placeholder="Search name, app no, cohort..."
                  />
                  <select
                    value={statusFilter}
                    onChange={(e) => setStatusFilter(e.target.value)}
                    className="px-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:bg-white text-slate-700 cursor-pointer"
                  >
                    <option value="all">All Statuses</option>
                    <option value="sent">Sent</option>
                    <option value="failed">Failed</option>
                    <option value="pending">Pending</option>
                    <option value="not_sent">Not Sent</option>
                  </select>
                </div>
              </div>

              {loadingStudents ? (
                <div className="py-12 text-center text-slate-400 font-bold text-xs">
                  Loading student email statuses...
                </div>
              ) : (
                <div className="overflow-x-auto max-h-[500px]">
                  <table className="w-full text-left border-collapse text-sm">
                    <thead>
                      <tr className="bg-slate-50 border-b border-card-border text-xs font-bold text-slate-400 uppercase">
                        <th className="p-4">Student Info</th>
                        <th className="p-4">Cohort & Course</th>
                        <th className="p-4">Delivery Status</th>
                        <th className="p-4 text-right">Action</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 font-semibold text-slate-700">
                      {students.filter(student => {
                        const matchesSearch = 
                          student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          student.applicationNo.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          student.cohort.toLowerCase().includes(searchTerm.toLowerCase());
                        
                        const matchesStatus = 
                          statusFilter === 'all' || 
                          student.emailStatus === statusFilter;
                          
                        return matchesSearch && matchesStatus;
                      }).map((student) => (
                        <tr key={student._id} className="hover:bg-slate-50/50">
                          <td className="p-4">
                            <div className="text-slate-900 font-bold">{student.name}</div>
                            <div className="text-[10px] text-slate-400 font-medium">{student.applicationNo}</div>
                            <div className="text-[11px] text-slate-500 font-medium">{student.email}</div>
                          </td>
                          <td className="p-4 text-xs">
                            <div className="text-slate-700 font-bold">Cohort: {student.cohort}</div>
                            <div className="text-slate-400 font-medium">{student.course}</div>
                          </td>
                          <td className="p-4">
                            <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                              student.emailStatus === 'sent' ? 'bg-emerald-50 text-emerald-600' :
                              student.emailStatus === 'failed' ? 'bg-red-50 text-red-600' :
                              student.emailStatus === 'pending' ? 'bg-amber-50 text-amber-600' :
                              'bg-slate-50 text-slate-400'
                            }`}>
                              {student.emailStatus === 'sent' ? 'Sent' :
                               student.emailStatus === 'failed' ? 'Failed' :
                               student.emailStatus === 'pending' ? 'Pending' : 'Not Sent'}
                            </span>
                            {student.emailSentAt && (
                              <span className="text-[9px] text-slate-400 font-medium block mt-1">
                                {new Date(student.emailSentAt).toLocaleString()}
                              </span>
                            )}
                            {student.emailError && (
                              <span className="text-[9px] text-red-500 font-normal block mt-1 max-w-[150px] truncate" title={student.emailError}>
                                {student.emailError}
                              </span>
                            )}
                          </td>
                          <td className="p-4 text-right">
                            {student.emailStatus === 'sent' ? (
                              <button
                                onClick={() => handleSendIndividualEmail(student._id)}
                                disabled={sendingStudentId !== null}
                                className="px-3 py-1 bg-slate-100 hover:bg-slate-200 text-slate-600 rounded-xl text-[11px] font-bold transition-all disabled:opacity-50 cursor-pointer"
                              >
                                {sendingStudentId === student._id ? 'Sending...' : 'Resend'}
                              </button>
                            ) : (
                              <button
                                onClick={() => handleSendIndividualEmail(student._id)}
                                disabled={sendingStudentId !== null}
                                className="px-3 py-1 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-[11px] font-bold shadow-sm transition-all disabled:opacity-50 cursor-pointer"
                              >
                                {sendingStudentId === student._id ? 'Sending...' : 'Send Email'}
                              </button>
                            )}
                          </td>
                        </tr>
                      ))}
                      {students.filter(student => {
                        const matchesSearch = 
                          student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          student.applicationNo.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          student.cohort.toLowerCase().includes(searchTerm.toLowerCase());
                        
                        const matchesStatus = 
                          statusFilter === 'all' || 
                          student.emailStatus === statusFilter;
                          
                        return matchesSearch && matchesStatus;
                      }).length === 0 && (
                        <tr>
                          <td colSpan={4} className="p-6 text-center text-slate-400 font-bold">No students found.</td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          ) : (
            /* Logs Tab */
            <div className="glass-card overflow-hidden">
              <div className="overflow-x-auto max-h-[500px]">
                <table className="w-full text-left border-collapse text-sm">
                  <thead>
                    <tr className="bg-slate-50 border-b border-card-border text-xs font-bold text-slate-400 uppercase">
                      <th className="p-4">Recipient</th>
                      <th className="p-4">Subject</th>
                      <th className="p-4">Status</th>
                      <th className="p-4">Time</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 font-semibold text-slate-700">
                    {logs.map((log) => (
                      <tr key={log._id} className="hover:bg-slate-50/50">
                        <td className="p-4 truncate max-w-[150px]" title={log.to}>{log.to}</td>
                        <td className="p-4 truncate max-w-[200px]" title={log.subject}>{log.subject}</td>
                        <td className="p-4">
                          <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                            log.status === 'sent' ? 'bg-emerald-50 text-emerald-600' :
                            log.status === 'failed' ? 'bg-red-50 text-red-600' : 'bg-amber-50 text-amber-600'
                          }`}>
                            {log.status}
                          </span>
                          {log.errorMessage && (
                            <span className="text-[10px] text-red-500 font-normal block mt-1 max-w-[150px] truncate" title={log.errorMessage}>
                              {log.errorMessage}
                            </span>
                          )}
                        </td>
                        <td className="p-4 text-xs text-slate-400">
                          {log.sentAt ? new Date(log.sentAt).toLocaleTimeString() : new Date(log.createdAt).toLocaleTimeString()}
                        </td>
                      </tr>
                    ))}
                    {logs.length === 0 && (
                      <tr>
                        <td colSpan={4} className="p-6 text-center text-slate-400 font-bold">No emails sent yet.</td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>

        {/* Right Sidebar: Quota Gauges and Trial Send */}
        <div className="space-y-6">
          {/* Quota gauges */}
          <div className="glass-card p-6 space-y-6">
            <h3 className="text-md font-extrabold text-slate-900 font-outfit">Outbox Quota Status</h3>
            
            {rateStatus && (
              <div className="space-y-6 font-semibold">
                {/* Hourly limit check */}
                <div className="space-y-2">
                  <div className="flex justify-between text-xs">
                    <span className="text-slate-400">Hourly Limit</span>
                    <span className="text-slate-800">{rateStatus.hourlyCount} / {rateStatus.hourlyLimit}</span>
                  </div>
                  <div className="w-full bg-slate-100 h-2.5 rounded-full overflow-hidden">
                    <div
                      className={`h-full rounded-full transition-all duration-500 ${
                        rateStatus.hourlyCount >= rateStatus.hourlyLimit ? 'bg-red-500' :
                        rateStatus.hourlyCount >= rateStatus.hourlyLimit * 0.8 ? 'bg-amber-500' : 'bg-primary'
                      }`}
                      style={{ width: `${Math.min((rateStatus.hourlyCount / rateStatus.hourlyLimit) * 100, 100)}%` }}
                    />
                  </div>
                </div>

                {/* Daily limit check */}
                <div className="space-y-2">
                  <div className="flex justify-between text-xs">
                    <span className="text-slate-400">Daily Limit</span>
                    <span className="text-slate-800">{rateStatus.dailyCount} / {rateStatus.dailyLimit}</span>
                  </div>
                  <div className="w-full bg-slate-100 h-2.5 rounded-full overflow-hidden">
                    <div
                      className={`h-full rounded-full transition-all duration-500 ${
                        rateStatus.dailyCount >= rateStatus.dailyLimit ? 'bg-red-500' :
                        rateStatus.dailyCount >= rateStatus.dailyLimit * 0.8 ? 'bg-amber-500' : 'bg-emerald-500'
                      }`}
                      style={{ width: `${Math.min((rateStatus.dailyCount / rateStatus.dailyLimit) * 100, 100)}%` }}
                    />
                  </div>
                </div>

                {!rateStatus.allowed && (
                  <div className="p-3 bg-red-50 border border-red-100 rounded-xl text-red-800 text-[10px] font-bold">
                    ⚠️ Sending is blocked temporarily: {rateStatus.reason}
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Trial mail sender */}
          <div className="glass-card p-6 space-y-4">
            <h3 className="text-md font-extrabold text-slate-900 font-outfit">Outlook SMTP Trial Mail</h3>
            <p className="text-xs text-slate-400 font-semibold leading-relaxed">
              Verify SMTP server connectivity by sending a test email. Leave blank to send to yourself.
            </p>
            <div>
              <input
                type="email"
                value={testEmail}
                onChange={(e) => setTestEmail(e.target.value)}
                placeholder="test-email@example.com"
                className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-2xl text-xs focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:bg-white text-slate-900"
              />
            </div>
            <button
              onClick={handleSendTrial}
              disabled={loading}
              className="w-full py-2.5 px-4 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold rounded-2xl transition-all cursor-pointer"
            >
              {loading ? 'Sending...' : 'Send Trial Mail'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
