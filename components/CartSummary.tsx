"use client";

import { useState } from "react";
import { useCart } from "../context/CartContext";
import { calculateCartTotal } from "../lib/cart";

export default function CartSummary() {
  const { cart } = useCart();
  const [discountCode, setDiscountCode] = useState("");
  const [appliedDiscount, setAppliedDiscount] = useState(0);

  const discountCodes: any = {
    SAVE10: 0.1,
    SAVE20: 0.2,
    FREESHIP: 5
  };

  const subtotal = calculateCartTotal(cart);
  const total = subtotal - appliedDiscount;

  const applyDiscount = () => {
    if (discountCode in discountCodes) {
      const discount = discountCodes[discountCode];
      if (typeof discount === "number") {
        if (discount < 1) {
          setAppliedDiscount(subtotal * discount);
        } else {
          setAppliedDiscount(discount);
        }
      }
    } else {
      alert("Invalid discount code");
    }
  };

  return (
    <div className="bg-gray-100 p-4 rounded shadow-2xl">
      <h2 className="text-xl font-semibold mb-4 text-black">Cart Summary</h2>
      <div className="flex justify-between mb-2 text-black">
        <span>Subtotal:</span>
        <span>${subtotal.toFixed(2)}</span>
      </div>
      <div className="flex justify-between mb-2 text-black">
        <span>Discount:</span>
        <span>-${appliedDiscount.toFixed(2)}</span>
      </div>
      <div className="flex justify-between font-bold mb-4 text-black">
        <span>Total:</span>
        <span>${total.toFixed(2)}</span>
      </div>
      <div className="mb-4 text-black">
        <input
          type="text"
          value={discountCode}
          onChange={(e) => setDiscountCode(e.target.value)}
          placeholder="Enter discount code"
          className="w-full p-2 border rounded"
        />
        <button
          onClick={applyDiscount}
          className="w-full mt-2 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors"
        >
          Apply Discount
        </button>
      </div>
      <div className="mb-4 text-black">
        <h3 className="text-md font-semibold mb-2">
          Suggested Discount Codes:
        </h3>
        <ul>
          {Object.keys(discountCodes).map((code) => (
            <li key={code} className="mb-1 text-end pr-2">
              <button
                onClick={() => setDiscountCode(code)}
                className="text-blue-600 underline hover:text-blue-800"
              >
                {code}
              </button>
            </li>
          ))}
        </ul>
      </div>
      <button className="w-full bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition-colors">
        Proceed to Checkout
      </button>
    </div>
  );
}
