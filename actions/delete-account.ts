"use server";

import { currentUser } from "@/lib/auth";
import { db } from "@/lib/db";
import { getUserById } from "@/data/user";

export const deleteUserAccount = async (userId: string) => {

    const user = await currentUser();

    // if(!user){
    //     return { error: "Unauthorized"}
    // }

    // const dbUser = user.id ? await getUserById(user.id) : null;

    // if(!dbUser){
    //     return { error: "Unauthorized" }
    // }

        // Delete the user from the database
        await db.user.delete({
            where: { id: userId },
        });
        return { success: "Account deleted successfully." };
    
}