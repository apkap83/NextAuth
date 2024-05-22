"use client";

import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";

const Member = () => {
  const { data: session } = useSession({
    required: true,
    onUnauthenticated() {
      redirect("/api/auth/signin?callbackUrl=/ClientMember");
    },
  });
  return (
    <div>
      <h1>Member Client Session</h1>
      <p>{session?.user?.email}</p>
      <p>{session?.user?.roles.join(", ")}</p>
      <p>{session?.user?.permissions.join(", ")}</p>
    </div>
  );
};

export default Member;
