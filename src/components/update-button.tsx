"use client";

import { FaPencilAlt } from "react-icons/fa";
import UpdateModal from "./update-modal";
import { useState } from "react";

export default function UpdateButton({ id }: { id: number }) {
  const [update, setUpdate] = useState(false);
  console.log("ID : ", id);

  return (
    <button className="bg-green-700 rounded p-1 cursor-pointer hover:bg-green-600">
      <FaPencilAlt
        size={20}
        className="text-gray-200"
        onClick={() => setUpdate((prev) => !prev)}
      />

      {update && <UpdateModal id={id} />}
    </button>
  );
}