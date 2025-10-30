"use client";

import React, { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";

interface Product {
  id: number;
  name: string;
  price: number;
  image_urls?: string[];
  brand_name_fa?: string;
  car_name_fa?: string;
  part_code?: string;
}

interface Props {
  partCode: string;
}

const ProductsModal: React.FC<Props> = ({ partCode }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchProducts = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/code", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ codes: [partCode] }),
      });

      if (!res.ok) throw new Error("خطا در دریافت داده‌ها");

      const data = await res.json();
      setProducts(data.results || []);
    } catch (err: any) {
      console.error(err);
      setError(err.message || "خطا در دریافت داده‌ها");
    } finally {
      setLoading(false);
    }
  };

  const openModal = async () => {
    setIsOpen(true);
    await fetchProducts();
  };

  return (
    <>
      <button
        onClick={openModal}
        className="px-5 py-2 bg-gradient-to-r from-[#006FB4] to-[#004D7A] text-white font-yekanBold rounded-lg shadow hover:shadow-lg transition"
      >
        مشاهده محصولات
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            {/* پس‌زمینه بلور */}
            <div
              className="absolute inset-0 bg-white/30 backdrop-blur-sm"
              onClick={() => setIsOpen(false)}
            />

            <motion.div
              className="relative bg-white rounded-3xl w-full max-w-4xl max-h-[90vh] overflow-y-auto p-6 shadow-xl"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ type: "spring", stiffness: 300, damping: 25 }}
            >
              <button
                onClick={() => setIsOpen(false)}
                className="absolute top-5 right-5 text-gray-500 hover:text-gray-700 text-lg font-yekanBold"
              >
                ✕
              </button>

              <h2 className="text-2xl font-yekanExtraBold mb-6 text-[#004D7A] text-center">
                محصولات مرتبط با کد {partCode}
              </h2>

              {loading && (
                <div className="flex items-center justify-center py-16">
                  <div className="w-12 h-12 border-4 border-blue-500 border-dashed rounded-full animate-spin"></div>
                </div>
              )}

              {error && (
                <p className="text-red-500 text-center text-sm mb-4">{error}</p>
              )}

              {!loading && !error && products.length === 0 && (
                <p className="text-center text-gray-500 mb-4">
                  محصولی یافت نشد.
                </p>
              )}

              {!loading && !error && products.length > 0 && (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  {products.map((prod) => (
                    <div
                      key={prod.id}
                      className="border rounded-2xl p-4 flex flex-col gap-3 shadow-md hover:shadow-lg transition-all duration-300"
                    >
                      <div className="w-full h-48 relative rounded-xl overflow-hidden bg-gray-50">
                        <Image
                          src={prod.image_urls?.[0] || "/no-image.svg"}
                          alt={prod.name}
                          fill
                          className="object-contain p-2"
                        />
                      </div>
                      <div className="flex flex-col gap-1">
                        <p className="font-yekanDemiBold text-[#004D7A] text-sm">
                          {prod.name}
                        </p>
                        <p className="font-yekanRegular text-gray-600 text-xs">
                          برند: {prod.brand_name_fa || "-"}
                        </p>
                        <p className="font-yekanRegular text-gray-600 text-xs">
                          خودرو: {prod.car_name_fa || "-"}
                        </p>
                        <p className="font-yekanExtraBold text-[#004D7A] text-base mt-1">
                          {prod.price?.toLocaleString() || "-"} تومان
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default ProductsModal;
