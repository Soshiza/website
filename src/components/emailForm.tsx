"use client";

import React, { useState, FormEvent } from "react";
import { motion } from "framer-motion";

interface EmailData {
  name: string;
  subject: string;
  message: string;
}

const EmailForm: React.FC = () => {
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [phone, setPhone] = useState("");
  const [name, setName] = useState("");
  const [isSending, setIsSending] = useState(false);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const [showErrorMessage, setShowErrorMessage] = useState(false);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSending(true);
    setShowSuccessMessage(false);
    setShowErrorMessage(false);

    const emailData: EmailData = {
      name,
      subject,
      message: `From: ${name} <${email}>\nPhone: ${phone}\nMessage: ${message}`,
    };

    try {
      const response = await fetch("/api/nodemailer", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(emailData),
      });

      if (response.ok) {
        console.log("Email sent successfully");
        setShowSuccessMessage(true);
        setEmail("");
        setSubject("");
        setMessage("");
        setPhone("");
        setName("");
      } else {
        const errorData = await response.json();
        console.error("Error sending email:", errorData);
        setShowErrorMessage(true);
      }
    } catch (error) {
      console.error("Error sending email:", error);
      setShowErrorMessage(true);
    } finally {
      setIsSending(false);
    }
  };

  const containerVariants = {
    initial: { opacity: 0, y: -50 },
    animate: { opacity: 1, y: 0, transition: { duration: 0.5 } },
    exit: { opacity: 0, y: -50, transition: { duration: 0.3 } }
  };

  return (
    <motion.div
      className="bg-white p-6 rounded-xl shadow-md max-w-sm mx-auto mt-32 mb-10 w-80 z-50 fixed top-0 left-0 right-0 bottom-0 flex items-center justify-center"
      variants={containerVariants}
      initial="initial"
      animate={showSuccessMessage ? "exit" : "animate"}
    >
      <form onSubmit={handleSubmit} className="space-y-2 mx-4">
        <div>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            placeholder="Ingrese su Nombre"
            className="w-full p-2 border rounded-lg focus:outline-none focus:ring focus:ring-blue-200"
          />
        </div>
        <div>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            placeholder="Ingrese su Email"
            className="w-full p-2 border rounded-lg focus:outline-none focus:ring focus:ring-blue-200"
          />
        </div>
        <div>
          <input
            type="tel"
            id="phone"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            required
            placeholder="Ingrese su N\u00b0 Telefonico"
            className="w-full p-2 border rounded-lg focus:outline-none focus:ring focus:ring-blue-200"
          />
        </div>
        <div>
          <input
            type="text"
            id="subject"
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
            required
            placeholder="Asunto"
            className="w-full p-2 border rounded-lg focus:outline-none focus:ring focus:ring-blue-200"
          />
        </div>
        <div>
          <textarea
            id="message"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            required
            rows={4}
            placeholder="Mensaje"
            className="w-full p-2 border rounded-lg focus:outline-none focus:ring focus:ring-blue-200"
          />
        </div>

        <button
          type="submit"
          className="bg-[#1B9AAA] hover:bg-[#27B9CB] text-white font-medium py-2 px-4 rounded-lg w-full transition duration-200 disabled:opacity-50"
          disabled={isSending}
        >
          {isSending ? "Sending..." : "Send Email"}
        </button>

        {showSuccessMessage && (
          <p className="text-green-500 text-center">Email sent successfully!</p>
        )}
        {showErrorMessage && (
          <p className="text-red-500 text-center">Error sending email. Please try again.</p>
        )}
      </form>
    </motion.div>
  );
};

export default EmailForm;
