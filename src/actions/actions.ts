"use server";

import { prisma } from "@/lib/db";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

// Create operation
export async function addExpenses(formData: FormData) {
  // Make sure the user is authenticated before adding expenses into the database
  const { isAuthenticated, getUser } = getKindeServerSession();

  if (!(await isAuthenticated())) {
    return redirect("/api/auth/login");
  }

  const user = await getUser();

  await prisma.expense.create({
    data: {
      description: formData.get("description") as string,
      amount: parseFloat(formData.get("amount") as string),
      creatorId: user.id,
    },
  });
  //   We're getting description as a string because we previously set "name" attribute in the input.

  revalidatePath("/app/dashboard");
}

// Delete Operation
export async function deleteExpenses(id: number) {
  // Make sure the user is authenticated before deleting the expenses from the database
  const { isAuthenticated } = getKindeServerSession();

  if (!(await isAuthenticated())) {
    return redirect("/api/auth/login");
  }

  await prisma.expense.delete({
    where: {
      id: id,
    },
  });

  revalidatePath("/app/dashboard");
}