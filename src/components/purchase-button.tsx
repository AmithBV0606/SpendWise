"use client";

import { createCheckoutSession } from "@/actions/actions";

export default function PurchaseButton() {
  return (
    <button
      onClick={async () => {
        await createCheckoutSession();
      }}
      className="bg-sky-600 hover:bg-sky-500 text-white py-3 px-4 rounded-lg font-medium cursor-pointer"
    >
      Purchase
    </button>
  );
}