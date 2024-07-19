import Credentials from "next-auth/providers/credentials";
import Github from "next-auth/providers/github";
import Google from "next-auth/providers/google";
import Gitlab from "next-auth/providers/gitlab"
import type { NextAuthConfig } from "next-auth";
import { loginSchema } from "./lib/schemas/loginSchema";
import { getUserByEmail } from "./app/actions/authActions";
import { compare } from "bcryptjs";

export default {
    providers: [
        Credentials({
            name: "credentials",
            async authorize(creds) {
                const validated = loginSchema.safeParse(creds);

                if (validated.success) {
                    const { email, password } = validated.data;

                    const user = await getUserByEmail(email);

                    if (!user || !user.passwordHash || !(await compare(password, user.passwordHash))) {
                        return null;
                    }

                    return user;
                }

                return null;
            }
        }),
        Github({
            clientId: process.env.GITHUB_CLIENT_ID,
            clientSecret: process.env.GITHUB_CLIENT_SECRET
        }),
        Google({
            clientId: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET
        }),
        Gitlab({
            clientId: process.env.GITLAB_CLIENT_ID,
            clientSecret: process.env.GITLAB_CLIENT_SECRET
        }),
    ]
} satisfies NextAuthConfig