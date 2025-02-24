/**
 * This file is responsible to login the user into the app, but not allowing him
 * to get into the app. This part (getting into the app) is made by the file "auth.js".
 */

"use server";

import { LoginSchema } from "@/schemas";
import * as z from "zod";
import { signIn } from "@/auth";
import { DEFAULT_LOGIN_REDIRECT } from "@/routes";
import { AuthError } from "next-auth";
import { getUserByEmail } from "@/data/user";
import { sendVerificationEmail, sendTwoFactorTokenEmail } from "@/lib/mail";
import { generateTwoFactorToken, generateVerificationToken } from "@/lib/tokens";
import { getTwoFactorTokenByEmail } from "@/data/two-factor-token";
import { db } from "@/lib/db";
import { getTwoFactorConfirmationByUserId } from "@/data/two-factor-confirmation";

export const login = async (values: z.infer<typeof LoginSchema>) => {
    const validatedFields = LoginSchema.safeParse(values);
    if(!validatedFields.success){
        return { error: "Invalid fields." };
    }

    const { email, password, code } = validatedFields.data;
    const existingUser = await getUserByEmail(email);
    
    if(!existingUser || !existingUser.email || !existingUser.hashedPassword) {
        return { error: "This email does not exist."}
    }

    if (!existingUser.emailVerified) {
        const verificationToken = await generateVerificationToken(existingUser.email);
        await sendVerificationEmail(verificationToken.email, verificationToken.token)
        return { success: "Confirmation email sent." };
    }

    if(existingUser.isTwoFactorEnabled && existingUser.email){
        if(code) {
            // todo: verify code
            const twoFactorToken = await getTwoFactorTokenByEmail(existingUser.email);
            if(!twoFactorToken){
                return { error: "Invalid token." };
            }
            if(twoFactorToken.token !== code){
                return { error: "Invalid code." };
            }
            const hasExpired = new Date(twoFactorToken.expires) < new Date();
            if(hasExpired){
                return { error: "Code expired" };
            }
            await db.twoFactorToken.delete({
                where: { id: twoFactorToken.id }
            });
            const existingConfirmation = await getTwoFactorConfirmationByUserId(existingUser.id);
            if(existingConfirmation){
                await db.twoFactorConfirmation.delete({
                    where: { id: existingConfirmation.id }
                })
            }
            await db.twoFactorConfirmation.create({
                data: { userId: existingUser.id }
            })
        } else {
        const twoFactorToken = await generateTwoFactorToken(existingUser.email);
        await sendTwoFactorTokenEmail(
            twoFactorToken.email,
            twoFactorToken.token,
        );

        return { twoFactor: true };
    }
    }

    try {
        await signIn("credentials", {
            email, 
            password,
            redirectTo: DEFAULT_LOGIN_REDIRECT,
        })
    } catch (error){
        if(error instanceof AuthError){
            switch(error.type){
                case "CredentialsSignin":
                    return { error: "Invalid credentials."}
                default:
                    // return { error: "Something went wrong..."}
            }
        }
        throw error;
    }
    // return { success: "Confirmation email sent." };
}