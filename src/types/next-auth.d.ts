import { Role } from "@prisma/client";
import { DefaultSession } from "next-auth";

declare module "next-auth" {
    interface User {
        profileComplete: boolean;
        role: HTMLTableRowElement;
    }

    interface Session {
        user: {
            profileComplete: boolean;
            role: Role;
        } & DefaultSession["user"]
    }
}

declare module "next-auth/jwt" {
    interface JWT {
        profileComplete: boolean;
        role: Role;
    }
}