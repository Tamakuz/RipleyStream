"use client";

import { signIn, signOut, useSession } from "next-auth/react";
import { NavbarButtonModal } from "./NavbarButtonModal";
import { NavbarButtonDropdown } from "./NavbarButtonDropdown";


export const NavbarButton = () => {
  const { data: session } = useSession();

  return (
    <>
      {session ? (
        <NavbarButtonDropdown image={session?.user?.image!} name={session?.user?.name!} signOut={signOut} />
      ) : (
        <NavbarButtonModal handleSignIn={signIn} />
      )}
    </>
  );
};
