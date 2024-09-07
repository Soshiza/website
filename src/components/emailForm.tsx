"use client";

import React, { useState, FormEvent, useRef, useEffect } from "react";
import { motion } from "framer-motion";

interface EmailData {
  name: string;
  subject: string;
  message: string;
}

const EmailForm: React.FC<{ onClose: () => void }> = ({ onClose }) => {
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [phone, setPhone] = useState("");
  const [name, setName] = useState("");
  const [isSending, setIsSending] = useState(false);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const [showErrorMessage, setShowErrorMessage] = useState(false);

  const formRef = useRef<HTMLDivElement>(null);

  // Cierra el formulario si se hace clic fuera de él
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (formRef.current && !formRef.current.contains(event.target as Node)) {
        onClose();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [onClose]);

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
        setShowSuccessMessage(true);
        setEmail("");
        setSubject("");
        setMessage("");
        setPhone("");
        setName("");
      } else {
        const errorData = await response.json();
        setShowErrorMessage(true);
      }
    } catch (error) {
      setShowErrorMessage(true);
    } finally {
      setIsSending(false);
    }
  };

  const containerVariants = {
    initial: { opacity: 0, y: -50 },
    animate: { opacity: 1, y: 0, transition: { duration: 0.5 } },
    exit: { opacity: 0, y: -50, transition: { duration: 0.3 } },
  };

  return (
    <motion.div
      className="fixed inset-0 flex items-center justify-center z-[10000]" // Z-index alto para estar sobre todo
      initial="initial"
      animate={showSuccessMessage ? "exit" : "animate"}
      variants={containerVariants}
    >
      {/* Fondo oscuro para crear un efecto de superposición */}
      <div className="fixed inset-0 bg-black bg-opacity-50" />
      
      <div ref={formRef} className="bg-white p-8 rounded-xl shadow-lg w-full max-w-[400px] mx-auto sm:w-[450px] z-[10001] relative">
        {/* Botón de cerrado */}
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-gray-400 hover:text-gray-600"
        >
          ✖
        </button>

        <form onSubmit={handleSubmit} className="space-y-4 w-full">
          <div>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              placeholder="Nombre"
              className="w-full p-4 border text-lg rounded-lg focus:outline-none focus:ring focus:ring-blue-200"
            />
          </div>
          <div>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              placeholder="Email"
              className="w-full p-4 border text-lg rounded-lg focus:outline-none focus:ring focus:ring-blue-200"
            />
          </div>
          <div>
            <input
              type="tel"
              id="phone"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              required
              placeholder="Teléfono"
              className="w-full p-4 border text-lg rounded-lg focus:outline-none focus:ring focus:ring-blue-200"
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
              className="w-full p-4 border text-lg rounded-lg focus:outline-none focus:ring focus:ring-blue-200"
            />
          </div>
          <div>
            <textarea
              id="message"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              required
              rows={5}
              placeholder="Mensaje"
              className="w-full p-4 border text-lg rounded-lg focus:outline-none focus:ring focus:ring-blue-200"
            />
          </div>

          <button
            type="submit"
            className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-4 rounded-lg w-full transition duration-200 disabled:opacity-50"
            disabled={isSending}
          >
            {isSending ? "Enviando..." : "Enviar"}
          </button>

          {showSuccessMessage && (
            <p className="text-green-500 text-center">¡Email enviado con éxito!</p>
          )}
          {showErrorMessage && (
            <p className="text-red-500 text-center">Error al enviar el email. Intente de nuevo.</p>
          )}
        </form>
      </div>
    </motion.div>
  );
};

export default EmailForm;

