import model from "../utils/gemini.js";

export const chatBotReply = async (req, res) => {
  try {
    const { message } = req.body;

    const msg = message.toLowerCase();

    let reply = null;

    // ================= FAQ RESPONSES =================

    if (msg.includes("hello") || msg.includes("hi")) {
      reply = "👋 Hello! I am Awaaz Mitra. How can I help you today?";
    } else if (msg.includes("report")) {
      reply =
        "📝 To report an issue, go to the Report Issue page and fill in all required details.";
    } else if (msg.includes("track")) {
      reply = "🔍 You can track your complaint using your Complaint ID.";
    } else if (msg.includes("category")) {
      reply =
        "📂 Categories include Road, Water Supply, Electricity, and Sanitation.";
    } else if (msg.includes("time")) {
      reply = "⏳ Most complaints are reviewed within 24 hours.";
    } else if (msg.includes("contact")) {
      reply = "📞 You can contact support through the Contact page.";
    } else if (msg.includes("thank")) {
      reply = "😊 You're welcome! Happy to help.";
    }

    // ================= GEMINI FALLBACK =================

    if (!reply) {
      const result = await model.generateContent(`
  
  You are Awaaz Mitra, an AI assistant for Hamari Awaaz civic complaint platform.

  Help users regarding:
  - complaint reporting
  - issue tracking
  - categories
  - support
  - civic guidance

  Keep replies:
  - short
  - friendly
  - easy to understand

  User message:
  ${message}

  `);

      reply = result.response.text();
    }

    res.status(200).json({
      success: true,
      reply,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
