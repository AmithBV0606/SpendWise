"use server";

import { prisma } from "@/lib/db";

export async function addExpenses(formData: FormData) {
  await prisma.expense.create({
    data: {
      description: formData.get("description") as string,
      amount: Number(formData.get("amount")),
    },
  });
  //   We're getting description as a string because we previously set "name" attribute in the input.
}