import NextAuth from "next-auth"
import authConfig from "./auth.config"
import prisma from "./prisma"
import { PrismaAdapter } from "@auth/prisma-adapter"
import { getUserById } from "./data/user"
import { UserRole } from "@prisma/client"

export const { handlers, signIn, signOut, auth } = NextAuth({
  pages: {
    signIn: "/auth/login",
    error: "/auth/error",
  },
  events: {
    async linkAccount({ user }) {
      await prisma.user.update({
        where: { id: user.id },
        data: { emailVerified: new Date() }
      })
    }
  },

  callbacks: {
    async session({ session, token }) {
      if (token.sub && session.user) {
        session.user.id = token.sub
        session.user.role = token.role as UserRole
        session.user.username = token.username as string
      }

      return session
    },

    async jwt({ token }) {
      if (!token.sub) return token;

      const user = await prisma.user.findUnique({
        where: { id: token.sub },
      });

      if (!user) return token;

      token.username = user.username;
      token.role = user.role;
      return token;
    },

    async signIn({ user, account, profile, email, credentials }) {
      // prevent signin without email verification
      if(account?.provider === "credentials"){
        const existingUser = await getUserById(user?.id!)
        if(!existingUser?.emailVerified){
          return false
        }
      }

      if (!user.username) {
        let username = `${user.email?.split("@")[0].toLowerCase()}_${Math.floor(1000 + Math.random() * 9000)}`
        user.username = username;
      }

      // TODO: Add 2FA check

      return true;
    }

  },
  adapter: PrismaAdapter(prisma),
  session: {
    strategy: "jwt",
  },
  ...authConfig,
})
