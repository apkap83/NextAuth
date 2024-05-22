import { getServerSession } from "next-auth";
import { options } from "../api/auth/[...nextauth]/options";
import { redirect } from "next/navigation";
import { sequelize } from "../(db)";

const Member = async () => {
  const session = await getServerSession(options);

  const {
    models: { AppUser },
  } = sequelize;

  if (!session) {
    redirect("/api/auth/signin?callbackUrl=/Member");
  }

  return (
    <div>
      <h1>Member Server Session</h1>
      <p>{session?.user?.email}</p>
      <p>{session?.user?.roles.join(", ")}</p>
      <p>{session?.user?.permissions.join(", ")}</p>
    </div>
  );
};

export default Member;
