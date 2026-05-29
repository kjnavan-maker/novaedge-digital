const nodemailer = require("nodemailer");

const sendEmail = async ({ to, subject, html }) => {
  try {
    console.log("MAIL_HOST =", process.env.MAIL_HOST);
    console.log("MAIL_PORT =", process.env.MAIL_PORT);
    console.log("MAIL_USER =", process.env.MAIL_USER);

    const transporter = nodemailer.createTransport({
      host: process.env.MAIL_HOST,
      port: Number(process.env.MAIL_PORT) || 587,
      secure: false,
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
    console.error("Email Error:", error);
    return false;
  }
};

module.exports = sendEmail;