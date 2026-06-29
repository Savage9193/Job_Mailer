module.exports = {
  subject: (companyName) => `Software Engineer | ${companyName || 'Company'} | Node.js, React.js, AWS, GenAI`,
  html: ({ recruiterName, companyName, name, resumeLink, linkedin, github, phoneNumber }) => `
    <div style="font-family: Arial, sans-serif; font-size: 14px; line-height: 1.6; color: #222; padding: 8px 0;">
      <p>Hi ${recruiterName|| ''},</p>
      <p>I hope you are doing well.</p>
      <p>My name is ${name}, currently working as a Software Engineer at ${companyName}, where I build scalable, production-ready systems for customer-facing applications.</p>
      <p>I am exploring Software Engineer / SDE opportunities where I can contribute to building reliable and high-impact products.</p>
      <p>Please find my resume attached. I would appreciate your consideration for relevant opportunities.</p>
      <p>Looking forward to connecting.</p>
      <p>Best Regards,</p>
      <p>${name}<br>
      Software Engineer | ${companyName}<br>
      Phone: ${phoneNumber}<br>
      LinkedIn: <a href="${linkedin}">${linkedin}</a><br>
      GitHub: <a href="${github}">${github}</a></p>
    </div>
  `
};
