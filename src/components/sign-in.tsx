"use client"
import { signIn, useSession } from "next-auth/react";
import SignOut from "./sign-out";
import { Github } from "lucide-react";

export default function SignIn() {
  const { data: session } = useSession();

  return (
    <div>
      {session ? (
        <>
         <SignOut />
        </>
      ) : (
        <button
        onClick={() =>
          signIn("github")
        }
        className="flex items-center gap-2 max-lg:w-full max-lg:justify-center max-lg:bg-gray-400 max-lg:text-black"
        style={{  fontFamily: "'Fira Code', monospace",}}
        >
        <Github className="w-4 fill-gray-400"  />
        SignIn
        </button>
      )}
    </div>
  );
}
