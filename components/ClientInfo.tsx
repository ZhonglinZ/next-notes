"use client";
import { useSession } from "next-auth/react";

export default function ClientInfo() {
  const { data: session, status } = useSession();
  return (
    <div>
      {" "}
      {status === "loading" ? (
        "Loading..."
      ) : (
        <pre>{JSON.stringify(session, null, 2)}</pre>
      )}
    </div>
  );
}
