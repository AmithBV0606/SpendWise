import { LoginLink, RegisterLink } from "@kinde-oss/kinde-auth-nextjs/server";
import Image from "next/image";

export default function Home() {
  return (
    <div className="flex flex-col xl:flex-row items-center justify-center gap-30 bg-[#5DC9A8] min-h-screen">
      <Image
        src={
          "https://bytegrad.com/course-assets/youtube/expensestracker/preview.png"
        }
        alt="SpendWise app preview"
        width={700}
        height={472}
        className="rounded-md"
      />

      <div>
        <h1 className="text-5xl font-semibold my-6 max-w-[500px]">
          Track your <span className="font-extrabold">expenses</span> with ease
        </h1>

        <p className="text-2xl font-medium max-w-[600px]">
          Use SpendWise to easily keep track of your expenses. Get lifetime
          access for $4.99
        </p>

        <div className="mt-10 space-x-3">
          <LoginLink className="bg-black text-white py-2 px-4 rounded-md font-medium">
            Login
          </LoginLink>

          <RegisterLink className="bg-black/50 text-white py-2 px-4 rounded-md font-medium">
            Register
          </RegisterLink>
        </div>
      </div>
    </div>
  );
}