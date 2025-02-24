/**
 * This file is responsible for getting the token for verification.
 * The file used for token generation is: "tokens.ts (@/lib/tokens.ts)"
 */

import { db } from "@/lib/db";

export const getVerificationTokenByToken = async (
    token: string
) => {
    try {
        const verificationToken = await db.verificationToken.findUnique({
            where: { token }
        });
        return verificationToken;
    } catch {
        return null;
    }
}

export const getVerificationTokenByEmail = async (
    email: string
) => {
    try {
        const verificationToken = await db.verificationToken.findFirst({
            where: { email }
        });
        return verificationToken;
    } catch {
        return null;
    }
}