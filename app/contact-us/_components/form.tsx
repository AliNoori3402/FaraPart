"use client";

import React, { useState } from "react";
import axios from "axios";
import { toast } from "sonner";

const ContactPage = () => {
  const [title, setTitle] = useState("");
  const [message, setMessage] = useState("");
  const [images, setImages] = useState<FileList | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!title || !message) {
      toast.error("لطفاً عنوان و پیام را وارد کنید.");
      return;
    }

    const rawAccessToken = localStorage.getItem("accessToken");
    const accessToken = rawAccessToken
      ? rawAccessToken.replace(/^"(.*)"$/, "$1")
      : null;

    if (!accessToken) {
      toast.error("لطفاً ابتدا وارد حساب خود شوید.");
      return;
    }

    setLoading(true);

    try {
      const formData = new FormData();
      formData.append("title", title);
      formData.append("message", message);

      if (images && images.length > 0) {
        Array.from(images).forEach((file) => formData.append("images", file));
      }

      const response = await axios.post(
        "http://194.5.175.107:8000/api/admin/call/create/",
        formData,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (response.status === 201 || response.status === 200) {
        toast.success("پیام شما با موفقیت ارسال شد ✅");
        setTitle("");
        setMessage("");
        setImages(null);
        // ریست input فایل
        const fileInput = document.getElementById(
          "fileInput"
        ) as HTMLInputElement;
        if (fileInput) fileInput.value = "";
      }
    } catch (err: any) {
      console.error(err);
      toast.error(
        err?.response?.data?.message ||
          "ارسال پیام با خطا مواجه شد. لطفاً دوباره تلاش کنید."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-[600px] mx-auto px-4 py-12 font-yekanRegular">
      <h1 className="text-2xl font-bold text-center mb-6">تماس با ما</h1>

      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <input
          type="text"
          placeholder="عنوان پیام"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="border border-gray-300 rounded px-4 py-2 outline-none focus:ring-2 focus:ring-blue-500 font-yekanRegular"
        />

        <textarea
          placeholder="متن پیام شما"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          rows={6}
          className="border border-gray-300 rounded px-4 py-2 outline-none focus:ring-2 focus:ring-blue-500 resize-none font-yekanRegular"
        />

        <input
          id="fileInput"
          type="file"
          multiple
          onChange={(e) => setImages(e.target.files)}
          className="border border-gray-300 rounded px-4 py-2 font-yekanRegular"
        />

        <button
          type="submit"
          disabled={loading}
          className="bg-blue-600 text-white px-6 py-3 rounded hover:bg-blue-700 transition disabled:opacity-50 font-yekanRegular"
        >
          {loading ? "در حال ارسال..." : "ارسال پیام"}
        </button>
      </form>
    </div>
  );
};

export default ContactPage;
