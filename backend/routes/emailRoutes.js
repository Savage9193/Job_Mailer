const express = require('express');
const multer = require('multer');
const { sendOutreachEmail } = require('../services/emailService');

const router = express.Router();
const allowedRoles = ['Full Stack Developer', 'Frontend Engineer', 'Backend Engineer', 'Software Engineer'];

const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 5 * 1024 * 1024 },
  fileFilter: (_req, file, cb) => {
    if (file.mimetype === 'application/pdf') {
      cb(null, true);
      return;
    }
    cb(new Error('Only PDF files are supported for resume upload.'));
  }
});

router.post('/send-email', upload.single('resume'), async (req, res, next) => {
  try {
    const { email, recruiterName, companyName, role } = req.body;
    const resumeFile = req.file;

    const errors = [];

    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      errors.push('A valid recruiter email is required.');
    }

    if (recruiterName && recruiterName.trim().length < 2) {
      errors.push('Recruiter name must be at least 2 characters long if provided.');
    }

    if (companyName && companyName.trim().length < 2) {
      errors.push('Company name must be at least 2 characters long if provided.');
    }

    if (!role || !allowedRoles.includes(role)) {
      errors.push('Please select a valid role.');
    }

    if (errors.length > 0) {
      return res.status(400).json({ success: false, message: 'Validation failed.', errors });
    }

    const result = await sendOutreachEmail({
      email: email.trim(),
      recruiterName: recruiterName ? recruiterName.trim() : '',
      companyName: companyName ? companyName.trim() : '',
      role,
      resumeFile
    });

    return res.status(200).json({
      success: true,
      message: 'Email sent successfully.',
      data: result
    });
  } catch (error) {
    console.error('Email send failed:', error);
    const showDetails = process.env.SHOW_ERROR_DETAILS === 'true';

    return res.status(500).json({
      success: false,
      message: showDetails
        ? error.message || 'Unexpected server error. Please try again later.'
        : 'Unexpected server error. Please try again later.'
    });
  }
});

module.exports = router;
