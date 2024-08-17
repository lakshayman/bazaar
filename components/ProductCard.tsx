"use client";

import Image from "next/image";
import { Product } from "../types";
import { useCart } from "../context/CartContext";
import { shimmer, toBase64 } from "../lib/productCard";

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const { addToCart } = useCart();

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
        <button
          onClick={() => addToCart(product)}
          className="mt-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors"
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
}
