"use client";

import React, { useState } from "react";

const ContactPage = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // اعتبارسنجی ساده
    if (!name || !email || !subject || !message) {
      setError("لطفاً همه فیلدها را پر کنید.");
      return;
    }

    setLoading(true);
    setError("");
    try {
      // اینجا می‌توانید درخواست API واقعی ارسال کنید
      // const res = await fetch("/api/contact", { method: "POST", body: JSON.stringify({ name, email, subject, message }) });

      console.log({ name, email, subject, message }); // فعلاً لاگ کردن
      setSuccess(true);
      setName("");
      setEmail("");
      setSubject("");
      setMessage("");
    } catch (err) {
      console.error(err);
      setError("ارسال پیام با خطا مواجه شد.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-[800px] mx-auto px-4 py-16">
      <h1 className="text-3xl font-bold text-center mb-8">تماس با ما</h1>

      {success && (
        <div className="bg-green-100 text-green-800 p-4 rounded mb-4 text-center">
          پیام شما با موفقیت ارسال شد!
        </div>
      )}

      {error && (
        <div className="bg-red-100 text-red-800 p-4 rounded mb-4 text-center">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <input
          type="text"
          placeholder="نام و نام خانوادگی"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="border border-gray-300 rounded px-4 py-2 outline-none focus:ring-2 focus:ring-blue-400"
        />

        <input
          type="email"
          placeholder="ایمیل"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="border border-gray-300 rounded px-4 py-2 outline-none focus:ring-2 focus:ring-blue-400"
        />

        <input
          type="text"
          placeholder="موضوع"
          value={subject}
          onChange={(e) => setSubject(e.target.value)}
          className="border border-gray-300 rounded px-4 py-2 outline-none focus:ring-2 focus:ring-blue-400"
        />

        <textarea
          placeholder="پیام شما"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          rows={6}
          className="border border-gray-300 rounded px-4 py-2 outline-none focus:ring-2 focus:ring-blue-400 resize-none"
        />

        <button
          type="submit"
          disabled={loading}
          className="bg-blue-600 text-white px-6 py-3 rounded hover:bg-blue-700 transition disabled:opacity-50"
        >
          {loading ? "در حال ارسال..." : "ارسال پیام"}
        </button>
      </form>
    </div>
  );
};

export default ContactPage;
