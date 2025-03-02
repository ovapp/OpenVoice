"use client";

import { useForm } from "react-hook-form"; 
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

// import { LoginSchema } from "@/schemas";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage
} from "@/components/ui/form";
import { FormError } from "@/components/form-error";
// import { FormSuccess } from "@/components/form-success";
// import { login } from "@/actions/login";
import { Input } from "@/components/ui/input";
import { useSearchParams } from "next/navigation";
import { font_primary, font_secondary } from "@/app/layout";
import { cn } from "@/lib/utils";

const NewPasswordForm = () => {
    const router = useRouter();

    const form = useForm({
        defaultValues: {
          email: "",
          password: "",
        },
      });

    return (
        <div className="relative bottom-[2rem]">
            <Form {...form}>
                <form  className="top-[88px] relative">
                    <div className="space-y-6 mr-[12px] ml-[12px]">
                        <FormField 
                        name="email"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel className="text-[16px]">Email</FormLabel>
                                <FormControl>
                                <div>
                                <svg className="input-icon transition-transform duration-200 ease-out peer-focus:scale-90" viewBox="0 0 500 500" xmlns="http://www.w3.org/2000/svg">
                                <path d="M80 192V144C80 64.47 144.5 0 224 0C303.5 0 368 64.47 368 144V192H384C419.3 192 448 220.7 448 256V448C448 483.3 419.3 512 384 512H64C28.65 512 0 483.3 0 448V256C0 220.7 28.65 192 64 192H80zM144 192H304V144C304 99.82 268.2 64 224 64C179.8 64 144 99.82 144 144V192z"></path></svg>
                                   
                                    
                                    <Input 
                                    {...field}
                                    placeholder="Enter your email address"
                                    type="email"
                                    className={cn("h-[40px] bg-[#E6E4E4]",
                                        font_secondary.className)}
                                    id="custom-input"
                                    />
                                    </div>
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                        />
                        
                        <button
                        type="submit"
                        className="text-white auth-buttons cursor-pointer"
                        id="sign-button"
                        >
                            <h3 className={font_primary.className}>Reset password</h3>
                        </button>
                    </div>
                </form>
            </Form>

    

        </div>
    )
}

export default NewPasswordForm;

export const LoginUrlError = () => {
    const searchParams = useSearchParams();
    const urlError = searchParams.get("error") === "OAuthAccountNotLinked" ? "Email already in use with different provider." : "";
    return <FormError message={urlError} />;
}