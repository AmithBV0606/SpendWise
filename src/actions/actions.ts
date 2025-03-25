"use server";

import { prisma } from "@/lib/db";
import { revalidatePath } from "next/cache";

// Create operation
export async function addExpenses(formData: FormData) {
  await prisma.expense.create({
    data: {
      description: formData.get("description") as string,
      amount: parseFloat(formData.get("amount") as string),
    },
  });
  //   We're getting description as a string because we previously set "name" attribute in the input.

  revalidatePath("/app/dashboard");
}

// Delete Operation
export async function deleteExpenses(id: number) {
  await prisma.expense.delete({
    where: {
      id: id,
    },
  });

  revalidatePath("/app/dashboard");
}
