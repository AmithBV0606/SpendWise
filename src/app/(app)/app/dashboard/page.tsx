import ExpensesForm from "@/components/expenses-form";
import ExpensesList from "@/components/expenses-list";
import { prisma } from "@/lib/db";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { redirect } from "next/navigation";

export type ExpensesListProps = {
  id: number;
  description: string;
  amount: number;
  createdAt: Date;
};

export default async function Page({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  // Authentication Check : User should only be able to get the list of expenses only when he/she is signedIn
  const { isAuthenticated, getUser } = getKindeServerSession();
  if (!(await isAuthenticated())) {
    return redirect("/api/auth/login");
  }

  // On Successful payment : 1. Stripe redirects to "/app/dashboard" (1 second) 2. Stripe sends a Webhook to our app (3 seconds). To avoid the race condition between these 2, we need to add artificial delay :
  const paymentValueFromUrl = (await searchParams).payment;
  if (paymentValueFromUrl === "success") {
    await new Promise((resolve) => setTimeout(resolve, 2000));
    return redirect("/app/dashboard");
  }

  // Authorization check : To know if the user is a premium mermber or not
  const user = await getUser();
  const membership = await prisma.membership?.findFirst({
    where: {
      userId: user.id,
    },
  });

  // If the user is not a premium member
  if (!membership || membership.status !== "active") {
    return redirect("/");
  }

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