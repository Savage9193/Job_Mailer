const nodemailer = require('nodemailer');
const { getTemplateForRole } = require('../templates');
const personalInfo = require('../config/personalInfo');

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: Number(process.env.SMTP_PORT || 587),
  secure: process.env.SMTP_SECURE === 'true',
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS
  },
  requireTLS: true,
  connectionTimeout: 15000,
  greetingTimeout: 15000,
  socketTimeout: 20000
});

async function sendOutreachEmail({ email, recruiterName, companyName, role, resumeFile }) {
  // Resolve the role-based email template before constructing the message.
  const template = getTemplateForRole(role);

  if (!template) {
    throw new Error(`No template available for role: ${role}`);
  }

  const attachments = [];

  if (resumeFile) {
    attachments.push({
      filename: resumeFile.originalname || 'resume.pdf',
      content: resumeFile.buffer,
      contentType: resumeFile.mimetype || 'application/pdf'
    });
  } else if (personalInfo.hasResumeAttachment) {
    attachments.push({
      filename: 'resume.pdf',
      path: personalInfo.resumePath,
      contentType: 'application/pdf'
    });
  }

  const mailOptions = {
    from: `${process.env.FROM_NAME || personalInfo.name} <${process.env.SMTP_USER}>`,
    to: email,
    subject: template.subject(companyName),
    html: template.html({
      recruiterName,
      companyName,
      name: personalInfo.name,
      resumeLink: personalInfo.resumeLink,
      linkedin: personalInfo.linkedin,
      github: personalInfo.github,
      phoneNumber: personalInfo.phoneNumber
    }),
    attachments
  };

  try {
    const info = await transporter.sendMail(mailOptions);

    return {
      messageId: info.messageId,
      accepted: info.accepted,
      rejected: info.rejected
    };
  } catch (error) {
    const detail = error.response || error.message || 'Unknown SMTP error';
    throw new Error(`Email sending failed: ${detail}`);
  }
}

module.exports = {
  sendOutreachEmail
};
