import { ExpensesListProps } from "@/app/(app)/app/dashboard/page";
import Button from "./delete-button";

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
    <ul className="h-[500px] bg-white rounded mt-4 shadow-md px-2">
      {expenses.map((expense) => (
        <li
          className="px-4 py-3 border-b border-black/10 flex items-center"
          key={expense.id}
        >
          <p>{expense.description}</p>
          <p className="ml-auto font-bold mr-[15px]">${expense.amount}</p>
          {/* <button className="text-[10px] h-[20px] w-[20px] bg-red-500 text-white rounded cursor-pointer hover:bg-red-600">
            X
          </button> */}
          <Button id={expense.id} />
        </li>
      ))}
    </ul>
  );
}