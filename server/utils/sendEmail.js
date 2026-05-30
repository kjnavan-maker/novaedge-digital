const SibApiV3Sdk = require("@getbrevo/brevo");

const sendEmail = async ({ to, subject, html }) => {
  try {
    const apiInstance = new SibApiV3Sdk.TransactionalEmailsApi();

    apiInstance.setApiKey(
      SibApiV3Sdk.TransactionalEmailsApiApiKeys.apiKey,
      process.env.BREVO_API_KEY
    );

    const sendSmtpEmail = {
      sender: {
        name: "NovaEdge Digital",
        email: "hello.novaedgedigital@gmail.com",
      },
      to: [
        {
          email: to,
        },
      ],
      subject: subject,
      htmlContent: html,
    };

    await apiInstance.sendTransacEmail(sendSmtpEmail);

    console.log("Email sent successfully");
    return true;
  } catch (error) {
    console.error("Brevo Email Error:", error);
    return false;
  }
};

module.exports = sendEmail;