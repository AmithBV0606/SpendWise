import { FaPencilAlt } from "react-icons/fa";

export default function UpdateButton() {
  return (
    <button className="bg-green-700 rounded p-1 cursor-pointer hover:bg-green-600">
      <FaPencilAlt size={20} className="text-gray-200" />
    </button>
  );
}