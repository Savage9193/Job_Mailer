module.exports = {
  subject: (companyName) => `Full Stack Engineer | ${companyName || 'Company'} | React.js, Node.js, FastAPI, AWS, GenAI`,
  html: ({ recruiterName, companyName, name, resumeLink, linkedin, github, phoneNumber }) => `
    <div style="font-family: Arial, sans-serif; font-size: 14px; line-height: 1.6; color: #222; padding: 8px 0;">
      <p>Hi ${recruiterName|| ''},</p>
      <p>I hope you are doing well.</p>
      <p>My name is ${name}, currently working as a Software Engineer at ${companyName}, where I design and develop scalable customer-facing applications, payment platforms, and backend services used in high-traffic production environments.</p>
      <p>I am actively exploring Full Stack Engineer / Software Engineer / SDE opportunities where I can contribute to building scalable, reliable, and high-performance products.</p>
      <p>My technical expertise includes:</p>
      <p>• Frontend: React.js, Next.js, Angular, TypeScript, JavaScript, Redux, Zustand, Tailwind CSS, Storybook<br>
      • Backend: Node.js, NestJS, FastAPI, Django, REST APIs, Microservices, BFF Architecture<br>
      • Databases: PostgreSQL, MySQL, MongoDB<br>
      • Cloud & DevOps: AWS Lambda, DynamoDB, CloudWatch, Docker, CI/CD, Vercel<br>
      • AI & GenAI: LLM Workflows, Prompt Engineering, MCP Integrations, AI-assisted Development, RAG-based Applications</p>
      <p>Key contributions:</p>
      <p>• Improved customer conversion by 20% by optimizing Paytm checkout journeys, API integrations, and user experience flows.<br>
      • Designed Backend-for-Frontend (BFF) services using NestJS, reducing page response time by 2–4 seconds.<br>
      • Integrated payment solutions including PayPal and Braintree while maintaining 99.9% transaction availability.<br>
      • Built AWS Lambda and DynamoDB based authentication workflows supporting secure OTP verification under 2 seconds.<br>
      • Developed scalable CMS-driven UI systems using Directus CMS, reducing deployment effort by 40%.<br>
      • Leveraged AI-assisted engineering workflows and LLM-based tools to accelerate development and debugging efficiency.</p>
      <p>I have experience delivering complete end-to-end solutions, from frontend architecture and backend services to cloud deployment and production optimization.</p>
      <p>Please find my resume attached. I would appreciate your consideration for any suitable Full Stack Engineering opportunities.</p>
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
