const nodemailer = require("nodemailer");

const sendEmail = async ({ to, subject, html }) => {
  try {
    console.log("Sending email...");
    console.log("MAIL_USER:", process.env.MAIL_USER);
    console.log("TO:", to);

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASS,
      },
    });

    const info = await transporter.sendMail({
      from: `"NovaEdge Digital" <${process.env.MAIL_USER}>`,
      to,
      subject,
      html,
    });

    console.log("Email sent:", info.messageId);
    return true;
  } catch (error) {
    console.error("Email Error Message:", error.message);
    console.error("Email Error Code:", error.code);
    return false;
  }
};

module.exports = sendEmail;