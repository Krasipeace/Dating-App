import NextAuth from "next-auth";
import { PrismaAdapter } from "@auth/prisma-adapter";
import authConfig from "./auth.config";
import { prisma } from "./lib/prisma";
import { Role } from "@prisma/client";

export const { auth, handlers: { GET, POST }, signIn, signOut } = NextAuth({
    callbacks: {
        async session({ token, session }) {
            if (token.sub && session.user) {
                session.user.id = token.sub;
                session.user.profileComplete = token.profileComplete as boolean;
                session.user.role = token.role as Role;
            }

            return session;
        },
        async jwt({ user, token }) {
            if (user) {
                token.profileComplete = user.profileComplete;
                token.role = user.role;
            }

            return token;
        },
    },
    adapter: PrismaAdapter(prisma),
    session: { strategy: "jwt" },
    ...authConfig,
})