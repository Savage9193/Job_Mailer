const fs = require('fs');
const path = require('path');

function getTemplateForRole(role) {
  const templatesDir = path.join(__dirname);
  const templateFiles = {
    'Full Stack Developer': 'fullStack.js',
    'Frontend Engineer': 'frontend.js',
    'Backend Engineer': 'backend.js',
    'Software Engineer': 'software.js'
  };

  const fileName = templateFiles[role];
  if (!fileName) {
    return null;
  }

  const templatePath = path.join(templatesDir, fileName);
  if (!fs.existsSync(templatePath)) {
    throw new Error(`Template file not found: ${fileName}`);
  }

  return require(templatePath);
}

module.exports = {
  getTemplateForRole
};
