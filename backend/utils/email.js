const nodemailer = require("nodemailer");

// Email sender configuration
const transporter = nodemailer.createTransport({
  service: "Gmail", // Or use other email providers like Outlook, Yahoo
  auth: {
    user: process.env.EMAIL_USER, // Your email address
    pass: process.env.EMAIL_PASS, // Your email password or app-specific password
  },
});

// Function to send emails
const sendEmail = async (to, subject, text) => {
  try {
    await transporter.sendMail({
      from: '"Plant Care Assistant" <no-reply@plantcare.com>',
      to, // Recipient's email
      subject, // Email subject
      text, // Email body
    });
    console.log(`Email sent to ${to}`);
  } catch (error) {
    console.error(`Failed to send email to ${to}:`, error.message);
  }
};

module.exports = sendEmail;