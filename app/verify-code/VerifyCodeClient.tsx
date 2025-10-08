"use client";

import React, { useState, useEffect } from "react";
import axios from "axios";
import { useRouter, useSearchParams } from "next/navigation";
import Image from "next/image";

function VerifyCodeClient() {
  const [code, setCode] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [timer, setTimer] = useState(80);
  const [resending, setResending] = useState(false);

  const router = useRouter();
  const searchParams = useSearchParams();
  const phoneNumber = searchParams.get("phone");

  useEffect(() => {
    if (timer <= 0) return;
    const countdown = setInterval(() => {
      setTimer((prev) => prev - 1);
    }, 1000);
    return () => clearInterval(countdown);
  }, [timer]);

  const handleSubmit = async () => {
    if (!code || !phoneNumber) {
      setError("کد یا شماره تلفن وارد نشده است.");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const response = await axios.post("/api/verifycode", {
        phone_number: phoneNumber,
        code,
      });

      const data = response.data;

      if (response.status === 200 && data.status === "success") {
        const { tokens, user_created, person_created, phone_number } = data;

        localStorage.setItem("accessToken", tokens.access);
        localStorage.setItem("refreshToken", tokens.refresh);
        localStorage.setItem("userId", tokens.user_id.toString());
        localStorage.setItem("phoneNumber", phone_number);

        if (!user_created || !person_created) {
          router.push("/personal-information");
        } else {
          router.push("/");
        }
      } else {
        setError("کد وارد شده نادرست است.");
      }
    } catch (err: any) {
      setError(err?.response?.data?.message || "خطا در ارتباط با سرور");
    } finally {
      setLoading(false);
    }
  };

  const handleResendCode = async () => {
    if (!phoneNumber) return;
    try {
      setResending(true);
      await axios.post("/api/sendotp", { phone_number: phoneNumber });
      setTimer(80);
      setError("");
    } catch {
      setError("خطا در ارسال مجدد کد.");
    } finally {
      setResending(false);
    }
  };

  return (
    <div className="w-full h-screen flex justify-center items-start overflow-hidden"></div>
  );
}

export default VerifyCodeClient;
