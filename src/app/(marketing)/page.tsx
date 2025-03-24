import Image from "next/image";

export default function Home() {
  return (
    <div className="flex flex-col xl:flex-row items-center justify-center gap-30 bg-[#000] text-white min-h-screen">
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

        <div></div>
      </div>
    </div>
  );
}