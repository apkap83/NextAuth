import Link from "next/link";
import { getServerSession } from "next-auth";
import { options } from "../api/auth/[...nextauth]/options";
import { AppRoleTypes } from "@/lib/definitions";

const NavLinks = ({ isUserAdmin, session }) => {
  return (
    <>
      <Link href="/">Home</Link>
      {isUserAdmin ? <Link href="/Admin">Admin</Link> : null}
      {isUserAdmin ? <Link href="/CreateUser">Create User</Link> : null}
      <Link href="/ClientMember">Client Member</Link>
      <Link href="/Member">Member</Link>
      <Link href="/Public">Public</Link>
      {session ? (
        <Link href="/api/auth/signout?callbackUrl=/">
          Logout - {session?.user?.userName}
        </Link>
      ) : (
        <Link href="/api/auth/signin">Login</Link>
      )}
    </>
  );
};

const Nav = async () => {
  const session = await getServerSession(options);

  const roles = session?.user?.roles || [];
  const isUserAdmin = roles.includes(AppRoleTypes.Admin);

  return (
    <header className="bg-gray-600 text-gray-100">
      <nav className="flex justify-between items-center w-full px-10 py-2">
        <div>My Site</div>
        <div className="flex gap-10">
          <NavLinks isUserAdmin={isUserAdmin} session={session} />
        </div>
      </nav>
    </header>
  );
};

export default Nav;
