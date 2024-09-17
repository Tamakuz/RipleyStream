"use client";
import React, { useEffect, useState } from "react";
import { Navbar } from "../components/navbar/Navbar";
import { Sidebar } from "../components/sidebar/Sidebar";

export const RootLayout = ({ children }: { children: React.ReactNode }) => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };

    window.addEventListener("scroll", handleScroll);
  }, []);
  return (
    <>
      <Navbar />
      <main className="container mx-auto grid grid-cols-12 gap-4 mt-[70px]">
        <Sidebar />
        <section className="col-span-12 md:col-span-9">{children}</section>
      </main>
    </>
  );
};
