const form = document.getElementById('outreach-form');
const previewBtn = document.getElementById('preview-btn');
const isLocalhost = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1';
const API_URL = isLocalhost ? 'http://localhost:5000/api/send-email' : '/api/send-email';
const previewContent = document.getElementById('preview-content');
const toast = document.getElementById('toast');
const spinner = document.getElementById('spinner');
const submitBtn = document.getElementById('submit-btn');

const roleTemplates = {
  'Full Stack Developer': {
    subject: (company) => `Full Stack Engineer | ${company || 'Company'} | React.js, Node.js, FastAPI, AWS, GenAI`,
    body: (recruiter, company) => `Hello ${recruiter},\n\nI hope you are doing well. I am reaching out regarding ${company} and the opportunity to contribute as a Full Stack Engineer.\n\nBest regards,\nYour Name`
  },
  'Frontend Engineer': {
    subject: (company) => `Frontend Engineer | ${company || 'Company'} | React.js, Next.js, TypeScript, AI-assisted Development`,
    body: (recruiter, company) => `Hello ${recruiter},\n\nI am reaching out regarding ${company} and the opportunity to contribute as a Frontend Engineer.\n\nBest regards,\nYour Name`
  },
  'Backend Engineer': {
    subject: (company) => `Backend Engineer | ${company || 'Company'} | Node.js, NestJS, FastAPI, AWS, Microservices`,
    body: (recruiter, company) => `Hello ${recruiter},\n\nI am reaching out regarding ${company} and the opportunity to contribute as a Backend Engineer.\n\nBest regards,\nYour Name`
  },
  'Software Engineer': {
    subject: (company) => `Software Engineer | ${company || 'Company'} | Node.js, React.js, AWS, GenAI`,
    body: (recruiter, company) => `Hello ${recruiter},\n\nI am reaching out regarding ${company} and the opportunity to contribute as a Software Engineer.\n\nBest regards,\nYour Name`
  }
};

function showToast(message, type = 'success') {
  toast.textContent = message;
  toast.className = `toast show ${type}`;
  clearTimeout(showToast.timeoutId);
  showToast.timeoutId = setTimeout(() => {
    toast.className = 'toast';
  }, 3000);
}

function setLoading(isLoading) {
  spinner.classList.toggle('hidden', !isLoading);
  submitBtn.disabled = isLoading;
  previewBtn.disabled = isLoading;
}

function validateForm() {
  const formData = new FormData(form);
  const email = formData.get('email')?.trim() || '';
  const recruiterName = formData.get('recruiterName')?.trim() || '';
  const companyName = formData.get('companyName')?.trim() || '';
  const role = formData.get('role')?.trim() || '';

  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return 'Please enter a valid recruiter email.';
  }

  if (recruiterName && recruiterName.length < 2) {
    return 'Recruiter name must be at least 2 characters if provided.';
  }

  if (companyName && companyName.length < 2) {
    return 'Company name must be at least 2 characters if provided.';
  }

  if (!role) {
    return 'Please select a role.';
  }

  return '';
}

function generatePreview() {
  const data = Object.fromEntries(new FormData(form));
  const role = data.role;
  const template = roleTemplates[role];

  if (!template) {
    previewContent.innerHTML = '<p>Select your details to preview a tailored email.</p>';
    return;
  }

  const subject = template.subject(data.companyName || 'your target company');
  const body = template.body(data.recruiterName || 'Recruiter', data.companyName || 'your target company');

  previewContent.innerHTML = `
    <p><strong>Subject:</strong> ${subject}</p>
    <pre>${body}</pre>
  `;
}

previewBtn.addEventListener('click', () => {
  const error = validateForm();
  if (error) {
    showToast(error, 'error');
    return;
  }
  generatePreview();
  showToast('Email preview generated.', 'success');
});

form.addEventListener('submit', async (event) => {
  event.preventDefault();

  const error = validateForm();
  if (error) {
    showToast(error, 'error');
    return;
  }

  setLoading(true);

  try {
    const formData = new FormData(form);
    const response = await fetch(API_URL, {
      method: 'POST',
      body: formData
    });

    const result = await response.json();

    if (!response.ok) {
      throw new Error(result.errors?.[0] || result.message || 'Unable to send email.');
    }

    showToast('Email sent successfully.', 'success');
    form.reset();
    generatePreview();
  } catch (err) {
    showToast(err.message || 'Unable to send email.', 'error');
  } finally {
    setLoading(false);
  }
});

['input', 'change'].forEach((eventType) => {
  form.addEventListener(eventType, generatePreview);
});

generatePreview();
