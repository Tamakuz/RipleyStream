"use client";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { NavbarButton } from "./NavbarButton";
import { NavbarToggleTheme } from "./NavbarToggleTheme";
import { NavbarGithub } from "./NavbarGithub";
import { cn } from "@/lib/utils";

export const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={cn(
        "fixed w-full top-0 z-50",
        isScrolled && "backdrop-blur-sm shadow-md"
      )}
    >
      <div className="container mx-auto py-3">
        <div className="flex justify-between items-center">
          <Image
            src="https://img.logoipsum.com/281.svg"
            alt="logo"
            width={40}
            height={40}
          />
          <div className="flex items-center gap-2">
            <NavbarGithub />
            <NavbarToggleTheme />
            <NavbarButton />
          </div>
        </div>
      </div>
    </nav>
  );
};
