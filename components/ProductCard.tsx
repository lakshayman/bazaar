"use client";

import Image from "next/image";
import { ProductCardProps } from "../types";
import { useCart } from "../context/CartContext";
import { shimmer, toBase64 } from "../lib/productCard";
import { getItem } from "@/lib/cart";

export default function ProductCard({ product }: ProductCardProps) {
  const { addToCart, updateQuantity, cart, removeFromCart } = useCart();
  const item = getItem(cart, product.id);

  return (
    <div className="max-w-sm border rounded-lg shadow bg-gray-800 border-gray-700 flex flex-col justify-between">
      <Image
        className="rounded-t-lg m-auto"
        src={product.thumbnail}
        alt={product.title}
        width={300}
        height={300}
        placeholder={`data:image/svg+xml;base64,${toBase64(shimmer(300, 300))}`}
      />
      <div className="p-5">
        <h5 className="mb-2 text-2xl font-bold tracking-tight text-white">
          {product.title}
        </h5>
        <p className="mb-3 font-normal text-gray-400">{product.description}</p>
        {!!item ? (
          <div className="flex gap-2 mt-4 items-center">
            <button
              onClick={() =>
                item.quantity === 1
                  ? removeFromCart(product.id)
                  : updateQuantity(item.id, item.quantity - 1)
              }
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors"
            >
              -
            </button>
            <div className="text-white font-bold">{item.quantity}</div>
            <button
              onClick={() => updateQuantity(item.id, item.quantity + 1)}
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors"
            >
              +
            </button>
          </div>
        ) : (
          <button
            onClick={() => addToCart(product)}
            className="mt-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors"
          >
            Add to Cart
          </button>
        )}
      </div>
    </div>
  );
}
