"use client";

import { signOut } from "next-auth/react";

export default function SignOutButton() {
  const handleSignOut = async () => {
    await signOut();
  };

  return <button onClick={handleSignOut}>Sign Out</button>;
}
