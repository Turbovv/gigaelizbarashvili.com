"use client"
import { signIn, useSession } from "next-auth/react";
import SignOut from "./sign-out";

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
        >
          Sign in with GitHub
        </button>
      )}
    </div>
  );
}
