import { ExpensesListProps } from "@/app/(app)/app/dashboard/page";

export default function TotalExpenses({
  expenses,
}: {
  expenses: ExpensesListProps[];
}) {
  return (
    <div className="bg-white h-auto w-auto rounded-lg mt-6 shadow-md px-2">
      <p className="p-3 text-lg tracking-wide font-semibold">
        Expense Items : {expenses.length}
      </p>

      <h2 className="text-2xl font-bold p-3 border-t-2 border-gray-200">Total Expenses : ${expenses.reduce((acc, curr) => acc + curr.amount, 0)}</h2>
    </div>
  );
}