"use client";

import { deleteExpenses } from "@/actions/actions";

const handleClick = async (id: number) => {
  await deleteExpenses(id);
};

export default function Button({ id }: { id: number }) {
  return (
    <button
      className="text-[10px] h-[20px] w-[20px] bg-red-500 text-white rounded cursor-pointer hover:bg-red-600"
      onClick={() => handleClick(id)}
    >
      X
    </button>
  );
}