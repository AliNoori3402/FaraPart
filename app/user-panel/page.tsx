"use client";
import { useEffect, useState } from "react";
import axios from "axios";
import { motion, AnimatePresence } from "framer-motion";
import {
  User,
  Mail,
  MapPin,
  Phone,
  CheckCircle,
  XCircle,
  Edit2,
  Hash,
  Calendar,
  Archive,
} from "lucide-react";

export default function UserPanelPage() {
  const [profile, setProfile] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [editMode, setEditMode] = useState(false);
  const [form, setForm] = useState({
    first_name: "",
    last_name: "",
    national_code: "",
    email: "",
    postal_code: "",
    address: "",
    phone_number: "",
  });
  const [toast, setToast] = useState<{
    type: "success" | "error";
    message: string;
  } | null>(null);

  // Load profile
  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    axios
      .get("/api/profile", { headers: { Authorization: `Bearer ${token}` } })
      .then((res) => {
        setProfile(res.data);
        setForm({
          first_name: res.data.first_name,
          last_name: res.data.last_name,
          national_code: res.data.national_code,
          email: res.data.email,
          postal_code: res.data.postal_code,
          address: res.data.address,
          phone_number: res.data.phone_number,
        });
      })
      .catch(() => showToast("error", "خطا در بارگذاری اطلاعات پروفایل"))
      .finally(() => setLoading(false));
  }, []);

  // Toast helper
  const showToast = (type: "success" | "error", message: string) => {
    setToast({ type, message });
    setTimeout(() => setToast(null), 3500);
  };

  const updateProfile = async () => {
    const token = localStorage.getItem("accessToken");
    try {
      const res = await axios.patch(
        "/api/profile",
        { ...form },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setProfile(res.data);
      setEditMode(false);
      showToast("success", "اطلاعات با موفقیت بروزرسانی شد!");
    } catch {
      showToast("error", "خطا در بروزرسانی اطلاعات");
    }
  };

  if (loading)
    return (
      <div className="p-6 text-center text-gray-500">در حال بارگذاری...</div>
    );

  return (
    <div className="min-h-screen mt-20 sm:mt-30 lg:mt-45  bg-gray-50 font-yekanDemiBold p-6 lg:p-16">
      <h1 className="text-4xl font-bold text-center text-[#004D7A] mb-10">
        پنل کاربری
      </h1>

      {/* Toast notification */}
      <AnimatePresence>
        {toast && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className={`fixed top-6 right-6 px-6 py-3 rounded-lg shadow-lg text-white z-50 ${
              toast.type === "success" ? "bg-green-500" : "bg-red-500"
            }`}
          >
            {toast.message}
          </motion.div>
        )}
      </AnimatePresence>

      {/* User Info */}
      <div className="max-w-2xl  mx-auto space-y-6">
        {!editMode ? (
          <>
            <div className="flex items-center gap-3 bg-white p-4 rounded-xl shadow hover:shadow-md transition">
              <User className="text-blue-600" />
              <p>
                <strong>نام:</strong> {profile.first_name}
              </p>
            </div>
            <div className="flex items-center gap-3 bg-white p-4 rounded-xl shadow hover:shadow-md transition">
              <User className="text-blue-600" />
              <p>
                <strong>نام خانوادگی:</strong> {profile.last_name}
              </p>
            </div>
            <div className="flex items-center gap-3 bg-white p-4 rounded-xl shadow hover:shadow-md transition">
              <Hash className="text-blue-600" />
              <p>
                <strong>کد ملی:</strong> {profile.national_code}
              </p>
            </div>
            <div className="flex items-center gap-3 bg-white p-4 rounded-xl shadow hover:shadow-md transition">
              <Mail className="text-blue-600" />
              <p>
                <strong>ایمیل:</strong> {profile.email}
              </p>
            </div>
            <div className="flex items-center gap-3 bg-white p-4 rounded-xl shadow hover:shadow-md transition">
              <Phone className="text-blue-600" />
              <p>
                <strong>شماره تماس:</strong> {profile.phone_number}
              </p>
            </div>
            <div className="flex items-center gap-3 bg-white p-4 rounded-xl shadow hover:shadow-md transition">
              <MapPin className="text-blue-600" />
              <p>
                <strong>آدرس:</strong> {profile.address}
              </p>
            </div>
            <div className="flex items-center gap-3 bg-white p-4 rounded-xl shadow hover:shadow-md transition">
              <Archive className="text-blue-600" />
              <p>
                <strong>کد پستی:</strong> {profile.postal_code}
              </p>
            </div>
            <div className="flex items-center gap-3 bg-white p-4 rounded-xl shadow hover:shadow-md transition">
              <Calendar className="text-blue-600" />
              <p>
                <strong>تاریخ ایجاد:</strong>{" "}
                {new Date(profile.created_at).toLocaleDateString("fa-IR")}
              </p>
            </div>
            <div className="flex items-center gap-3 bg-white p-4 rounded-xl shadow hover:shadow-md transition">
              <Calendar className="text-blue-600" />
              <p>
                <strong>تاریخ بروزرسانی:</strong>{" "}
                {new Date(profile.updated_at).toLocaleDateString("fa-IR")}
              </p>
            </div>
            <div className="flex items-center gap-3 bg-white p-4 rounded-xl shadow hover:shadow-md transition">
              {profile.is_verified ? (
                <CheckCircle className="text-green-600" />
              ) : (
                <XCircle className="text-red-600" />
              )}
              <p>
                <strong>وضعیت:</strong>{" "}
                {profile.is_verified ? "تایید شده" : "تایید نشده"}
              </p>
            </div>
            <button
              onClick={() => setEditMode(true)}
              className="w-full flex items-center justify-center gap-2 bg-blue-600 text-white py-3 rounded-xl hover:bg-blue-700 transition font-semibold"
            >
              <Edit2 className="w-5 h-5" /> ویرایش اطلاعات
            </button>
          </>
        ) : (
          <>
            <input
              className="w-full border p-3 rounded-xl focus:ring-2 focus:ring-blue-500"
              value={form.first_name}
              onChange={(e) => setForm({ ...form, first_name: e.target.value })}
              placeholder="نام"
            />
            <input
              className="w-full border p-3 rounded-xl focus:ring-2 focus:ring-blue-500"
              value={form.last_name}
              onChange={(e) => setForm({ ...form, last_name: e.target.value })}
              placeholder="نام خانوادگی"
            />
            <input
              className="w-full border p-3 rounded-xl focus:ring-2 focus:ring-blue-500"
              value={form.national_code}
              onChange={(e) =>
                setForm({ ...form, national_code: e.target.value })
              }
              placeholder="کد ملی"
            />
            <input
              className="w-full border p-3 rounded-xl focus:ring-2 focus:ring-blue-500"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              placeholder="ایمیل"
            />
            <input
              className="w-full border p-3 rounded-xl focus:ring-2 focus:ring-blue-500"
              value={form.phone_number}
              onChange={(e) =>
                setForm({ ...form, phone_number: e.target.value })
              }
              placeholder="شماره تماس"
            />
            <input
              className="w-full border p-3 rounded-xl focus:ring-2 focus:ring-blue-500"
              value={form.address}
              onChange={(e) => setForm({ ...form, address: e.target.value })}
              placeholder="آدرس"
            />
            <input
              className="w-full border p-3 rounded-xl focus:ring-2 focus:ring-blue-500"
              value={form.postal_code}
              onChange={(e) =>
                setForm({ ...form, postal_code: e.target.value })
              }
              placeholder="کد پستی"
            />
            <button
              onClick={updateProfile}
              className="mt-4 w-full bg-green-600 text-white py-3 rounded-xl hover:bg-green-700 transition font-semibold"
            >
              ذخیره تغییرات
            </button>
            <button
              onClick={() => setEditMode(false)}
              className="mt-2 w-full bg-gray-300 py-3 rounded-xl hover:bg-gray-400 transition font-semibold"
            >
              انصراف
            </button>
          </>
        )}
      </div>
    </div>
  );
}
