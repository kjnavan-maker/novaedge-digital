const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.MAIL_USER,
    pass: process.env.MAIL_PASS,
  },
});

const sendEmail = async ({
  to,
  subject,
  html,
}) => {
  try {
    await transporter.sendMail({
      from: `"NovaEdge Digital" <${process.env.MAIL_USER}>`,
      to,
      subject,
      html,
    });

    console.log(`Email sent to ${to}`);
  } catch (error) {
    console.error("Email Error:", error);
  }
};

module.exports = sendEmail;