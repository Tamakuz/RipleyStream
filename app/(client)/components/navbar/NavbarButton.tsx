import { currentUser } from "@clerk/nextjs/server";
import { SignOutButton, SignInButton } from "@clerk/nextjs";
import Link from "next/link";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export const NavbarButton = async () => {
  const user = await currentUser()
  console.log({ user })

  return (
    <>
      {user ? (
        <SignOutButton>
          <Avatar>
            <AvatarImage src={user.imageUrl} alt={user.fullName || ""} />
            <AvatarFallback>{user.fullName}</AvatarFallback>
          </Avatar>
        </SignOutButton>
      ) : (
        <Link
          href="/sign-in"
          className="group relative isolate py-2 flex items-center justify-center overflow-hidden text-sm font-medium transition duration-300 ease-[cubic-bezier(0.4,0.36,0,1)] before:duration-300 before:ease-[cubic-bezier(0.4,0.36,0,1)] before:transtion-opacity rounded-md px-3 shadow-[0_1px_theme(colors.white/0.07)_inset,0_1px_3px_theme(colors.gray.900/0.2)] before:pointer-events-none before:absolute before:inset-0 before:-z-10 before:rounded-md before:bg-gradient-to-b before:from-white/20 before:opacity-50 hover:before:opacity-100 after:pointer-events-none after:absolute after:inset-0 after:-z-10 after:rounded-md after:bg-gradient-to-b after:from-white/10 after:from-[46%] after:to-[54%] after:mix-blend-overlay ring-1 bg-gray-900 text-white ring-gray-900"
        >
          Login For Access
        </Link>
      )}
    </>
  );
};
