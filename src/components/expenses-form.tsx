import { addExpenses } from "@/actions/actions";

export default function ExpensesForm() {
  return (
    <form action={addExpenses} className="w-full mt-8 rounded-lg overflow-hidden">
      <input
        type="text"
        placeholder="Description"
        name="description"
        className="w-full px-3 py-2 outline-none bg-white"
        required
      />

      <input
        type="number"
        placeholder="Amount"
        name="amount"
        className="w-full px-3 py-2 outline-none bg-white"
        step={0.01}
        required
      />

      <button className="w-full bg-sky-600 hover:bg-sky-500 text-white px-2 py-2 font-bold cursor-pointer">
        Add Expense
      </button>
    </form>
  );
}