"use client";

import { CardWrapper } from "@/components/auth/card-wrapper";
import { PuffLoader } from "react-spinners";
import { useSearchParams } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import { newVerification } from "@/actions/new-verification";
import { FormError } from "@/components/form-error";
import { FormSuccess } from "@/components/form-success";

export const NewVerificationForm = () => {
    const searchParams = useSearchParams();
    const token = searchParams.get("token");
    const [error, setError] = useState<string | undefined>()
    const [success, setSuccess] = useState<string | undefined>()


    const onSubmit = useCallback(() => {
        if(success || error) return;

        if(!token){
            setError("Missing token.");
            return;
        }
        
        newVerification(token)
        .then((data) => {
            setSuccess(data.success);
            setError(data.error);
        })
        .catch(() => {
            setError("Something went wrong...");
        })
    }, [token, success, error])

    useEffect(() => {
        onSubmit();
    }, [onSubmit]);

    return (
        <CardWrapper 
        headerLabel="Confirming your Verification"
        backButtonHref="/auth/login"
        backButtonLabel="Back to login"
        >
            <div className="flex items-center w-full justify-center">
                {!success && !error && (
                    <PuffLoader
                        color="black"
                        size={30}
                        speedMultiplier={1}
                    />
                )}
                <FormSuccess message={success} />
                {!success && (
                    <FormError message={error} />
                )}
            </div>
        </CardWrapper>
    );
}
