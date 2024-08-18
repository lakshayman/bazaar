"use client";

import { useEffect } from "react";
import Link from "next/link";
import { useCart } from "../../context/CartContext";

export default function ThankYou() {
  const { clearCart } = useCart();

  useEffect(() => {
    clearCart();
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900">
      <div className="bg-gray-800 p-8 rounded-lg shadow-md max-w-md w-full text-center">
        <h1 className="text-3xl font-bold mb-4 text-white">
          Thank You for Your Order!
        </h1>
        <p className="text-xl mb-6 text-gray-300">
          Your order has been successfully placed.
        </p>
        <p className="text-gray-400 mb-8">
          We've sent a confirmation email with your order details.
        </p>
        <Link
          href="/"
          className="block w-full bg-green-600 text-white py-2 px-4 rounded hover:bg-green-700 transition-colors"
        >
          Continue Shopping
        </Link>
      </div>
    </div>
  );
}
