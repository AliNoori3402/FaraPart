"use client";

import React, { useState } from "react";
import axios from "axios";
import { toast } from "sonner";
import { BiMailSend, BiMapPin, BiPhone } from "react-icons/bi";
import { useRouter } from "next/navigation";

const ContactPage = () => {
  const [title, setTitle] = useState("");
  const [message, setMessage] = useState("");
  const [images, setImages] = useState<FileList | null>(null);
  const [loading, setLoading] = useState(false);
  const router = useRouter();
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
      router.push("/login-rigister");
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

      const response = await axios.post("/api/call", formData, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "multipart/form-data",
        },
      });

      if (response.status === 201 || response.status === 200) {
        toast.success("پیام شما با موفقیت ارسال شد ✅");
        setTitle("");
        setMessage("");
        setImages(null);
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
    <div className="container mx-auto px-4 sm:px-6 lg:px-12 py-16 font-yekanRegular">
      <h1 className="text-3xl sm:text-4xl font-yekanBold text-center text-[#1C2024] mb-12">
        تماس با ما
      </h1>

      <div className="flex flex-col lg:flex-row gap-10">
        {/* اطلاعات تماس */}
        <div className="flex-1 bg-[#F3F6F9] p-8 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300">
          <h2 className="text-2xl font-yekanBold mb-6">اطلاعات تماس</h2>
          <div className="flex items-start gap-4 mb-5">
            <div className="bg-blue-100 p-3 rounded-full flex-shrink-0">
              <BiMailSend className="text-blue-600 w-6 h-6" />
            </div>
            <span className="text-[#1C2024] font-yekanRegular">
              farapartmotor@gmail.com
            </span>
          </div>
          <div className="flex items-start gap-4 mb-5">
            <div className="bg-blue-100 p-3 rounded-full flex-shrink-0">
              <BiPhone className="text-blue-600 w-6 h-6" />
            </div>
            <span className="text-[#1C2024] font-yekanRegular">
              01133375007
            </span>
          </div>
          <div className="flex items-start gap-4 mb-5">
            <div className="bg-blue-100 p-3 rounded-full flex-shrink-0">
              <BiMapPin className="text-blue-600 w-6 h-6" />
            </div>
            <span className="text-[#1C2024] font-yekanRegular leading-relaxed">
              مازندران، ساری، کمربندی غربی، بعد از دانشگاه علوم پزشکی، نمایندگی
              ایران خودرو رضی پور
            </span>
          </div>
        </div>

        {/* فرم تماس */}
        <div className="flex-1 bg-white p-8 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300">
          <form onSubmit={handleSubmit} className="flex flex-col gap-5">
            <input
              type="text"
              placeholder="عنوان پیام"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="border border-gray-300 rounded px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500 focus:scale-[1.02] transition-transform font-yekanRegular"
            />

            <textarea
              placeholder="متن پیام شما"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              rows={6}
              className="border border-gray-300 rounded px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500 focus:scale-[1.02] transition-transform resize-none font-yekanRegular"
            />

            <div className="border-2 border-dashed border-gray-300 rounded-xl p-6 flex flex-col items-center justify-center text-center cursor-pointer hover:border-blue-500 transition-colors">
              <label
                htmlFor="fileInput"
                className="flex flex-col items-center justify-center cursor-pointer"
              >
                <svg
                  className="w-10 h-10 text-blue-500 mb-2"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={2}
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M7 16V4m0 0L3 8m4-4l4 4m6 8v-4m0 0l4 4m-4-4l-4 4"
                  />
                </svg>
                <span className="text-gray-500 font-yekanRegular">
                  فایل‌های خود را اینجا بکشید یا کلیک کنید
                </span>
                {images && images.length > 0 && (
                  <span className="mt-2 text-sm text-gray-600">
                    {images.length} فایل انتخاب شده
                  </span>
                )}
              </label>
              <input
                id="fileInput"
                type="file"
                multiple
                onChange={(e) => setImages(e.target.files)}
                className="hidden"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="bg-gradient-to-r from-blue-500 to-blue-700 text-white px-6 py-3 rounded-xl hover:scale-105 hover:shadow-xl transition-all disabled:opacity-50 font-yekanBold"
            >
              {loading ? "در حال ارسال..." : "ارسال پیام"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;
