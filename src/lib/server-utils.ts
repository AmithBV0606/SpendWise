import "server-only";

import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { redirect } from "next/navigation";
import { prisma } from "./db";

export async function checkAuthenticationAndMembership(waitMs = 0) {
  const { isAuthenticated, getUser } = getKindeServerSession();
  if (!(await isAuthenticated())) {
    return redirect("/api/auth/login");
  }

  // Authorization check
  const user = await getUser();
  await new Promise((resolve) => setTimeout(resolve, waitMs));
  const membership = await prisma.membership?.findFirst({
    where: {
      userId: user.id,
    },
  });
  if (!membership || membership.status !== "active") {
    return redirect("/");
  }

  return user;
}

// This function can be used in server actions and components, but for the time being I won't use it becasue I have understood the code base as it was. This function is just clean up for the messy code written.