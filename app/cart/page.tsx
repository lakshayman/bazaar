"use client";

import Navbar from "@/components/Navbar";
import CartItem from "../../components/CartItem";
import CartSummary from "../../components/CartSummary";
import { useCart } from "../../context/CartContext";
import React from "react";

export default function Cart() {
  const { cart } = useCart();

  return (
    <React.Fragment>
      <Navbar />
      <main className="max-w-7xl min-h-[100vh] mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold my-8">Your Cart</h1>
        {cart.length === 0 ? (
          <p>Your cart is empty.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="md:col-span-2 flex flex-col gap-2">
              {cart.map((item) => (
                <CartItem key={item.id} item={item} />
              ))}
            </div>
            <div className="md:col-span-1">
              <CartSummary />
            </div>
          </div>
        )}
      </main>
    </React.Fragment>
  );
}
