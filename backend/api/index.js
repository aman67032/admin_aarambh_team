const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const path = require('path');

// Load environment variables
dotenv.config({ path: path.join(__dirname, '../.env') });

const app = express();
const PORT = process.env.PORT || 5000;

// Connect to MongoDB
const mongoUri = process.env.MONGODB_URI;
if (!mongoUri) {
  console.error('Fatal Error: MONGODB_URI environment variable is not defined.');
  process.exit(1);
}

let isConnected = false;

const connectDB = async () => {
  if (isConnected) {
    return;
  }
  try {
    await mongoose.connect(mongoUri);
    isConnected = true;
    console.log('MongoDB Connected successfully.');
  } catch (error) {
    console.error('MongoDB connection error:', error);
  }
};

// Connect for local running
if (process.env.NODE_ENV !== 'production' || !process.env.VERCEL) {
  connectDB();
}

// Middleware for serverless function requests
app.use(async (req, res, next) => {
  await connectDB();
  next();
});

// Configure CORS - Allow localhost and Vercel domains
const allowedOrigins = [
  'http://localhost:3000',
  'http://localhost:3001',
  'http://127.0.0.1:3000',
  'http://127.0.0.1:3001',
  'https://admin-aarambh-team-crat.vercel.app',
  'https://admin-aarambh-team-crat.vercel.app/'
];

app.use(cors({
  origin: function (origin, callback) {
    if (!origin) return callback(null, true);
    const isAllowed = allowedOrigins.indexOf(origin) !== -1 || origin.includes('vercel.app') || origin.includes('jklu.edu.in');
    if (isAllowed) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true
}));

app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));
app.use(cookieParser());

// Define root/status route
app.get('/', (req, res) => {
  res.send('Aarambh 2026 API Server is running. Visit /api/status for detailed info.');
});

app.get('/api/status', (req, res) => {
  res.json({
    status: 'online',
    message: 'Aarambh 2026 API Server is running.',
    mongodb: isConnected ? 'connected' : 'disconnected',
    timestamp: new Date()
  });
});

app.get('/api/status/structure', async (req, res) => {
  try {
    const User = require('../models/User');
    const users = await User.find({ role: { $in: ['cluster_head', 'cohort_leader'] } }).select('name role cluster cohort');
    
    // Group by cluster (A-L)
    const clusterConfig = {};
    const allClusters = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L'];
    
    allClusters.forEach(c => {
      clusterConfig[c] = {
        clusterName: c,
        head: null,
        cohorts: []
      };
    });

    users.forEach(user => {
      const c = user.cluster;
      if (!c || !clusterConfig[c]) return;

      if (user.role === 'cluster_head') {
        clusterConfig[c].head = user.name;
      } else if (user.role === 'cohort_leader') {
        clusterConfig[c].cohorts.push({
          cohortName: user.cohort,
          leaderName: user.name
        });
      }
    });

    // Sort cohorts inside each cluster alphabetically
    Object.keys(clusterConfig).forEach(c => {
      clusterConfig[c].cohorts.sort((a, b) => a.cohortName.localeCompare(b.cohortName));
    });

    res.json(Object.values(clusterConfig));
  } catch (error) {
    console.error('Error fetching structure:', error);
    res.status(500).json({ error: 'Failed to retrieve structural details.' });
  }
});

app.get('/api/status/cohort-allocations', async (req, res) => {
  try {
    const User = require('../models/User');
    const Student = require('../models/Student');
    const Settings = require('../models/Settings');

    // Check if published
    const setting = await Settings.findOne({ key: 'studentsPublished' });
    const isPub = setting ? !!setting.value : false;

    // Check if user is super_admin
    let isSuperAdmin = false;
    const token = req.cookies ? req.cookies.token : null;
    if (token) {
      try {
        const jwt = require('jsonwebtoken');
        const decoded = jwt.verify(token, process.env.JWT_SECRET || 'super_secret_aarambh_2026_jwt_token_key_987654321');
        if (decoded && decoded.role === 'super_admin') {
          isSuperAdmin = true;
        }
      } catch (e) {
        // Ignore verify errors
      }
    }

    const showStudents = isPub || isSuperAdmin;

    const users = await User.find({ role: { $in: ['cluster_head', 'cohort_leader'] } }).select('name role cluster cohort');
    const students = showStudents 
      ? await Student.find({}).select('name applicationNo course gender region cohort cluster')
      : [];

    // Group by cluster
    const clusterData = {};
    const allClusters = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L'];
    
    allClusters.forEach(c => {
      clusterData[c] = {
        clusterName: c,
        head: null,
        cohorts: {}
      };
    });

    users.forEach(user => {
      const c = user.cluster;
      if (!c || !clusterData[c]) return;

      if (user.role === 'cluster_head') {
        clusterData[c].head = user.name;
      } else if (user.role === 'cohort_leader') {
        if (!clusterData[c].cohorts[user.cohort]) {
          clusterData[c].cohorts[user.cohort] = {
            cohortName: user.cohort,
            leaderName: user.name,
            students: []
          };
        } else {
          clusterData[c].cohorts[user.cohort].leaderName = user.name;
        }
      }
    });

    // Populate students into cohorts
    students.forEach(student => {
      const c = student.cluster;
      const ch = student.cohort;
      if (!c || !ch || !clusterData[c]) return;

      if (!clusterData[c].cohorts[ch]) {
        clusterData[c].cohorts[ch] = {
          cohortName: ch,
          leaderName: 'To be assigned',
          students: []
        };
      }

      clusterData[c].cohorts[ch].students.push(student);
    });

    // Format structure
    const formatted = Object.values(clusterData).map(cluster => {
      const cohortsList = Object.values(cluster.cohorts).sort((a, b) => a.cohortName.localeCompare(b.cohortName));
      return {
        clusterName: cluster.clusterName,
        head: cluster.head,
        cohorts: cohortsList
      };
    });

    res.json({
      notPublished: !showStudents,
      allocations: formatted
    });
  } catch (error) {
    console.error('Error fetching allocations:', error);
    res.status(500).json({ error: 'Failed to retrieve cohort allocations.' });
  }
});

app.get('/api/status/cohort-registrations', async (req, res) => {
  try {
    const User = require('../models/User');
    const Student = require('../models/Student');
    const Settings = require('../models/Settings');

    // Check if published
    const setting = await Settings.findOne({ key: 'studentsPublished' });
    const isPub = setting ? !!setting.value : false;

    // Check if user is super_admin
    let isSuperAdmin = false;
    const token = req.cookies ? req.cookies.token : null;
    if (token) {
      try {
        const jwt = require('jsonwebtoken');
        const decoded = jwt.verify(token, process.env.JWT_SECRET || 'super_secret_aarambh_2026_jwt_token_key_987654321');
        if (decoded && decoded.role === 'super_admin') {
          isSuperAdmin = true;
        }
      } catch (e) {
        // Ignore verify errors
      }
    }

    const showStudents = isPub || isSuperAdmin;

    const users = await User.find({ role: { $in: ['cluster_head', 'cohort_leader'] } }).select('name role cluster cohort');


    const students = showStudents 
      ? await Student.find({}).select('name applicationNo course cohort cluster confirmedJklu confirmedAarambh documentsVerified notContinuing').lean()
      : [];

    // Group by cluster
    const clusterData = {};
    const allClusters = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L'];
    
    allClusters.forEach(c => {
      clusterData[c] = {
        clusterName: c,
        head: null,
        cohorts: {}
      };
    });

    users.forEach(user => {
      const c = user.cluster;
      if (!c || !clusterData[c]) return;

      if (user.role === 'cluster_head') {
        clusterData[c].head = user.name;
      } else if (user.role === 'cohort_leader') {
        if (!clusterData[c].cohorts[user.cohort]) {
          clusterData[c].cohorts[user.cohort] = {
            cohortName: user.cohort,
            leaderName: user.name,
            students: []
          };
        } else {
          clusterData[c].cohorts[user.cohort].leaderName = user.name;
        }
      }
    });

    students.forEach(student => {
      const c = student.cluster;
      const ch = student.cohort;
      if (!c || !ch || !clusterData[c]) return;

      if (!clusterData[c].cohorts[ch]) {
        clusterData[c].cohorts[ch] = {
          cohortName: ch,
          leaderName: 'To be assigned',
          students: []
        };
      }



      clusterData[c].cohorts[ch].students.push(student);
    });

    const formatted = Object.values(clusterData).map(cluster => {
      const cohortsList = Object.values(cluster.cohorts).sort((a, b) => a.cohortName.localeCompare(b.cohortName));
      return {
        clusterName: cluster.clusterName,
        head: cluster.head,
        cohorts: cohortsList
      };
    });

    res.json({
      notPublished: !showStudents,
      allocations: formatted
    });
  } catch (error) {
    console.error('Error fetching registrations status:', error);
    res.status(500).json({ error: 'Failed to retrieve cohort registration status.' });
  }
});

// Mount Routes
const authRoutes = require('../routes/auth');
const distributionRoutes = require('../routes/distribution');
const emailRoutes = require('../routes/email');
const clusterRoutes = require('../routes/cluster');
const adminRoutes = require('../routes/admin');
const cohortRoutes = require('../routes/cohort');
const webhookRoutes = require('../routes/webhooks');

app.use('/api/auth', authRoutes);
app.use('/api/distribution', distributionRoutes);
app.use('/api/email', emailRoutes);
app.use('/api/cluster', clusterRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/cohort', cohortRoutes);
app.use('/api/webhooks', webhookRoutes);

// Error Handling Middleware
app.use((err, req, res, next) => {
  console.error('API Error:', err.message);
  res.status(err.status || 500).json({
    error: err.message || 'Internal Server Error'
  });
});

// Run server locally
if (require.main === module || (process.env.NODE_ENV !== 'production' && !process.env.VERCEL)) {
  app.listen(PORT, () => {
    console.log(`Backend Server listening on port ${PORT}`);
  });
}

module.exports = app;
