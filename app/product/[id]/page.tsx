"use client";

import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import axios from "axios";
import ProductImages from "../../components/DeatilPartImage";
import TextDetails from "../../components/TextDetails";
import Image from "next/image";
import { toast } from "sonner";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";

type ProductDetail = {
  id: number;
  name: string;
  internal_code: string;
  commercial_code: string;
  price: number;
  description: string;
  image_url: string[];
  part_type: string;
  car_names: string[];
  category: { name: string };
  inventory_warning: string;
  has_warranty: boolean;
  warranty_name: string | null;
  inventory?: number;
};

type CommentData = {
  id: number;
  first_name: string;
  last_name: string;
  text: string;
  created_at: string;
  replies: CommentData[];
  parent?: number | null;
};

const CommentModal: React.FC<{
  isOpen: boolean;
  onClose: () => void;
  partId: number;
  parentId?: number | null;
  refreshComments: () => void;
}> = ({ isOpen, onClose, partId, parentId = null, refreshComments }) => {
  const [text, setText] = useState("");
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState<any>(null);
  const [loadingUser, setLoadingUser] = useState(true);
  useEffect(() => {
    const token =
      typeof window !== "undefined"
        ? localStorage.getItem("accessToken")
        : null;

    if (!token) {
      setLoadingUser(false);
      return;
    }

    const getProfile = async () => {
      try {
        const token = localStorage.getItem("accessToken");

        const res = await axios.get("/api/profile", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setUser(res.data);
      } catch (err) {
        setUser(null);
      } finally {
        setLoadingUser(false);
      }
    };

    getProfile();
  }, []);
  const handleSubmit = async () => {
    if (!text.trim()) return toast.error("متن کامنت نمی‌تواند خالی باشد");

    const rawToken = localStorage.getItem("accessToken");
    const token = rawToken ? rawToken.replace(/^"(.*)"$/, "$1") : null;

    if (!token) {
      toast.error("برای ثبت نظر لطفا ابتدا وارد حساب کاربری خود شوید");
      return;
    }

    setLoading(true);
    try {
      await axios.post(
        `/api/part-comment/create`,
        {
          part: partId,
          first_name: user.first_name,
          last_name: user.last_name,
          parent: parentId,
          text,
        },
        { headers: { Authorization: `Bearer ${token}` } },
      );
      toast.success("کامنت شما ثبت شد");
      setText("");
      refreshComments();
      onClose();
    } catch (err) {
      toast.error("خطا در ارسال کامنت");
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.8 }}
        transition={{ duration: 0.25 }}
        className="fixed inset-0 z-50 flex justify-center items-center backdrop-blur-xl bg-opacity-30"
      >
        <div className="bg-white rounded-2xl w-full max-w-lg p-6 relative shadow-2xl">
          <button
            className="absolute top-4 right-4 text-gray-500 hover:text-gray-800"
            onClick={onClose}
          >
            ✕
          </button>
          <h2 className="text-[#004D7A] font-yekanBold text-lg mb-4">
            {parentId ? "پاسخ به نظر" : "ثبت نظر"}
          </h2>
          <textarea
            className="w-full border rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-400"
            placeholder="نظر خود را وارد کنید"
            value={text}
            onChange={(e) => setText(e.target.value)}
          />
          <button
            className="mt-4 px-6 py-2 bg-[#004D7A] text-white font-yekanBold rounded-lg hover:bg-blue-700 disabled:opacity-50 transition-colors"
            disabled={loading}
            onClick={handleSubmit}
          >
            ارسال
          </button>
        </div>
      </motion.div>
    </AnimatePresence>
  );
};

const CommentCard: React.FC<{
  comment: CommentData;
  level?: number;
  onReply: (id: number) => void;
  currentUser: any;
}> = ({ comment, level = 0, onReply, currentUser }) => {
  const [showReplies, setShowReplies] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    if (!token) return;

    axios
      .get("/api/profile", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => setUser(res.data))
      .catch(() => setUser(null));
  }, []);
  return (
    <div
      className={`border rounded-2xl p-5 shadow-md transition-shadow mb-4 ${
        level === 0
          ? "bg-gradient-to-r from-blue-50 to-blue-100"
          : "bg-gradient-to-r from-gray-50 to-gray-100 ml-6"
      }`}
    >
      <div className="flex justify-between items-center mb-2">
        <strong className="text-[#004D7A]">
          {comment.first_name} {comment.last_name}
        </strong>
        <div className="flex gap-2">
          {comment.replies.length > 0 && (
            <button
              className="text-sm text-blue-600 hover:text-blue-800 hover:bg-blue-50 px-2 py-1 rounded transition-all"
              onClick={() => setShowReplies(!showReplies)}
            >
              {showReplies
                ? `پنهان کردن ${comment.replies.length} پاسخ`
                : `نمایش ${comment.replies.length} پاسخ`}
            </button>
          )}
          {currentUser &&
            !(
              currentUser.first_name === comment.first_name &&
              currentUser.last_name === comment.last_name
            ) && (
              <button
                className="text-sm text-green-600 hover:text-green-800 hover:bg-green-50 px-2 py-1 rounded transition-all"
                onClick={() => onReply(comment.id)}
              >
                پاسخ
              </button>
            )}
        </div>
      </div>
      <p className="text-[#1C2024] leading-relaxed">{comment.text}</p>
      <p className="text-xs text-gray-400 mt-1">
        {new Date(comment.created_at).toLocaleString("fa-IR")}
      </p>

      <AnimatePresence>
        {showReplies &&
          comment.replies.map((reply) => (
            <motion.div
              key={reply.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              transition={{ duration: 0.3 }}
            >
              <CommentCard
                currentUser={user}
                comment={reply}
                level={level + 1}
                onReply={onReply}
              />
            </motion.div>
          ))}
      </AnimatePresence>
    </div>
  );
};

const ProductDetailPage: React.FC = () => {
  const params = useParams();
  const id = params?.id;
  const [activeTab, setActiveTab] = useState<
    "description" | "specs" | "comments"
  >("description");
  const [product, setProduct] = useState<ProductDetail | null>(null);
  const [hasInventory, setHasInventory] = useState<boolean | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [quantity, setQuantity] = useState<number>(1);

  const [comments, setComments] = useState<CommentData[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [replyTo, setReplyTo] = useState<number | null>(null);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    if (!token) return;

    axios
      .get("/api/profile", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => setUser(res.data))
      .catch(() => setUser(null));
  }, []);

  const fetchProductAndInventory = async () => {
    if (!id) return;
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(`/api/AllProduct/${id}`);
      if (!res.ok) throw new Error("خطا در دریافت اطلاعات محصول");
      const data = await res.json();
      setProduct(data);

      try {
        const inventoryRes = await axios.post(
          "/api/inventory",
          { id: Number(id) },
          { headers: { "Content-Type": "application/json" } },
        );
        setHasInventory(inventoryRes.data?.has_inventory ?? false);
      } catch (invErr) {
        setHasInventory(null);
      }
    } catch (err) {
      setError((err as Error).message);
      toast.error("خطایی در دریافت اطلاعات محصول رخ داد");
    } finally {
      setLoading(false);
    }
  };

  const fetchComments = async () => {
    if (!id) return;
    try {
      const res = await axios.get(`/api/part-comment/list/${id}`);
      const data: { results: CommentData[] } = res.data;

      const mapReplies = (commentsList: CommentData[]): CommentData[] =>
        commentsList.map((c) => ({
          ...c,
          replies:
            c.replies?.map((r) => ({ ...r, replies: r.replies || [] })) || [],
        }));

      setComments(mapReplies(data.results || []));
    } catch (err) {}
  };

  useEffect(() => {
    fetchProductAndInventory();
    fetchComments();
  }, [id]);

  const addToCart = async (quantityToAdd: number) => {
    if (!id) return toast.error("شناسه محصول نامشخص است");
    const rawAccessToken = localStorage.getItem("accessToken");
    const accessToken = rawAccessToken
      ? rawAccessToken.replace(/^"(.*)"$/, "$1")
      : null;
    if (!accessToken) return toast.error("لطفا ابتدا وارد شوید");
    try {
      await axios.post(
        "/api/Addcart",
        { part_id: Number(id), quantity: quantityToAdd },
        { headers: { Authorization: `Bearer ${accessToken}` } },
      );
      toast.success("محصول با موفقیت به سبد خرید اضافه شد ✅");
    } catch (err) {
      toast.error("خطا در افزودن به سبد خرید ❌");
    }
  };

  if (loading)
    return (
      <div className="flex flex-col items-center justify-center gap-2">
        <div className="w-10 h-10 border-4 border-blue-500 border-dashed rounded-full animate-spin"></div>
        <div className="text-[#1C2024] font-yekanRegular mt-2">
          در حال بارگذاری ...
        </div>
      </div>
    );
  if (error) return <div>{error}</div>;
  if (!product) return <div>محصول یافت نشد</div>;

  return (
    <div className="w-full  mt-20 sm:mt-30 lg:mt-45  container flex flex-col gap-[64px] mx-auto px-4 md:px-[10px]">
      <div className="w-full flex flex-col gap-[48px] items-center">
        {/* مسیر دسته‌بندی */}
        <div className="w-full max-w-[454px] flex flex-wrap gap-[4px] justify-center sm:justify-center md:justify-start">
          <Link href={"/product"}>
            {" "}
            <div className="text-[14px] text-[#1C2024] font-yekanDemiBold">
              {product.category?.name || "دسته‌بندی نامشخص"}
            </div>
          </Link>

          <Image width={16} height={16} src="/Arrow-leftG.svg" alt="arrow" />
          <div className="text-[14px] text-[#1C2024] font-yekanDemiBold">
            {product.name}
          </div>
        </div>

        {/* تصاویر و جزئیات */}
        <div className="w-full flex flex-col lg:flex-row gap-[32px] sm:gap-[32px] md:gap-[67px] items-center lg:items-start">
          <ProductImages images={product.image_url} />

          <div className="w-full max-w-[591px] flex flex-col gap-[40px]">
            <div className="text-[28px] text-[#1C2024] font-yekanBold text-center sm:text-center md:text-right">
              {product.name}
            </div>

            {/* ردیف اول */}
            <div className="w-full rounded-[24px] bg-[#FCFCFD] border border-[#E8E8EC] flex flex-col sm:flex-row divide-y sm:divide-y-0 sm:divide-x divide-[#E8E8EC]">
              <div className="flex-1 flex flex-col gap-[16px] justify-center p-4">
                <div className="text-[#8B8D98] text-[14px] font-yekanRegular">
                  کد داخلی
                </div>
                <div className="text-[#1C2024] text-[14px] font-yekanDemiBold">
                  {product.internal_code}
                </div>
              </div>
              <div className="flex-1 flex flex-col gap-[16px] justify-center p-4">
                <div className="text-[#8B8D98] text-[14px] font-yekanRegular">
                  کد تجاری
                </div>
                <div className="text-[#1C2024] text-[14px] font-yekanDemiBold">
                  {product.commercial_code}
                </div>
              </div>
              <div className="flex-1 flex flex-col gap-[16px] justify-center p-4">
                <div className="text-[#8B8D98] text-[14px] font-yekanRegular">
                  نوع قطعه
                </div>
                <div className="text-[#1C2024] text-[14px] font-yekanDemiBold">
                  {product.part_type === "spare" ? "مصرفی" : "غیر مصرفی"}
                </div>
              </div>
            </div>

            {/* ردیف دوم */}
            <div className="w-full rounded-[24px] bg-[#FCFCFD] border border-[#E8E8EC] flex flex-col sm:flex-row divide-y sm:divide-y-0 sm:divide-x divide-[#E8E8EC]">
              <div className="flex-1 flex flex-col gap-[16px] justify-center p-4">
                <div className="text-[#8B8D98] text-[14px] font-yekanRegular">
                  موجودی
                </div>
                <div className="text-[#1C2024] text-[14px] font-yekanDemiBold">
                  {hasInventory === null
                    ? "در حال دریافت..."
                    : hasInventory
                      ? "دارد"
                      : "ندارد"}
                </div>
              </div>

              <div className="flex-1 flex flex-col gap-[16px] justify-center p-4">
                <div className="text-[#8B8D98] text-[14px] font-yekanRegular">
                  دسته بندی
                </div>
                <h2 className="text-[#1C2024] text-[14px] font-yekanDemiBold">
                  {product.category?.name || "دسته‌بندی نامشخص"}
                </h2>
              </div>
              <div className="flex-1 flex flex-col gap-[16px] justify-center p-4">
                <div className="text-[#8B8D98] text-[14px] font-yekanRegular">
                  خودروهای سازگار
                </div>
                <div
                  className="text-[#1C2024] max-w-40  truncate
                 text-[14px] font-yekanDemiBold"
                >
                  {product.car_names.join(", ")}
                </div>
              </div>
            </div>

            {/* قیمت و خرید */}
            {product.inventory === 0 || !hasInventory ? (
              <div className="w-full text-center md:text-right text-[16px] text-[#D32F2F] font-yekanDemiBold mt-4">
                {product.inventory_warning ||
                  "این محصول در حال حاضر موجود نیست"}
              </div>
            ) : (
              <>
                {/* قیمت */}
                <div className="flex gap-[4px] items-center justify-center md:justify-start">
                  <div className="text-[24px] text-[#004D7A] font-yekanDemiBold leading-[26px]">
                    {product.price.toLocaleString("fa-IR")}
                  </div>
                  <div className="text-[14px] text-[#004D7A] font-yekanDemiBold leading-[16px]">
                    تومان
                  </div>
                </div>

                {/* کنترل تعداد و خرید */}
                <div className="flex flex-col sm:flex-row gap-[16px]">
                  <div className="flex items-center gap-[16px] justify-center sm:justify-start">
                    <button
                      onClick={() => {
                        if (
                          product.inventory &&
                          quantity >= product.inventory
                        ) {
                          toast.error(
                            `حداکثر موجودی ${product.inventory} عدد است`,
                          );
                          return;
                        }
                        setQuantity((q) => q + 1);
                      }}
                      className="w-[48px] h-[48px] rounded-[20px] bg-[#006FB4] flex justify-center items-center"
                      disabled={!hasInventory}
                    >
                      <Image src="/Add.svg" width={24} height={24} alt="+" />
                    </button>
                    <div className="text-[20px] text-[#000000] font-yekanDemiBold">
                      {quantity}
                    </div>
                    <button
                      onClick={() => setQuantity((q) => Math.max(q - 1, 1))}
                      className="w-[48px] h-[48px] rounded-[20px] bg-[#FCFCFD] border border-[#E0E1E6] flex justify-center items-center"
                      disabled={!hasInventory}
                    >
                      <Image
                        src="/negative.svg"
                        width={24}
                        height={24}
                        alt="-"
                      />
                    </button>
                  </div>

                  <div className="flex-1 flex gap-[16px]">
                    <button
                      onClick={() => addToCart(quantity)}
                      className="flex-1 min-w-[140px] h-[48px] rounded-[16px] flex justify-center items-center gap-[12px] bg-[#004D7A]"
                      disabled={!hasInventory}
                    >
                      <Image
                        width={24}
                        height={24}
                        src="/addbasket.svg"
                        alt="خرید تکی"
                      />
                      <div className="text-[14px] text-[#FCFCFD] font-yekanRegular">
                        خرید تکی
                      </div>
                    </button>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </div>

      <TextDetails />

      <div className="w-full px-10 pb-10 mt-8">
        <div className="flex bg-[#F5F5F7] rounded-xl shadow-sm overflow-hidden border border-[#E0E1E6]">
          <button
            className={`flex-1 py-3 font-yekanDemiBold transition-colors duration-200 ${
              activeTab === "description"
                ? "bg-[#004D7A] text-white"
                : "text-[#8B8D98] hover:bg-[#E0E1E6]"
            }`}
            onClick={() => setActiveTab("description")}
          >
            معرفی محصول
          </button>
          <button
            className={`flex-1 py-3 font-yekanDemiBold transition-colors duration-200 ${
              activeTab === "specs"
                ? "bg-[#004D7A] text-white"
                : "text-[#8B8D98] hover:bg-[#E0E1E6]"
            }`}
            onClick={() => setActiveTab("specs")}
          >
            مشخصات فنی
          </button>
          <button
            className={`flex-1 py-3 font-yekanDemiBold transition-colors duration-200 ${
              activeTab === "comments"
                ? "bg-[#004D7A] text-white"
                : "text-[#8B8D98] hover:bg-[#E0E1E6]"
            }`}
            onClick={() => setActiveTab("comments")}
          >
            نظرات کاربران
          </button>
        </div>

        <div className="mt-6 bg-white rounded-xl shadow-sm p-6 text-[#1C2024] font-yekanRegular text-[14px]">
          {activeTab === "description" && (
            <>
              {product.description ? (
                <p className="leading-relaxed">{product.description}</p>
              ) : (
                <p className="text-[#8B8D98]">این محصول توضیحی ندارد.</p>
              )}
            </>
          )}
          {activeTab === "specs" && (
            <>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="flex justify-between border-b pb-2">
                  <span className="font-yekanDemiBold text-[#004D7A]">
                    کد داخلی
                  </span>
                  <span>{product.internal_code}</span>
                </div>
                <div className="flex justify-between border-b pb-2">
                  <span className="font-yekanDemiBold text-[#004D7A]">
                    کد تجاری
                  </span>
                  <span>{product.commercial_code}</span>
                </div>
                <div className="flex justify-between border-b pb-2">
                  <span className="font-yekanDemiBold text-[#004D7A]">
                    نوع قطعه
                  </span>
                  <span>
                    {product.part_type === "spare" ? "مصرفی" : "غیر مصرفی"}
                  </span>
                </div>
                <div className="flex justify-between border-b pb-2">
                  <span className="font-yekanDemiBold text-[#004D7A]">
                    دسته بندی
                  </span>
                  <span>{product.category?.name || "دسته‌بندی نامشخص"}</span>
                </div>
                <div className="flex justify-between border-b pb-2">
                  <span className="font-yekanDemiBold text-[#004D7A]">
                    خودروهای سازگار
                  </span>
                  <span>{product.car_names.join(", ")}</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-yekanDemiBold text-[#004D7A]">
                    گارانتی
                  </span>
                  <span>
                    {product.has_warranty
                      ? product.warranty_name || "دارد"
                      : "ندارد"}
                  </span>
                </div>
              </div>
            </>
          )}

          {activeTab === "comments" && (
            <>
              <button
                className="mb-4 px-4 py-2 bg-[#004D7A] text-white rounded-lg hover:bg-blue-700 transition-colors"
                onClick={() => {
                  setReplyTo(null);
                  setIsModalOpen(true);
                }}
              >
                ثبت نظر
              </button>
              <div className="flex flex-col gap-4">
                {comments.map((c) => (
                  <CommentCard
                    key={c.id}
                    comment={c}
                    currentUser={user}
                    onReply={(id) => {
                      setReplyTo(id);
                      setIsModalOpen(true);
                    }}
                  />
                ))}
              </div>
              <CommentModal
                isOpen={isModalOpen}
                onClose={() => {
                  setIsModalOpen(false);
                  setReplyTo(null);
                }}
                partId={product.id}
                parentId={replyTo}
                refreshComments={fetchComments}
              />
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductDetailPage;
