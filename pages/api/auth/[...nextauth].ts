import NextAuth from "next-auth/next";
import CredentialsProvider from "next-auth/providers/credentials";
import prismadb from "@/lib/prismadb";
import { compare } from "bcrypt";

import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { NextAuthOptions } from "next-auth";

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prismadb),
  providers: [
    CredentialsProvider({
      id: "credentials",
      name: "credentials",
      credentials: {
        username: {
          label: "Username",
          type: "text",
        },
        password: {
          label: "Password",
          type: "password",
        },
      },
      async authorize(credentials) {
        if (!credentials?.username || !credentials?.password)
          throw new Error("Username and password required");

        const account = await prismadb.account.findUnique({
          where: {
            username: credentials.username,
          },
        });

        if (!account || !account.hashedPassword)
          throw new Error("User does not exist");

        const isCorrectPassword = await compare(
          credentials.password,
          account.hashedPassword
        );

        if (!isCorrectPassword) throw new Error("Incorrect password");

        return account;
      },
    }),
  ],
  pages: {
    signIn: "/auth",
  },
  debug: process.env.NODE_ENV === "development",
  session: {
    strategy: "jwt",
  },
  jwt: {
    secret: process.env.NEXTAUTH_JWT_SECRET,
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.name = user.username;
      }
      return token;
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
};

export default NextAuth(authOptions);
