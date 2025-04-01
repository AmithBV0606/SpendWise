"use server";

import { prisma } from "@/lib/db";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import Stripe from "stripe";

// Create operation :
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

// Read operation :
export async function getExpense(id: number) {
  // Make sure the user is authenticated before adding expenses into the database
  const { isAuthenticated } = getKindeServerSession();

  if (!(await isAuthenticated())) {
    return redirect("/api/auth/login");
  }

  const expense = await prisma.expense.findFirst({
    where: {
      id: id,
    },
  });

  if (!expense) {
    // return revalidatePath("/app/dashboard");
    return {
      id: 0,
      description: "",
      amount: 0,
      creatorId: "",
      createdAt: new Date(),
    };
  }

  return expense;
}

// Update operation :
export async function updateExpenses(
  id: number,
  newDescription: string,
  newAmount: string
) {
  // Make sure the user is authenticated before adding expenses into the database
  const { isAuthenticated } = getKindeServerSession();

  if (!(await isAuthenticated())) {
    return redirect("/api/auth/login");
  }

  await prisma.expense.update({
    where: {
      id: id,
    },
    data: {
      description: newDescription,
      amount: parseFloat(newAmount),
    },
  });

  revalidatePath("/app/dashboard");
}

// Delete Operation :
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

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2025-02-24.acacia",
});

// To create a session for checkout
export async function createCheckoutSession() {
  const { isAuthenticated, getUser } = getKindeServerSession();
  if (!(await isAuthenticated())) {
    return redirect("/api/auth/login");
  }

  const user = await getUser();

  const session = await stripe.checkout.sessions.create({
    customer_email: user.email!,
    client_reference_id: user.id,
    line_items: [
      {
        price: "price_1R7FIjC9hYStAMMZRyuKeTap",
        quantity: 1,
      },
    ],
    mode: "payment",
    success_url: `${process.env.CANONICAL_URL}/app/dashboard?payment=success`,
    cancel_url: `${process.env.CANONICAL_URL}`,
  });

  redirect(session.url!);
}