import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";
import { AppRoleTypes } from "@/lib/definitions";

// export { default } from "next-auth/middleware";
export default withAuth(
  function middleware(req) {
    console.log(req.nextUrl.pathname);
    console.log(req.nextauth.token.roles);
    console.log(req.nextauth.token.permissions);

    // if (
    //   (req.nextUrl.pathname.startsWith("/CreateUser") ||
    //     req.nextUrl.pathname.startsWith("/Admin")) &&
    //   !req.nextauth.token.roles.includes(AppRoleTypes.Admin)
    // ) {
    //   return NextResponse.rewrite(new URL("/Denied", req.url));
    // }
  },
  {
    callbacks: {
      authorized: ({ token }) => !!token,
    },
  }
);

export const config = {
  matcher: ["/CreateUser"],
};
