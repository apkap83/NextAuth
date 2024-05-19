import { getServerSession } from "next-auth";
import { options } from "../api/auth/[...nextauth]/options";
import { redirect } from "next/navigation";
import { sequelize } from "../(db)";

const Member = async () => {
  const session = await getServerSession(options);

  console.log("seq", sequelize.models);
  const {
    models: { AppUser },
  } = sequelize;

  console.log(await AppUser.findOne());

  if (!session) {
    redirect("/api/auth/signin?callbackUrl=/Member");
  }
  return (
    <div>
      <h1>Member Server Session</h1>
      <p>{session?.user?.email}</p>
      <p>{session?.user?.role}</p>
    </div>
  );
};

export default Member;
