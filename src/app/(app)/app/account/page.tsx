import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { redirect } from "next/navigation";

export default async function Page() {
  // Authentication Check : User should only be able to view the account only when he/she is signedIn
  const { isAuthenticated } = getKindeServerSession();

  if (!(await isAuthenticated())) {
    return redirect("/api/auth/login");
  }

  return (
    <div className="text-center">
      <h1 className="text-3xl font-bold text-white">Account</h1>

      <p className="text-white mt-2">
        Logged in with email :{" "}
        <span className="font-bold">amithrao0606@gmail.com</span>
      </p>
    </div>
  );
}