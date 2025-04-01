import { ExpensesListProps } from "@/app/(app)/app/dashboard/page";
import DeleteButton from "./delete-button";
import UpdateButton from "./update-button";

export default function ExpensesList({
  expenses,
}: {
  expenses: ExpensesListProps[];
}) {
  if (expenses.length === 0) {
    return (
      <div className="h-[500px] bg-white rounded mt-4 shadow-md px-2 flex flex-col justify-center items-center">
        <h1 className="text-2xl font-bold">No expenses found!</h1>
        <p className="text-xs font-light text-gray-500">
          Add new expense to the list.
        </p>
      </div>
    );
  }

  return (
    <ul className="h-[500px] bg-white rounded-lg mt-6 shadow-md px-2 overflow-y-scroll">
      {expenses.map((expense) => (
        <li
          className="px-4 py-3 border-b border-black/10 flex items-center justify-between"
          key={expense.id}
        >
          <p>{expense.description}</p>

          <div className="flex items-center gap-3">
            <p className="ml-auto font-bold">${expense.amount}</p>
            <UpdateButton id={expense.id} />
            <DeleteButton id={expense.id} />
          </div>
        </li>
      ))}
    </ul>
  );
}