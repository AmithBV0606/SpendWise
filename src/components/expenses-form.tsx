export default function ExpensesForm() {
  return (
    <form className="w-full mt-8 rounded overflow-hidden">
      <input
        type="text"
        placeholder="Description"
        name="description"
        className="w-full px-3 py-2 outline-none bg-white"
      />

      <input
        type="number"
        placeholder="Amount"
        name="amount"
        className="w-full px-3 py-2 outline-none bg-white"
      />

      <button className="w-full bg-blue-500 text-white px-2 py-2 font-bold">Add Expense</button>
    </form>
  );
}