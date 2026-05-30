const brevo = require("@getbrevo/brevo");

const sendEmail = async ({ to, subject, html }) => {
  try {
    if (!process.env.BREVO_API_KEY) {
      console.error("BREVO_API_KEY is missing");
      return false;
    }

    const apiInstance = new brevo.TransactionalEmailsApi();

    apiInstance.setApiKey(
      brevo.TransactionalEmailsApiApiKeys.apiKey,
      process.env.BREVO_API_KEY
    );

    const result = await apiInstance.sendTransacEmail({
      sender: {
        email: "hello.novaedgedigital@gmail.com",
        name: "NovaEdge Digital",
      },
      to: [{ email: to }],
      subject: subject,
      htmlContent: html,
    });

    console.log("Email sent successfully:", result?.body?.messageId);
    return true;
  } catch (error) {
    console.error("Brevo Email Error:", error?.response?.body || error.message);
    return false;
  }
};

module.exports = sendEmail;