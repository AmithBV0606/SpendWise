import ExpensesForm from "@/components/expenses-form";
import ExpensesList from "@/components/expenses-list";
import { prisma } from "@/lib/db";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { redirect } from "next/navigation";

export type ExpensesListProps = {
  id: number;
  description: String;
  amount: number;
  createdAt: Date;
};

export default async function Page() {
  // Authentication Check : User should only be able to get the list of expenses only when he/she is signedIn
  const { isAuthenticated, getUser } = getKindeServerSession();

  if (!(await isAuthenticated())) {
    return redirect("/api/auth/login");
  }

  const user = await getUser();

  const expenses: ExpensesListProps[] = await prisma.expense.findMany({
    where: {
      creatorId: user.id,
    },
  });

  return (
    <div>
      <h1 className="text-3xl font-bold text-white text-center">Dashboard</h1>

      <div className="w-full max-w-[600px] mx-auto">
        <ExpensesList expenses={expenses} />

        <ExpensesForm />
      </div>
    </div>
  );
}