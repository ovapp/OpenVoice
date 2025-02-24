/**
 * This file is responsible for actually let the user to get into the app.
 */

import NextAuth, { DefaultSession } from "next-auth"
import authConfig from "@/auth.config";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { db } from "@/lib/db";
import { getUserById } from "@/data/user";
import { UserRole } from "@prisma/client";
import { getTwoFactorConfirmationByUserId } from "@/data/two-factor-confirmation";
import { getAccountByUserId } from "./data/account";

export const {
    handlers: { GET, POST },
    auth,
    signIn,
    signOut,
} = NextAuth({
    pages: {
        signIn: "/auth/login",
        error: "/auth/error",
    },
    events: {
        async linkAccount({ user }) {
            await db.user.update({
                where: { id: user.id },
                data: { emailVerified: new Date() }
            })
        }
    },
    callbacks: {
        async signIn({ user, account }){

            // Allow OAuth without email verification. If it's anything other than 
            // credentials, then allow it.
            if(account?.provider !== "credentials") return true;

            const existingUser = await getUserById(user.id!);

            // Prevent sign in without email verification
            if(!existingUser?.emailVerified) return false;

            // 2FA Check
            if(existingUser.isTwoFactorEnabled){
                const twoFactorConfirmation = await getTwoFactorConfirmationByUserId(existingUser.id);
                if(!twoFactorConfirmation) return false;

                // Delete two factor confirmation for next sign in
                await db.twoFactorConfirmation.delete({
                    where: { id: twoFactorConfirmation.id }
                });
            }

            return true;
        },
        async session({ token, session }){
            if(token.sub && session.user){
                session.user.id = token.sub;
            }
            if(token.role && session.user){
                session.user.role = token.role as UserRole;
            }

            if(session.user){
                session.user.isTwoFactorEnabled = token.isTwoFactorEnabled as boolean;
                session.user.username = token.username as string;
                session.user.name = token.name;
                session.user.email = token.email ?? "";
                session.user.isOAuth = token.isOAuth as boolean;
            }

            return session;
        },
        async jwt({ token,}){
            if(!token.sub) return token;
            let existingUser = await getUserById(token.sub);
            
            if(!existingUser) return token;
            const existingAccount = await getAccountByUserId(existingUser.id);

            if (!existingUser && token.email){
                existingUser = await db.user.findUnique({
                    where: { email: token.email },
                });
            }

            if (!existingUser) {
                const username = generateUsername(token.name ?? undefined, token.email ?? undefined);
                
                // Create a new user in case that he doesn't exist
                existingUser = await db.user.create({
                    data: {
                        email: token.email,
                        name: token.name,
                        image: token.picture,
                        username,
                        role: "USER",
                    },
                });
            }

            token.isOAuth = !!existingAccount;
            token.name = existingUser.name;
            token.email = existingUser.email;
            token.role = existingUser.role;
            token.username = existingUser.username;
            token.IsTwoFactorEnabled = existingUser.isTwoFactorEnabled;
            return token;
        }
    },
    adapter: PrismaAdapter(db),
    session: { strategy: "jwt" },
    ...authConfig,
});

// Generate username for accounts created with Google
function generateUsername(name?: string, email?: string): string {
    
    // Uses the name if available, removing the special characters
    let base = name ? name.toLowerCase().replace(/[^a-z0-9]/g, "") : "";
    
    // If it doesn't have a name, uses the part of the email before "@"
    if(!base && email){
        base = email.split("@")[0].toLowerCase().replace(/[^a-z0-9]/g, "");
    }

    // In case that doesn't have the base from the name or email, it uses "user"
    if (!base){
        base = "user";
    }

    // Adds a random number to increase the chance of uniqueness
    const randomNum = Math.floor(1000 + Math.random() * 9000);
    return `${base}${randomNum}`;
}