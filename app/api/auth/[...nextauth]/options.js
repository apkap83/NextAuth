import GitHubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";
import Credentials from "next-auth/providers/credentials";
import { sequelize } from "@/(db)";
import bcrypt from "bcrypt";

export const options = {
  providers: [
    GitHubProvider({
      profile(profile) {
        console.log("Profile GitHub", profile);

        let userRole = "GitHub User";
        if (profile?.email === "ap.kapetanios@gmail.com") {
          userRole = "admin";
        }

        return {
          ...profile,
          role: userRole,
        };
      },
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_Secret,
    }),
    GoogleProvider({
      profile(profile) {
        console.log("Profile Google", profile);

        let userRole = "Google User";
        return {
          ...profile,
          id: profile.sub,
          role: userRole,
        };
      },
      clientId: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_Secret,
    }),
    Credentials({
      name: "Credentials",
      credentials: {
        email: {
          label: "email:",
          type: "text",
          placeholder: "your-email",
        },
        password: {
          label: "password:",
          type: "password",
          placeholder: "your-password",
        },
      },

      async authorize(credentials) {
        const { AppUser, AppRole, AppPermission } = sequelize.models;

        try {
          const foundUser = await AppUser.scope("withPassword").findOne({
            where: {
              email: credentials.email,
            },
            include: {
              model: AppRole,
              include: [AppPermission],
            },
          });

          if (foundUser) {
            const match = await bcrypt.compare(
              credentials.password,
              foundUser.password
            );

            if (match) {
              delete foundUser.password;
              const roles = foundUser.AppRoles.map((role) => role.roleName);

              const permissions = foundUser.AppRoles.flatMap((role) =>
                role.AppPermissions.map(
                  (permission) => permission.permissionName
                )
              );

              // return foundUser;
              return {
                id: foundUser.id,
                userName: foundUser.userName,
                email: foundUser.email,
                roles,
                permissions,
              };
            }
          }
        } catch (error) {
          console.log(error);
        }
        return null;
      },
    }),
    Credentials({
      name: "LDAP",
      credentials: {
        email: { label: "DN", type: "text", placeholder: "" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials, req) {
        const client = ldap.createClient({
          url: process.env.LDAP_URI,
        });

        console.log("*** client", client);

        return new Promise((resolve, reject) => {
          client.bind(credentials.username, credentials.password, (error) => {
            if (error) {
              console.error("Failed to bind to LDAP", error);
              reject(new Error("Invalid credentials"));
            } else {
              console.log("Logged in");
              resolve({
                username: credentials.username,
                roles: ["user"], // Default role
              });
            }
          });
        });
      },
    }),
  ],

  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.userName = user.userName;
        token.roles = user.roles;
        token.permissions = user.permissions;
      }
      return token;
    },

    async session({ session, token }) {
      if (session?.user) {
        session.user.userName = token.userName;
        session.user.roles = token.roles;
        session.user.permissions = token.permissions;
      }
      return session;
    },
  },
};
