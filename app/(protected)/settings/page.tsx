"use client";

import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { SettingsSchema } from "@/schemas";
import { settings } from "@/actions/settings";
import { Button } from "@/components/ui/button";
import {
    Card,
    CardHeader,
    CardContent,
} from "@/components/ui/card";
import {
    Form,
    FormField,
    FormControl,
    FormItem,
    FormLabel,
    FormDescription,
    FormMessage,
} from "@/components/ui/form";
import { useTransition, useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { useSession } from "next-auth/react";
import { useCurrentUser } from "@/hooks/use-current-user";
import { FormSuccess } from "@/components/form-success";
import { FormError } from "@/components/form-error";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue
} from "@/components/ui/select";
import { UserRole } from "@prisma/client";
import { Switch } from "@/components/ui/switch";
import { deleteUserAccount } from "@/actions/delete-account";
import { useRouter } from "next/router";

const SettingsPage = () => {
    // const router = useRouter();
    const user = useCurrentUser();
    const [error, setError] = useState<string | undefined>();
    const [success, setSuccess] = useState<string | undefined>();
    const [isDeleting, setIsDeleting] = useState(false);
    
    const { update } = useSession();
    let [isPending, startTransition] = useTransition();
    const form = useForm<z.infer<typeof SettingsSchema>>({
        resolver: zodResolver(SettingsSchema),
        defaultValues: {
            name: user?.name || undefined,
            username: user?.username || undefined,
            email: user?.email || undefined,
            hashedPassword: "",
            newPassword: "",
            role: user?.role || undefined,
            isTwoFactorEnabled: user?.isTwoFactorEnabled ?? undefined,
        }
    });
    
    const onSubmit = (values: z.infer<typeof SettingsSchema>) => {
        startTransition(() => {       
            settings(values)
            .then((data) => {
                if(data.error){
                    setError(data.error);
                }
                if(data.success){
                    update();
                    setSuccess(data.success);
                    form.reset({...values});
                }
            })
            .catch(() => setError("Something went wrong..."))
        });
    };
  
    // TODO: Remake this deleteAccount const
    // const deleteAccount = async () => {
    //     setIsDeleting(true);
    //         try {
    //             const result = await deleteUserAccount(user?.id!)
    //             if(result.error){
    //                 setError(result.error);
    //             } else {
    //                 setSuccess("Account deleted." );
    //                 // router.push("/");
    //             }
    
    //         } catch (error){
    //             setError("Something went wrong...");
    //         } finally {
    //             setIsDeleting(false);
    //         }

       
    // }

    return (
        <Card className="w-[600px]">
            <CardHeader>
                <p className="text-2xl font-semibold text-center">Settings</p>
            </CardHeader>
            <CardContent>
                <Form {...form}>
                    <form className="space-y-6" onSubmit={form.handleSubmit(onSubmit)}>
                        <div className="space-y-4">
                        <FormField 
                        control={form.control}
                        name="name"
                        render={({field}) => (
                            <FormItem>
                                <FormLabel>Name</FormLabel>
                                <FormControl>
                                    <Input 
                                    {...field}
                                    placeholder="John Doe"
                                    disabled={isPending}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                        />
                        <FormField 
                        control={form.control}
                        name="username"
                        render={({field}) => (
                            <FormItem>
                                <FormLabel>Username</FormLabel>
                                <FormControl>
                                    <Input 
                                    {...field}
                                    placeholder="@johndoe"
                                    disabled={isPending}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                        />
                        {user?.isOAuth !== true && (
                            <>
                        <FormField 
                        control={form.control}
                        name="email"
                        render={({field}) => (
                            <FormItem>
                                <FormLabel>Email</FormLabel>
                                <FormControl>
                                    <Input 
                                    {...field}
                                    placeholder="johndoe@example.com"
                                    disabled={isPending}
                                    type="email"
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                        />
                        
                        <FormField 
                        control={form.control}
                        name="hashedPassword"
                        render={({field}) => (
                            <FormItem>
                                <FormLabel>Current Password</FormLabel>
                                <FormControl>
                                    <Input 
                                    {...field}
                                    placeholder="******"
                                    disabled={isPending}
                                    type="password"
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                        />
                        <FormField 
                        control={form.control}
                        name="newPassword"
                        render={({field}) => (
                            <FormItem>
                                <FormLabel>New Password</FormLabel>
                                <FormControl>
                                    <Input 
                                    {...field}
                                    placeholder="******"
                                    disabled={isPending}
                                    type="password"
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                        />
                        </>
                    )}
                        <FormField 
                        control={form.control}
                        name="role"
                        render={({field}) => (
                            <FormItem>
                                <FormLabel>Role</FormLabel>
                                <Select
                                disabled={isPending}
                                onValueChange={field.onChange}
                                defaultValue={field.value}
                                >
                                    <FormControl>
                                        <SelectTrigger>
                                            <SelectValue placeholder="Select a role"/>
                                        </SelectTrigger>
                                    </FormControl>
                                    <SelectContent>
                                        <SelectItem value={UserRole.ADMIN}>
                                            Admin
                                        </SelectItem>
                                        <SelectItem value={UserRole.USER}>
                                            User
                                        </SelectItem>
                                    </SelectContent>
                                </Select>
                                <FormMessage />
                            </FormItem>
                        )}
                        />

                        {user?.isOAuth !== true && (
                            
                        <FormField 
                        control={form.control}
                        name="isTwoFactorEnabled"
                        render={({field}) => (
                            <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm">
                                <div className="space-y-0.5">
                                    <FormLabel>2FA Authentication</FormLabel>
                                    <FormDescription>
                                        Enable 2FA Authentication for your account. Whether with email codes or TOTP.
                                    </FormDescription>
                                </div>
                                <FormControl>
                                    <Switch 
                                    disabled={isPending}
                                    checked={field.value ?? false}
                                    onCheckedChange={(checked) => field.onChange(checked)}
                                    />
                                </FormControl>
                            </FormItem>
                        )}
                        />
                        
                    )}
                        </div>
                        <FormError message={error} />
                        <FormSuccess message={success} />
                        <Button disabled={isPending} type="submit">
                            Save
                        </Button>
                    </form>
                </Form>
            </CardContent>
            {/* <CardContent>
                <Button 
                    variant="destructive" 
                    onClick={deleteAccount}
                    disabled={isPending}
                    className="w-full mt-6"
                >
                    Delete Account
                </Button>
                {error && <div className="text-red-500">{error}</div>}
                {success && <div className="text-green-500">{success}</div>}
            </CardContent> */}
        </Card>
    );
}

export default SettingsPage;