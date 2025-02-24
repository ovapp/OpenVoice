/**
 * This file is used to trigger the "middleware.ts"
 */

import type { NextAuthConfig } from "next-auth"
import Google from "next-auth/providers/google";
import Credentials from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import { LoginSchema } from "@/schemas";
import { getUserByEmail } from "@/data/user";

export default {
    providers: [
        Google({
            clientId: process.env.AUTH_GOOGLE_ID,
            clientSecret: process.env.AUTH_GOOGLE_SECRET,
            // authorization: {
            //     params: {
            //         prompt: "consent",
            //         access_type: "offline",
            //         scope: "openid email profile"
            //     }
            // }
        }),
        Credentials({
            async authorize(credentials){
                const validatedFields = LoginSchema.safeParse(credentials);
                
                if(validatedFields.success){
                    const { email, password } = validatedFields.data;
                    const user = await getUserByEmail(email);
                    if(!user || !user.hashedPassword) return null;
                    const passwordsMatch = await bcrypt.compare(
                        password,
                        user.hashedPassword,
                    );

                    if(passwordsMatch) return user;

                }
                return null;
            }
        })
    ],
    secret: process.env.AUTH_SECRET,
    // trustHost: true,
    basePath: "/api/auth"
} satisfies NextAuthConfig