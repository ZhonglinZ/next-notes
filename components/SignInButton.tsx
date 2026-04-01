"use client";

import { signIn } from "next-auth/react";

export default function SignInButton({ provider = "github" }) {
  const handleSignIn = async () => {
    console.log("Signing in with:", provider);
    try {
      await signIn(provider, { callbackUrl: "/" });
    } catch (error) {
      console.error("Sign in error:", error);
    }
  };

  return <button onClick={handleSignIn}>Sign In</button>;
}
