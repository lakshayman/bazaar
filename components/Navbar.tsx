"use client";
import { useCart } from "@/context/CartContext";
import { calculateCartItemsCount } from "@/lib/cart";
import Link from "next/link";

export default function Navbar() {
  const { cart } = useCart();
  const itemCount = calculateCartItemsCount(cart);
  return (
    <nav className="bg-white text-black shadow-xl py-4 px-6">
      <div className="max-w-[100rem] mx-auto flex justify-between items-center">
        <Link href="/" className="text-xl font-bold">
          Bazaar
        </Link>
        <Link href="/cart" className="flex items-center">
          <img src="/cart.png" width={30} />
          {!!itemCount && (
            <span className="ml-2 text-red-600 font-bold">{itemCount}</span>
          )}
        </Link>
      </div>
    </nav>
  );
}
