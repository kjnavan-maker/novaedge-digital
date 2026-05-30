const sendEmail = async ({ to, subject, html }) => {
  try {
    if (!process.env.BREVO_API_KEY) {
      console.error("BREVO_API_KEY is missing");
      return false;
    }

    const response = await fetch("https://api.brevo.com/v3/smtp/email", {
      method: "POST",
      headers: {
        accept: "application/json",
        "api-key": process.env.BREVO_API_KEY,
        "content-type": "application/json",
      },
      body: JSON.stringify({
        sender: {
          name: "NovaEdge Digital",
          email: "hello.novaedgedigital@gmail.com",
        },
        to: [{ email: to }],
        subject,
        htmlContent: html,
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      console.error("Brevo Email Error:", data);
      return false;
    }

    console.log("Email sent successfully:", data);
    return true;
  } catch (error) {
    console.error("Email Error:", error.message);
    return false;
  }
};

module.exports = sendEmail;