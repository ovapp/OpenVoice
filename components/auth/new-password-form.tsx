"use client";

import * as z from "zod";

import { useTransition, useState, Suspense } from "react";
import { useForm } from "react-hook-form";
import { CardWrapper } from "@/components/auth/card-wrapper";
import { Button } from "@/components/ui/button";
import { zodResolver } from "@hookform/resolvers/zod";
import { NewPasswordSchema } from "@/schemas";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { FormError } from "@/components/form-error";
import { FormSuccess } from "@/components/form-success";
import { newPassword } from "@/actions/new-password";
import { useSearchParams } from "next/navigation";

export const NewPasswordForm = () => {
    const searchParams = useSearchParams();
    const token = searchParams.get("token");

    const [isPending, startTransition] = useTransition();
    const [error, setError] = useState<string  | undefined>("");
    const [success, setSuccess] = useState<string | undefined>("");
    const form = useForm<z.infer<typeof NewPasswordSchema>>({
        resolver: zodResolver(NewPasswordSchema),
        defaultValues: {
            password: "",
        },
    });
    const onSubmit = (values: z.infer<typeof NewPasswordSchema>) => {
        setError("");
        setSuccess("");
        
        startTransition(() => {
            newPassword(values, token)
            .then((data) => {
                if(data?.error){
                    form.reset();
                    setError(data.error);
                }
                if(data?.success){
                    form.reset();
                    setSuccess(data.success);
                }
            });
        })
    }

    return (
        <CardWrapper
        headerLabel="Enter a new password?"
        backButtonLabel="Back to login"
        backButtonHref="/auth/login"
        >
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-6"
                >
                    <div className="space-y-4">
                        <FormField 
                        control={form.control}
                        name="password"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Password</FormLabel>
                                <FormControl>
                                    <Input 
                                    {...field}
                                    disabled={isPending}
                                    placeholder="******"
                                    type="password"
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                        />
                    </div>

                    <FormError message={error}/>
                    <Suspense fallback={<div>Loading...</div>}>
                    </Suspense>
                    <FormSuccess message={success}/>

                    <Button
                    disabled={isPending}
                    type="submit"
                    className="w-full"
                    >
                        Reset Password
                    </Button>
                </form>
            </Form>
        </CardWrapper>
    );
}

