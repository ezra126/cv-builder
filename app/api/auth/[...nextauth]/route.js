import bcrypt from "bcrypt";
import NextAuth, { AuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GithubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
// import { PrismaAdapter } from "@auth/prisma-adapter";

import prisma from "@/app/libs/prismadb";

export const authOptions = {
  // adapter: PrismaAdapter(prisma),

  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET,
      async profile(profile) {
        try {
          const userExist = await prisma.user.findUnique({
            where: {
              email: profile?.email,
            },
          });
          if (userExist) {
            console.log("user exist" + { userExist } + "ddjsh");
            return userExist;
          } else {
            console.log("user not exist zfjbsjhfbdhbjh");
            const user = await prisma.user.create({
              data: {
                first_name: profile?.name,
                last_name: profile?.name,
                email: profile?.email,
                image: profile?.avatar_url,
                password: "******",
              },
            });
            return user;
          }
        } catch (err) {
          return null;
        }
      },
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: { label: "email", type: "text" },
        password: { label: "password", type: "password" },
      },
      async authorize(credentials, req) {
        if (!credentials?.email || !credentials?.password) {
          throw new Error("Invalid credentials");
        }
        const user = await prisma.user.findUnique({
          where: {
            email: credentials?.email,
          },
        });
        console.log("user", user);
        if (!user || !user?.password) {
          throw new Error("Invalid credentials");
        }

        const isCorrectPassword = await bcrypt.compare(
          credentials?.password,
          user.password
        );
        console.log("iscor", isCorrectPassword);

        if (!isCorrectPassword) {
          throw new Error("Incorrect passwor");
        }

        return user;
      },
    }),
  ],
  callbacks: {
    async signIn({}) {
      console.log("sign in achieved");
      return true;
      // try {
      //   const userExist = await prisma.user.findUnique({
      //     where: {
      //       email: profile?.email,
      //     },
      //   });
      //   if (userExist) {
      //     console.log("user exist on database");
      //     return true;
      //   } else {
      //     console.log("user not exist");
      //     const user = await prisma.user.create({
      //       data: {
      //         first_name: profile?.name,
      //         last_name: profile?.name,
      //         email: profile?.email,
      //         image: profile?.avatar_url,
      //         password: "jjsk",
      //       },
      //     });
      //     return true;
      //   }
      // } catch (err) {
      //   return false;
      // }
    },
    async jwt({ token, account, trigger, session, user }) {
      console.log("jwt called");
      // Persist the OAuth access_token and or the user id to the token right after signin
      if (trigger === "update") {
        console
          .log
          // "jwt called wust" + session?.user?.first_name
          // session?.first_name +
          // user.first_name
          ();

        // Note, that `session` can be any arbitrary object, remember to validate it!
        token.first_name = session?.user?.first_name || session?.first_name;
        token.last_name = session?.user?.last_name || session?.last_name;
        token.phone_number =
          session?.user?.phone_number || session?.phone_number;
        token.email = session?.user?.email || session?.email;
        token.date_of_birth =
          session?.user?.date_of_birth || session?.date_of_birth;
        token.nationality = session?.user?.nationality || session?.nationality;
        token.image = session?.user?.image || session?.image;
      }
      //ole.log(user.email, user.image, user.id);
      if (account) {
        //  console.log(user.first_name, user.email, user.image, user.id);
        token.id = user.id;
        token.email = user.email;
        token.first_name = user.first_name;
        token.last_name = user.last_name;
        token.phone_number = user.phone_number || "";
        token.nationality = user.nationality || "";
        token.date_of_birth = user.date_of_birth || " ";
        token.image = user.image || " ";
        console.log(token.email, "is email");
        // token.first_name = user.first_name;
      }
      return token;
    },
    async session({ session, user, token }) {
      // Send properties to the client, like an access_token from a provider.

      session.user.id = token.id;
      session.user.first_name = token.first_name;
      session.user.last_name = token.last_name;
      session.user.phone_number = token.phone_number;
      session.user.nationality = token.nationality;
      session.user.date_of_birth = token.date_of_birth;
      session.user.image = token.image;

      // console.log(token.first_name);

      return session;
    },
  },
  pages: {
    signIn: "/",
  },
  debug: process.env.NODE_ENV === "development",
  session: {
    strategy: "jwt",
  },
  secret: process.env.NEXTAUTH_SECRET,
};

const handler = NextAuth(authOptions);

// export const GET = handler.handlers.GET;
// export const POST = handler.handlers.POST;

export { handler as GET, handler as POST };
