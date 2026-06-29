module.exports = {
  subject: (companyName) => `Frontend Engineer | ${companyName || 'Company'} | React.js, Next.js, TypeScript, AI-assisted Development`,
  html: ({ recruiterName, companyName, name, resumeLink, linkedin, github, phoneNumber }) => `
    <div style="font-family: Arial, sans-serif; font-size: 14px; line-height: 1.6; color: #222; padding: 8px 0;">
      <p>Hi ${recruiterName|| ''},</p>
      <p>I hope you are doing well.</p>
      <p>My name is ${name}, currently working as a Software Engineer at ${companyName}, where I build scalable, high-performance frontend applications for eCommerce and FinTech products.</p>
      <p>I am exploring Frontend Engineer / React Engineer opportunities where I can contribute to building modern user experiences and scalable frontend architectures.</p>
      <p>My frontend expertise includes:</p>
      <p>• React.js, Next.js, Angular, TypeScript, JavaScript<br>
      • Redux, Zustand, React Hooks<br>
      • HTML5, CSS3, Tailwind CSS, Bootstrap<br>
      • Storybook Design Systems<br>
      • Performance Optimization, Component Architecture<br>
      • REST API Integration<br>
      • Jest, Unit Testing, Frontend Testing</p>
      <p>Key achievements:</p>
      <p>• Improved customer conversion by 20% by optimizing checkout journeys and frontend user experiences.<br>
      • Built reusable React component libraries and Storybook-based design systems, improving UI consistency and development efficiency.<br>
      • Developed scalable Next.js and React applications following component-driven architecture.<br>
      • Reduced deployment effort by 40% through CMS-driven UI solutions using Directus CMS.<br>
      • Optimized frontend performance for data-heavy applications, improving rendering speed and user experience.<br>
      • Used AI-assisted development workflows, LLM tools, and MCP integrations to accelerate feature delivery and debugging.</p>
      <p>I specialize in creating responsive, scalable, and maintainable frontend systems with strong focus on performance, accessibility, and user experience.</p>
      <p>Please find my resume attached. I would appreciate the opportunity to discuss relevant Frontend Engineer positions.</p>
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
