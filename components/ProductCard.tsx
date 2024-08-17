"use client";

import Image from "next/image";
import { Product } from "../types";

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const shimmer = (w: number, h: number) => `
    <svg width="${w}" height="${h}" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
    <defs>
        <linearGradient id="g">
        <stop stop-color="#1f2937" offset="20%" />
        <stop stop-color="#171e29" offset="50%" />
        <stop stop-color="#1f2937" offset="70%" />
        </linearGradient>
    </defs>
    <rect width="${w}" height="${h}" fill="#1f2937" />
    <rect id="r" width="${w}" height="${h}" fill="url(#g)" />
    <animate xlink:href="#r" attributeName="x" from="-${w}" to="${w}" dur="1s" repeatCount="indefinite"  />
    </svg>`;

  const toBase64 = (str: string) =>
    typeof window === "undefined"
      ? Buffer.from(str).toString("base64")
      : window.btoa(str);

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
        <button className="mt-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors">
          Add to Cart
        </button>
      </div>
    </div>
  );
}
