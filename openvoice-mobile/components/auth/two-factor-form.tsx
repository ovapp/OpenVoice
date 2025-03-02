"use client";

import { useForm } from "react-hook-form"; 
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { Toaster } from "@/components/ui/sonner"

// import { LoginSchema } from "@/schemas";
import {
    InputOTP,
    InputOTPGroup,
    InputOTPSeparator,
    InputOTPSlot,
  } from "@/components/ui/input-otp"
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

const TwoFactorForm = () => {
    const router = useRouter();

    const form = useForm({
        defaultValues: {
          pin: "",
        },
      });

      function onSubmit(data: z.infer<typeof FormSchema>) {
        toast({
          title: "You submitted the following values:",
          description: (
            <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
              <code className="text-white">{JSON.stringify(data, null, 2)}</code>
            </pre>
          ),
        })
      }

    return (
        <div className="relative bottom-[2rem]">
            
            <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="top-[88px] relative space-y-6 ">
        <div className="flex items-center justify-center">
        <FormField
          control={form.control}
          name="pin"
          render={({ field }) => (
            <FormItem>
              <FormLabel>One-Time Password</FormLabel>
              <FormControl>
                <InputOTP maxLength={6} {...field}>
                  <InputOTPGroup>
                    <InputOTPSlot index={0} />
                    <InputOTPSlot index={1} />
                    <InputOTPSlot index={2} />
                  </InputOTPGroup>
                  <InputOTPSeparator />
                  <InputOTPGroup>
                    <InputOTPSlot index={3} />
                    <InputOTPSlot index={4} />
                    <InputOTPSlot index={5} />
                   </InputOTPGroup>
                </InputOTP>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        </div>
    
<div className="button-padding">
 <button
type="submit"
className="text-white auth-buttons cursor-pointer"
id="sign-button"
>
    <h3 className={font_primary.className}>Verify</h3>
</button>
</div>

      </form>
    </Form>  
                     
            
            <div className="mb-[5px] relative bottom-[-7rem]">
    <h6 id="terms" className="text-left pl-4 font-normal">By signing up, you agree to our <b className="mx-[2px] cursor-pointer hover:underline">Terms</b> and <b className="ml-[2px] cursor-pointer hover:underline">Privacy Policy</b>.</h6>
    </div>
  
        </div>
    )
}

export default TwoFactorForm;

export const LoginUrlError = () => {
    const searchParams = useSearchParams();
    const urlError = searchParams.get("error") === "OAuthAccountNotLinked" ? "Email already in use with different provider." : "";
    return <FormError message={urlError} />;
}

// <form  className="top-[88px] relative">
// <div className="space-y-6 mr-[12px] ml-[12px]">

// {/* <button
// type="submit"
// className="text-white auth-buttons cursor-pointer"
// id="sign-button"
// >
//     <h3 className={font_primary.className}>Verify</h3>
// </button> */}