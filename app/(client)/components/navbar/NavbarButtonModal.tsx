"use client";

import { FcGoogle } from "react-icons/fc";
import { FaGithub } from "react-icons/fa";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useState } from "react";
import { Button } from "@/components/ui/button";

import { BuiltInProviderType } from "next-auth/providers/index";

interface NavbarButtonModalProps {
  handleSignIn: (provider: BuiltInProviderType) => void;
}

export const NavbarButtonModal = ({ handleSignIn }: NavbarButtonModalProps) => {
  const [open, setOpen] = useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <button
          className="group relative isolate py-2 flex items-center justify-center overflow-hidden text-sm font-medium transition duration-300 ease-[cubic-bezier(0.4,0.36,0,1)] before:duration-300 before:ease-[cubic-bezier(0.4,0.36,0,1)] before:transition-opacity rounded-md px-3 shadow-[0_1px_theme(colors.white/0.07)_inset,0_1px_3px_theme(colors.gray.900/0.2)] before:pointer-events-none before:absolute before:inset-0 before:-z-10 before:rounded-md before:bg-gradient-to-b before:from-white/20 before:opacity-50 hover:before:opacity-100 after:pointer-events-none after:absolute after:inset-0 after:-z-10 after:rounded-md after:bg-gradient-to-b after:from-white/10 after:from-[46%] after:to-[54%] after:mix-blend-overlay ring-1 bg-gray-900 text-white ring-gray-900"
        >
          Login For Access
        </button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="text-center text-2xl font-bold">
            Sign In
          </DialogTitle>
        </DialogHeader>
        <div className="flex flex-col space-y-4 py-4">
          <Button
            variant="outline"
            className="flex items-center justify-center space-x-2"
            onClick={async () => {
              await handleSignIn("google");
              setOpen(false);
            }}
          >
            <FcGoogle className="h-5 w-5" />
            <span>Sign in with Google</span>
          </Button>
          <Button
            variant="outline"
            className="flex items-center justify-center space-x-2"
            onClick={async () => {
              await handleSignIn("github");
              setOpen(false);
            }}
          >
            <FaGithub className="h-5 w-5" />
            <span>Sign in with GitHub</span>
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};
