const brevo = require("@getbrevo/brevo");

const sendEmail = async ({ to, subject, html }) => {
  try {
    const apiInstance = new brevo.TransactionalEmailsApi();

    apiInstance.setApiKey(
      brevo.TransactionalEmailsApiApiKeys.apiKey,
      process.env.BREVO_API_KEY
    );

    await apiInstance.sendTransacEmail({
      sender: {
        name: "NovaEdge Digital",
        email: "hello.novaedgedigital@gmail.com",
      },
      to: [{ email: to }],
      subject,
      htmlContent: html,
    });

    console.log("Email sent successfully");
    return true;
  } catch (error) {
    console.error("Brevo Email Error:", error);
    return false;
  }
};

module.exports = sendEmail;