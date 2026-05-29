import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Send, X, Bot } from "lucide-react";

import api from "../api/axios";

export default function ChatBot() {

    const [open, setOpen] = useState(false);

    const [message, setMessage] = useState("");

    const [messages, setMessages] = useState([
        {
            sender: "bot",
            text: "👋 Hello! I am Awaaz Mitra. How can I help you?",
        },
    ]);

    // ================= SEND MESSAGE =================
    const sendMessage = async () => {

        if (!message.trim()) return;

        // user message
        const userMessage = {
            sender: "user",
            text: message,
        };

        setMessages((prev) => [...prev, userMessage]);

        try {

            const res = await api.post("/chat", {
                message,
            });

            const botMessage = {
                sender: "bot",
                text: res.data.reply,
            };

            setMessages((prev) => [
                ...prev,
                botMessage,
            ]);

        } catch (error) {

            setMessages((prev) => [
                ...prev,
                {
                    sender: "bot",
                    text: "⚠️ Something went wrong.",
                },
            ]);

        }

        setMessage("");
    };

    return (
        <>
            {/* FLOATING BUTTON */}
            <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => setOpen(!open)}
                className="fixed bottom-6 right-6 z-50 bg-[#FF9933] w-16 h-16 rounded-full shadow-2xl flex items-center justify-center"
            >
                {open ? (
                    <X className="text-white w-8 h-8" />
                ) : (
                    <img
                        src="/help-bot.png"
                        alt="bot"
                        className="w-12 h-12 object-contain"
                    />
                )}
            </motion.button>

            {/* CHAT WINDOW */}
            <AnimatePresence>

                {open && (

                    <motion.div
                        initial={{
                            opacity: 0,
                            y: 50,
                            scale: 0.9,
                        }}
                        animate={{
                            opacity: 1,
                            y: 0,
                            scale: 1,
                        }}
                        exit={{
                            opacity: 0,
                            y: 50,
                            scale: 0.9,
                        }}
                        className="fixed bottom-24 right-6 w-[350px] h-[500px] bg-white rounded-3xl shadow-2xl overflow-hidden z-50 border border-gray-200"
                    >

                        {/* HEADER */}
                        <div className="bg-gradient-to-r from-[#FF9933] to-[#138808] p-4 text-white flex items-center gap-3">

                            <img
                                src="/help-bot.png"
                                alt="mascot"
                                className="w-12 h-12"
                            />

                            <div>
                                <h2 className="font-bold text-lg">
                                    Awaaz Mitra
                                </h2>

                                <p className="text-sm opacity-90">
                                    Civic Assistant
                                </p>
                            </div>
                        </div>

                        {/* MESSAGES */}
                        <div className="h-[360px] overflow-y-auto p-4 space-y-4 bg-gray-50">

                            {messages.map((msg, index) => (

                                <div
                                    key={index}
                                    className={`flex ${msg.sender === "user"
                                        ? "justify-end"
                                        : "justify-start"
                                        }`}
                                >

                                    <div
                                        className={`max-w-[80%] px-4 py-3 rounded-2xl text-sm ${msg.sender === "user"
                                            ? "bg-[#FF9933] text-white"
                                            : "bg-white text-gray-700 shadow"
                                            }`}
                                    >
                                        {msg.text}
                                    </div>

                                </div>
                            ))}
                        </div>

                        {/* INPUT */}
                        <div className="p-4 border-t flex gap-2">

                            <input
                                type="text"
                                value={message}
                                onChange={(e) =>
                                    setMessage(e.target.value)
                                }
                                onKeyDown={(e) => {
                                    if (e.key === "Enter") {
                                        sendMessage();
                                    }
                                }}
                                placeholder="Ask something..."
                                className="flex-1 border border-gray-300 rounded-xl px-4 py-2 outline-none focus:ring-2 focus:ring-[#FF9933]"
                            />

                            <button
                                onClick={sendMessage}
                                className="bg-[#FF9933] text-white p-3 rounded-xl"
                            >
                                <Send className="w-5 h-5" />
                            </button>

                        </div>

                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}