const expenses = [
  { id: "e1", description: "Car insurance", amount: 250 },
  { id: "e2", description: "Bike insurance", amount: 50 },
  { id: "e3", description: "Iphone", amount: 1000 },
];

export default function ExpensesList() {
  return (
    <ul className="h-[600px] bg-white rounded mt-4 shadow-md">
      {expenses.map((expense) => (
        <li
          className="px-4 py-2 border-b mx-2 border-black/10 flex items-center"
          key={expense.id}
        >
          <p>{expense.description}</p>
          <p className="ml-auto font-bold mr-[15px]">${expense.amount}</p>
          <button className="text-[10px] h-[20px] w-[20px] bg-red-500 text-white rounded cursor-pointer hover:bg-red-600">
            X
          </button>
        </li>
      ))}
    </ul>
  );
}