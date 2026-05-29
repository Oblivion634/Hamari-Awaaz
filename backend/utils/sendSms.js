import twilio from "twilio";

const client = twilio(
  process.env.TWILIO_ACCOUNT_SID,
  process.env.TWILIO_AUTH_TOKEN,
);

export const sendSms = async (phone, message) => {
  try {
    const response = await client.messages.create({
      body: message,

      from: process.env.TWILIO_PHONE_NUMBER,

      to: `+91${phone}`,
    });

    console.log("SMS sent:", response.sid);

    return response;
  } catch (error) {
    console.log("SMS Error:", error.message);

    throw error;
  }
};
