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
const mongoUri = process.env.MONGODB_URI || 'mongodb+srv://solomaze67032_db_user:kqj5KnpTInWmEaWB@aarambh26.xijspgv.mongodb.net/?appName=aarambh26';

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
app.get('/api/status', (req, res) => {
  res.json({
    status: 'online',
    message: 'Aarambh 2026 API Server is running.',
    mongodb: isConnected ? 'connected' : 'disconnected',
    timestamp: new Date()
  });
});

// Mount Routes
const authRoutes = require('../routes/auth');
const distributionRoutes = require('../routes/distribution');
const emailRoutes = require('../routes/email');
const clusterRoutes = require('../routes/cluster');
const adminRoutes = require('../routes/admin');

app.use('/api/auth', authRoutes);
app.use('/api/distribution', distributionRoutes);
app.use('/api/email', emailRoutes);
app.use('/api/cluster', clusterRoutes);
app.use('/api/admin', adminRoutes);

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
