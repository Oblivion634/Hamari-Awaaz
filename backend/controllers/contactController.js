import ContactModel from "../models/contactModel.js";

export const createContactMessage = async (req, res) => {
  try {
    const { name, email, subject, message } = req.body;

    const contact = await ContactModel.create({
      name,
      email,
      subject,
      message,
    });

    return res.status(201).json({
      success: true,
      message: "Message sent successfully",
      data: contact,
    });
  } catch (error) {
    console.log("Contact error:", error.message);

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};