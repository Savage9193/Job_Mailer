const nodemailer = require('nodemailer');
const { getTemplateForRole } = require('../templates');
const personalInfo = require('../config/personalInfo');

const smtpTransporter = nodemailer.createTransport({
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

function createMailHtml({ recruiterName, companyName, role }) {
  const template = getTemplateForRole(role);

  if (!template) {
    throw new Error(`No template available for role: ${role}`);
  }

  return template.html({
    recruiterName,
    companyName,
    name: personalInfo.name,
    resumeLink: personalInfo.resumeLink,
    linkedin: personalInfo.linkedin,
    github: personalInfo.github,
    phoneNumber: personalInfo.phoneNumber
  });
}

function buildAttachments(resumeFile) {
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

  return attachments;
}

async function sendWithResend({ email, subject, html, attachments }) {
  const apiKey = process.env.RESEND_API_KEY;

  if (!apiKey) {
    throw new Error('RESEND_API_KEY is not configured.');
  }

  const payload = {
    from: `${process.env.RESEND_FROM_NAME || process.env.FROM_NAME || personalInfo.name} <${process.env.RESEND_FROM || process.env.FROM_EMAIL || process.env.SMTP_USER}>`,
    to: [email],
    subject,
    html
  };

  if (attachments.length > 0) {
    payload.attachments = attachments.map((attachment) => ({
      filename: attachment.filename,
      content: Buffer.isBuffer(attachment.content)
        ? attachment.content.toString('base64')
        : attachment.content
    }));
  }

  const response = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${apiKey}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(payload)
  });

  const result = await response.json().catch(() => ({}));

  if (!response.ok) {
    throw new Error(result.message || `Resend request failed with status ${response.status}`);
  }

  return {
    messageId: result.id,
    accepted: [email],
    rejected: []
  };
}

async function sendWithSmtp({ email, subject, html, attachments }) {
  const mailOptions = {
    from: `${process.env.FROM_NAME || personalInfo.name} <${process.env.SMTP_USER}>`,
    to: email,
    subject,
    html,
    attachments
  };

  try {
    const info = await smtpTransporter.sendMail(mailOptions);

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

async function sendOutreachEmail({ email, recruiterName, companyName, role, resumeFile }) {
  const template = getTemplateForRole(role);

  if (!template) {
    throw new Error(`No template available for role: ${role}`);
  }

  const attachments = buildAttachments(resumeFile);
  const html = createMailHtml({ recruiterName, companyName, role });
  const subject = template.subject(companyName);

  try {
    if (process.env.RESEND_API_KEY) {
      return await sendWithResend({ email, subject, html, attachments });
    }

    return await sendWithSmtp({ email, subject, html, attachments });
  } catch (error) {
    const detail = error.message || 'Unknown email error';
    throw new Error(`Email sending failed: ${detail}`);
  }
}

module.exports = {
  sendOutreachEmail
};
