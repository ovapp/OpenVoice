"use client";

import { useForm } from "react-hook-form"; 
// eslint-disable-next-line @typescript-eslint/no-unused-vars
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

const LoginForm = () => {
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
                                <svg className="input-icon" viewBox="0 0 500 500" xmlns="http://www.w3.org/2000/svg">
                                <path d="M207.8 20.73c-93.45 18.32-168.7 93.66-187 187.1c-27.64 140.9 68.65 266.2 199.1 285.1c19.01 2.888 36.17-12.26 36.17-31.49l.0001-.6631c0-15.74-11.44-28.88-26.84-31.24c-84.35-12.98-149.2-86.13-149.2-174.2c0-102.9 88.61-185.5 193.4-175.4c91.54 8.869 158.6 91.25 158.6 183.2l0 16.16c0 22.09-17.94 40.05-40 40.05s-40.01-17.96-40.01-40.05v-120.1c0-8.847-7.161-16.02-16.01-16.02l-31.98 .0036c-7.299 0-13.2 4.992-15.12 11.68c-24.85-12.15-54.24-16.38-86.06-5.106c-38.75 13.73-68.12 48.91-73.72 89.64c-9.483 69.01 43.81 128 110.9 128c26.44 0 50.43-9.544 69.59-24.88c24 31.3 65.23 48.69 109.4 37.49C465.2 369.3 496 324.1 495.1 277.2V256.3C495.1 107.1 361.2-9.332 207.8 20.73zM239.1 304.3c-26.47 0-48-21.56-48-48.05s21.53-48.05 48-48.05s48 21.56 48 48.05S266.5 304.3 239.1 304.3z"></path></svg>
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
                        <FormField 
                        name="password"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel className="text-[16px]">Password</FormLabel>
                                <FormControl>
                                <div>
                                <svg className="input-icon transition-transform duration-200 ease-out peer-focus:scale-90" viewBox="0 0 500 500" xmlns="http://www.w3.org/2000/svg">
                                <path d="M80 192V144C80 64.47 144.5 0 224 0C303.5 0 368 64.47 368 144V192H384C419.3 192 448 220.7 448 256V448C448 483.3 419.3 512 384 512H64C28.65 512 0 483.3 0 448V256C0 220.7 28.65 192 64 192H80zM144 192H304V144C304 99.82 268.2 64 224 64C179.8 64 144 99.82 144 144V192z"></path></svg>
                                
                                    <Input 
                                    {...field}
                                    placeholder="Enter your password"
                                    type="password"
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
                            <h3 className={font_primary.className}>Sign In</h3>
                        </button>
                    </div>
                </form>
            </Form>
            

        <h3 className="flex items-center justify-center cursor-pointer hover:underline" id="forgot-psw" onClick={() => {router.push("/auth/reset")}}>Forgot your password?</h3>
    <div className="flex items-center justify-center">
    <hr className="w-full ml-[12px] mr-[12px]" id="hr-notor"/>
    </div>

    <div className="relative bottom-[1em]">                
    <div className="button-padding">
    <button id="google-auth" className="auth-buttons flex items-center justify-center relative bottom-[-10rem]" onClick={() => {router.push("/")}}><h3>Back</h3></button>
    </div>
    
    <div className="mb-[5px] relative bottom-[-11rem]">
    <h6 id="terms" className="text-left pl-4 font-normal">By signing in, you agree to our <b className="mx-[2px] cursor-pointer hover:underline">Terms</b> and <b className="ml-[2px] cursor-pointer hover:underline">Privacy Policy</b>.</h6>
    </div>
    </div>

        </div>
    )
}

export default LoginForm;

export const LoginUrlError = () => {
    const searchParams = useSearchParams();
    const urlError = searchParams.get("error") === "OAuthAccountNotLinked" ? "Email already in use with different provider." : "";
    return <FormError message={urlError} />;
}