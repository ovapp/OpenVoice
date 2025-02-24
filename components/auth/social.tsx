"use client";

import { FcGoogle } from "react-icons/fc";
import { Button } from "@/components/ui/button";
import { signIn } from "next-auth/react";
import { DEFAULT_LOGIN_REDIRECT } from "@/routes";

export const Social = () => {

    const handleClick = (provider: "google") => {
        signIn(provider, {
            // redirect: true,
            callbackUrl: DEFAULT_LOGIN_REDIRECT,
        });
    }

    return (
        <div className="flex items-center w-full gap-x-2">
            <Button
            size="lg"
            className="w-full"
            variant="outline"
            onClick={() => handleClick("google")}
            >
                <FcGoogle />Continue with Google
            </Button>
        </div>
    );
}