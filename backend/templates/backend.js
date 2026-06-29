module.exports = {
  subject: (companyName) => `Backend Engineer | ${companyName || 'Company'} | Node.js, NestJS, FastAPI, AWS, Microservices`,
  html: ({ recruiterName, companyName, name, resumeLink, linkedin, github, phoneNumber }) => `
    <div style="font-family: Arial, sans-serif; font-size: 14px; color: #222;">
      <p>Hi ${recruiterName|| ''},</p>
      <p>I hope you are doing well.</p>
      <p>My name is ${name}, currently working as a Software Engineer at ${companyName}, where I develop scalable backend services, APIs, and cloud-based solutions powering customer-facing payment systems.</p>
      <p>I am actively exploring Backend Engineer / Software Engineer opportunities.</p>
      <p>My backend expertise includes:</p>
      <p>• Node.js, NestJS, FastAPI, Django<br>
      • REST APIs, Microservices Architecture, BFF Services<br>
      • PostgreSQL, MySQL, MongoDB<br>
      • AWS Lambda, DynamoDB, CloudWatch<br>
      • Authentication, Authorization, API Security<br>
      • Docker, Cloud Deployment<br>
      • AI & GenAI: LLM Workflows, Prompt Engineering, MCP, RAG Applications</p>
      <p>Key contributions:</p>
      <p>• Developed scalable Backend-for-Frontend services using NestJS, reducing application response time by 2–4 seconds.<br>
      • Built REST APIs supporting high-volume customer workflows and production applications.<br>
      • Designed AWS Lambda-based authentication and OTP verification services with secure cloud integrations.<br>
      • Integrated PayPal and Braintree payment gateways while maintaining 99.9% transaction reliability.<br>
      • Designed database-driven systems using SQL and NoSQL technologies with focus on performance and scalability.<br>
      • Applied AI-assisted engineering practices and LLM-powered workflows to improve development productivity.</p>
      <p>I have strong experience designing backend systems, optimizing APIs, integrating third-party services, and building reliable cloud-native applications.</p>
      <p>Please find my resume attached. I would appreciate your consideration for suitable Backend Engineering opportunities.</p>
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
