import React from "react";
import { Navbar } from "../components/navbar/Navbar";
import { Sidebar } from "../components/sidebar/Sidebar";

export const RootLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <Navbar />
      <main className="container mx-auto grid grid-cols-12 gap-4">
        <Sidebar />
        <section className="col-span-9">{children}</section>
      </main>
    </>
  );
};
