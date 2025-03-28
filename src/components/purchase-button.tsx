"use client";

import { createCheckoutSession } from "@/actions/actions";

export default function PurchaseButton() {
  return (
    <button
      onClick={async () => {
        await createCheckoutSession();
      }}
      className="bg-black text-white py-2 px-4 rounded-md font-medium"
    >
      Purchase
    </button>
  );
}