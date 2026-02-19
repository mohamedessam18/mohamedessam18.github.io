import React, { useRef, useState } from "react";
import emailjs from "@emailjs/browser";

export default function ContactForm() {
  const formRef = useRef<HTMLFormElement>(null);
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState<string | null>(null);
  const [message, setMessage] = useState("");

  const [formData, setFormData] = useState({
    name: "",
    email: "",
  });

  const sendEmail = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!formRef.current) return;

    setLoading(true);
    setStatus(null);

    try {
      await emailjs.sendForm(
        import.meta.env.VITE_EMAILJS_SERVICE_ID,
        import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
        formRef.current,
        import.meta.env.VITE_EMAILJS_PUBLIC_KEY
      );

      setStatus("Message sent successfully ✅");
      formRef.current.reset();
    } catch (error) {
      console.error("Email send error:", error);
      setStatus("Failed to send message ❌");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ maxWidth: "400px", margin: "auto" }}>
      <form ref={formRef} onSubmit={sendEmail}>
         {/* Name Field */}
    <div>
      <label className="block text-sm text-gray-400 mb-2 font-mono">
        <span className="text-matrix">$</span> name
      </label>
      <input
        type="text"
        value={formData.name}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setFormData({ ...formData, name: e.target.value })}
        placeholder="Enter your name"
        required
        className="w-full bg-dark-200 border border-dark-300 rounded-lg p-3 text-gray-200 placeholder-gray-500 focus:ring-2 focus:ring-matrix focus:border-matrix transition-all"
        name="name"
      />
    </div>

    {/* Email Field */}
    <div>
      <label className="block text-sm text-gray-400 mb-2 font-mono">
        <span className="text-matrix">$</span> email
      </label>
      <input
        type="email"
        value={formData.email}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setFormData({ ...formData, email: e.target.value })}
        placeholder="Enter your email"
        required
        className="w-full bg-dark-200 border border-dark-300 rounded-lg p-3 text-gray-200 placeholder-gray-500 focus:ring-2 focus:ring-matrix focus:border-matrix transition-all"
        name="email"
      />
    </div>


<textarea
  name="message"
  value={message}
  onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setMessage(e.target.value)}
  placeholder="Tell me about your project..."
  required
  rows={5}
  className="form-input resize-none bg-dark-200 border border-dark-300 rounded-lg p-3 text-gray-200 placeholder-gray-500 focus:ring-2 focus:ring-matrix focus:border-matrix transition-all"
/>

        <button type="submit" disabled={loading}>
          {loading ? "Sending..." : "Send"}
        </button>
      </form>

      {status && <p>{status}</p>}
    </div>
  );
}