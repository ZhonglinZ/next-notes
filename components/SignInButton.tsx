"use client";

import { signIn } from "next-auth/react";

export default function SignInButton() {
  const handleSignIn = async () => {
    console.log("Redirecting to sign in page");
    try {
      // Redirect to the default sign-in page where all providers are shown
      await signIn(undefined, { callbackUrl: "/" });
    } catch (error) {
      console.error("Sign in error:", error);
    }
  };

  return <button onClick={handleSignIn}>Sign In</button>;
}
