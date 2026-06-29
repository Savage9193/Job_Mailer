const path = require('path');
const dotenv = require('dotenv');
const express = require('express');

[
  path.join(__dirname, '.env'),
  path.join(__dirname, 'config', '.env')
].forEach((envPath) => {
  dotenv.config({ path: envPath });
});
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const rateLimit = require('express-rate-limit');
const emailRoutes = require('./routes/emailRoutes');

const app = express();
const PORT = process.env.PORT || 5000;

// Allow the frontend to call the API while keeping the origin list configurable.
const corsOrigins = process.env.ALLOWED_ORIGIN
  ? process.env.ALLOWED_ORIGIN.split(',').map((origin) => origin.trim())
  : true;

app.use(helmet());
app.use(morgan('combined'));
app.use(cors({ origin: corsOrigins }));
app.use(express.json({ limit: '1mb' }));

const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 10,
  standardHeaders: true,
  legacyHeaders: false,
  message: {
    success: false,
    message: 'Too many requests. Please try again shortly.'
  }
});

app.use('/api', apiLimiter);
app.use(express.static(path.join(__dirname, '..', 'frontend')));

app.get('/health', (_req, res) => {
  res.status(200).json({ success: true, message: 'Server is healthy.' });
});

app.use('/api', emailRoutes);

app.get('*', (_req, res) => {
  res.sendFile(path.join(__dirname, '..', 'frontend', 'index.html'));
});

app.use((err, _req, res, _next) => {
  console.error(err.stack);
  res.status(500).json({
    success: false,
    message: 'Unexpected server error. Please try again later.'
  });
});

const server = app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

module.exports = app;
module.exports.server = server;
