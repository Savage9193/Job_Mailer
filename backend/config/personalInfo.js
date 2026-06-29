const fs = require('fs');
const path = require('path');
const dotenv = require('dotenv');

[
  path.join(__dirname, '..', '.env'),
  path.join(__dirname, '.env')
].forEach((envPath) => {
  dotenv.config({ path: envPath });
});

const resumePath = process.env.RESUME_PATH
  ? path.resolve(process.env.RESUME_PATH)
  : path.join(__dirname, '..', 'assets', 'resume.pdf');

module.exports = {
  name: process.env.YOUR_NAME || 'Your Name',
  resumeLink: process.env.RESUME_LINK || 'https://drive.google.com/file/d/1EXAMPLE/view?usp=sharing',
  linkedin: process.env.LINKEDIN_URL || 'https://www.linkedin.com/in/your-profile',
  github: process.env.GITHUB_URL || 'https://github.com/your-username',
  phoneNumber: process.env.PHONE_NUMBER || '+1-555-0123',
  resumePath,
  hasResumeAttachment: fs.existsSync(resumePath)
};
