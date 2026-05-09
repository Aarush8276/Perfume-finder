"use client";
import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import styles from "./Chatbot.module.css";

const QUICK_REPLIES = ["🔥 Confident", "❄️ Winter", "Suggest a perfume", "💖 Romantic", "🎉 Party", "💻 Office vibe"];

export default function Chatbot({ onStateUpdate, onReveal }) {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [history, setHistory] = useState([]); // For chatbot memory
  const [input, setInput] = useState("");
  const [typing, setTyping] = useState(false);
  const [greeted, setGreeted] = useState(false);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, typing]);

  const openChat = () => {
    setOpen(true);
    if (!greeted) {
      setGreeted(true);
      setTyping(true);
      setTimeout(() => {
        setTyping(false);
        setMessages([{ role: "bot", text: "Hi! ✨ I'm Aura AI. Tell me how you're feeling or the weather outside, and I'll find your perfect scent!" }]);
      }, 900);
    }
  };

  const sendMessage = async (text) => {
    const userText = text || input.trim();
    if (!userText) return;
    setInput("");

    const userMsg = { role: "user", text: userText };
    setMessages(m => [...m, userMsg]);
    setTyping(true);

    // Build updated history for this request (last 6 messages = 3 turns)
    const updatedHistory = [...history, { role: "user", content: userText }].slice(-6);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: userText, history: updatedHistory }),
      });
      const data = await res.json();
      setTyping(false);

      const botText = data.reply === "TRIGGER_RECOMMEND"
        ? "I've revealed your personalized perfumes on the screen! 👇 Scroll down to see them."
        : data.reply;

      if (data.stateUpdate && Object.keys(data.stateUpdate).length > 0) {
        onStateUpdate(data.stateUpdate);
      }

      if (data.reply === "TRIGGER_RECOMMEND") {
        onReveal();
      }

      setMessages(m => [...m, { role: "bot", text: botText }]);
      // Add both turns to history
      setHistory(h => [...h, { role: "user", content: userText }, { role: "assistant", content: botText }].slice(-6));
    } catch {
      setTyping(false);
      setMessages(m => [...m, { role: "bot", text: "Oops, something went wrong. Try again!" }]);
    }
  };

  return (
    <>
      {/* Toggle Button */}
      <motion.button
        className={styles.toggle}
        onClick={() => open ? setOpen(false) : openChat()}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        aria-label="Open chat"
      >
        {open ? "✕" : "💬"}
      </motion.button>

      {/* Chat Window */}
      <AnimatePresence>
        {open && (
          <motion.div
            className={`${styles.chatbox} card-grad glass shadow-soft`}
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.25 }}
          >
            <div className={styles.header}>
              <span>✨</span> Aura AI
              <button className={styles.clearHistory} onClick={() => { setMessages([]); setHistory([]); setGreeted(false); }} title="Clear chat">↺</button>
            </div>

            <div className={styles.messages}>
              {messages.map((m, i) => (
                <motion.div
                  key={i}
                  className={`${styles.msg} ${m.role === "user" ? styles.user : styles.bot}`}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.25 }}
                >
                  {m.text}
                </motion.div>
              ))}
              {typing && (
                <motion.div className={`${styles.msg} ${styles.bot} ${styles.typing}`}
                  initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                  <span /><span /><span />
                </motion.div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Quick Replies */}
            <div className={styles.chips}>
              {QUICK_REPLIES.map((q) => (
                <button key={q} className={styles.chip} onClick={() => sendMessage(q)}>{q}</button>
              ))}
            </div>

            <div className={styles.inputRow}>
              <input
                className={styles.input}
                value={input}
                onChange={e => setInput(e.target.value)}
                onKeyDown={e => e.key === "Enter" && sendMessage()}
                placeholder="Ask about perfumes..."
              />
              <button className={styles.send} onClick={() => sendMessage()}>➤</button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
