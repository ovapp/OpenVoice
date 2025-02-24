import { UserRole } from "@prisma/client";
import NextAuth, { type DefaultSession } from "next-auth";

export type ExtendedUser = DefaultSession["user"] & {
    role: UserRole;
    isTwoFactorEnabled: boolean;
    isOAuth: boolean;
    username: string; // maybe we have to change it later, idk
};

declare module "next-auth" {
    interface Session {
    user: ExtendedUser;
    }
}