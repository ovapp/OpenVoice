"use client";

import { z } from "zod";
import { useForm } from "react-hook-form";
import { onboardingSchema } from "@/features/schema";
import { zodResolver } from "@hookform/resolvers/zod";

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "../ui/checkbox";
import { useOnboardingStore } from "@/app/auth/store";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { font_primary, font_secondary } from "@/app/layout";
import { cn } from "@/lib/utils";

const onboardingUsernameSchema = onboardingSchema.pick({
  username: true,
  terms: true,
});

type OnboardingNameSchema = z.infer<typeof onboardingUsernameSchema>;

const StepTwoForm = () => {
  const router = useRouter();
  const name = useOnboardingStore((state) => state.name);
  const birthday = useOnboardingStore((state) => state.birthday);
  const password = useOnboardingStore((state) => state.password);
  const repeatPassword = useOnboardingStore((state) => state.repeatPassword);

  const form = useForm<OnboardingNameSchema>({
    resolver: zodResolver(onboardingUsernameSchema),
    defaultValues: {
      username: "",
      terms: false,
    },
  });

  const onSubmit = (data: OnboardingNameSchema) => {
    console.log(data);
    // setData(data);
  };

  useEffect(() => {
    if (!useOnboardingStore.persist.hasHydrated) return;

    if (!name || !birthday || !password || !repeatPassword) {
      router.push("/auth/step-one");
    }
  }, [name, birthday, password, repeatPassword, router]);

  return (
    <div>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="w-full p-[8px] space-y-8"
        >
          <FormField
            control={form.control}
            name="username"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Username</FormLabel>
                <FormControl>
                  <Input placeholder="Enter your username" type="text" {...field} className={cn("bg-[#E6E4E4]", font_secondary.className)}
                                      id="custom-input"/>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit" className="text-white auth-buttons cursor-pointer"
            id="sign-button"><h3 className={font_primary.className}>Sign up</h3></Button>
        </form>
      </Form>

      <div className="flex items-center justify-center">
        <hr className="w-full ml-[12px] mr-[12px]" id="hr-notor" />
      </div>

      <div>
        <div className="button-padding">
          <button
            id="google-auth"
            className="auth-buttons flex items-center justify-center relative bottom-[-2rem]"
          >
            Back
          </button>
        </div>
      </div>

    </div>
  );
};

export default StepTwoForm;
