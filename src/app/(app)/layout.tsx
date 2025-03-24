import BackgroundPattern from "@/components/background-pattern";
import React from "react";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <BackgroundPattern />
      {children}
    </>
  );
}