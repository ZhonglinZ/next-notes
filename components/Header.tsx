import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { getServerSession } from "next-auth";
import SignOutButton from "./SignOutButton";
import SignInButton from "./SignInButton";
import Link from "next/link";

export default async function Header() {
  const session = await getServerSession(authOptions);
  return (
    <header style={{ display: "flex", justifyContent: "space-around" }}>
      {session?.user ? (
        <span style={{ display: "flex", alignItems: "center" }}>
          {session?.user.name}
          <SignOutButton />
        </span>
      ) : (
        <SignInButton />
      )}
      <Link href="/client">Client Info</Link>
    </header>
  );
}
