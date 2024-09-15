import Image from "next/image";
import React from "react";
import { NavbarButton } from "./NavbarButton";
import { NavbarToggleTheme } from "./NavbarToggleTheme";
import { NavbarGithub } from "./NavbarGithub";

export const Navbar = () => {
  return (
    <nav className="sticky top-0 left-0 right-0 z-[999]">
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
