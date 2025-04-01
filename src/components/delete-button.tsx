"use client";

import { deleteExpenses } from "@/actions/actions";
import { MdOutlineDelete } from "react-icons/md";

const handleClick = async (id: number) => {
  await deleteExpenses(id);
};

export default function DeleteButton({ id }: { id: number }) {
  return (
    <button
      className="bg-red-600 rounded p-1 cursor-pointer hover:bg-red-500 text-center"
      onClick={() => handleClick(id)}
    >
      <MdOutlineDelete size={20} className="text-gray-200" />
    </button>
  );
}