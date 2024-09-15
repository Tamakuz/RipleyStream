import React from 'react';
import { Github } from "lucide-react";

export const NavbarGithub = () => {
  return (
    <a
      href="https://github.com/Tamakuz"
      target="_blank"
      rel="noopener noreferrer"
      className="py-2 rounded-md focus:outline-none"
    >
      <Github className="w-5 h-5" />
    </a>
  );
}
