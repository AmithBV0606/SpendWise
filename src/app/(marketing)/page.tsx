import PurchaseButton from "@/components/purchase-button";
import { prisma } from "@/lib/db";
import {
  getKindeServerSession,
  LoginLink,
  RegisterLink,
} from "@kinde-oss/kinde-auth-nextjs/server";
import Image from "next/image";
import Link from "next/link";
// import { redirect } from "next/navigation";

export default async function Home() {
  const { isAuthenticated, getUser } = getKindeServerSession();

  // Wrote this code earlier to prevent the user from going to home/landing page once after they're logged in. Now there's a change in plan, I need to show the payment button to the loggedin users on the home page.
  // if (await isAuthenticated()) {
  //   return redirect("/app/dashboard");
  // }

  const isLoggedIn = await isAuthenticated();

  // To disable or change the purchase button after the user has purchased
  let isPayingMember = false;
  const user = await getUser();
  if (user) {
    const membership = await prisma.membership.findFirst({
      where: {
        userId: user.id,
        status: "active",
      },
    });
    if (membership) {
      isPayingMember = true;
    }
  }

  return (
    <div className="flex flex-col xl:flex-row items-center justify-center gap-10 xl:gap-20 min-h-screen bg-[radial-gradient(circle_710px_at_5.2%_7.2%,_rgba(37,89,222,1)_0%,_rgba(37,89,222,1)_7.5%,_rgba(4,4,29,1)_44.7%)]">
      {/* App preview image : */}
      {/* <div className="rounded-2xl border-t-4 border-sky-600 hover:rotate-6">
        <Image
          src={"/AppPreview.png"}
          alt="SpendWise app preview"
          width={700}
          height={472}
          className="rounded-2xl h-[250px] w-[350px] md:h-[400px] md:w-[600px] lg:h-[500px] lg:w-[800px]"
        />
      </div> */}

      {/* Alternative */}
      <div className="card-wrapper rounded-2xl h-[250px] w-[350px] md:h-[400px] md:w-[600px] lg:h-[500px] lg:w-[800px] hover:rotate-6">
        <div className="card-content flex items-center justify-center text-xs">
          <Image
            src={"/AppPreview.png"}
            alt="SpendWise app preview"
            width={700}
            height={472}
            className="rounded-2xl w-[100%] h-[100%]"
          />
        </div>
      </div>

      <div className="text-center xl:text-left">
        <h1 className="text-5xl text-sky-600 font-semibold my-6 max-w-[500px]">
          Track your <span className="font-extrabold">expenses</span> with ease
        </h1>

        <p className="text-2xl font-medium max-w-[600px] text-gray-600 space-y-2">
          Use SpendWise to easily keep track of your expenses. Get lifetime
          access for{" "}
          <span className="px-2 py-1 bg-sky-500 rounded-lg text-black">
            $4.99
          </span>
        </p>

        <div className="mt-10 space-x-3">
          {!isLoggedIn ? (
            <>
              <LoginLink className="bg-sky-600 hover:bg-sky-500 text-white py-2 px-4 rounded-md font-medium">
                Login
              </LoginLink>

              <RegisterLink className="bg-white/20 hover:bg-white/15 text-white py-2 px-4 rounded-md font-medium">
                Register
              </RegisterLink>
            </>
          ) : !isPayingMember ? (
            <>
              <PurchaseButton />
            </>
          ) : (
            <Link
              href={"/app/dashboard"}
              className="bg-sky-600 hover:bg-sky-500 text-white py-3 px-4 rounded-lg font-medium cursor-pointer"
            >
              Go to dashboard
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}