import { prisma } from "@/lib/db";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { redirect } from "next/navigation";

export default async function Page() {
  // Authentication Check : User should only be able to view the account only when he/she is signedIn
  const { isAuthenticated, getUser } = getKindeServerSession();

  if (!(await isAuthenticated())) {
    return redirect("/api/auth/login");
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

  return (
    <div className="text-center">
      <h1 className="text-3xl font-bold text-white">Account</h1>

      <p className="text-white mt-2">
        Logged in with email : <span className="font-bold">{user.email}</span>
      </p>
    </div>
  );
}
