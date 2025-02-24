/**
 * This file is responsible to register the user to the database.
 */

"use server";

import * as z from "zod";
import { db } from "@/lib/db"
import bcrypt from "bcryptjs";
import { RegisterSchema } from "@/schemas";
import { getUserByEmail, getUserByUsername } from "@/data/user";
import { generateVerificationToken } from "@/lib/tokens";
import { sendVerificationEmail } from "@/lib/mail";

export const register = async (values: z.infer<typeof RegisterSchema>) => {
    const validatedFields = RegisterSchema.safeParse(values);
    if(!validatedFields.success){
        return { error: "Invalid fields!" };
    }

    const { email, password, username, name } = validatedFields.data;
    const hashedPassword = await bcrypt.hash(password, 10);

    const existingUserEmail = await getUserByEmail(email);

    const existingUsername = await getUserByUsername(username);

    if(existingUserEmail){
        return { error: "Email already in use." };
    }

    if(existingUsername){
        return { error: "Username already in use." };
    }

    await db.user.create({
        data: {
            username,
            name,
            email,
            hashedPassword: hashedPassword,
        }
    });

    // TODO: Send verification token email
    const verificationToken = await generateVerificationToken(email);
    await sendVerificationEmail(
        verificationToken.email,
        verificationToken.token,
    );

    return { success: "Confirmation email sent." };
}