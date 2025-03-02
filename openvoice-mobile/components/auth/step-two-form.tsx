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
import { useRouter } from "next/navigation";
import { useOnboardingStore } from "@/app/auth/store";
import { useEffect } from "react";
import { font_primary, font_secondary } from "@/app/layout";
import { cn } from "@/lib/utils";

const onboardingPasswordSchema = onboardingSchema.pick({
  password: true,
  repeatPassword: true,
});

type OnboardingNameSchema = z.infer<typeof onboardingPasswordSchema>;

const StepTwoForm = () => {
  const name = useOnboardingStore((state) => state.name);
  const birthday = useOnboardingStore((state) => state.birthday);

  const router = useRouter();
  const setData = useOnboardingStore((state) => state.setData);

  const form = useForm<OnboardingNameSchema>({
    resolver: zodResolver(onboardingPasswordSchema),
    defaultValues: {
      password: "",
      repeatPassword: "",
    },
  });

  const onSubmit = (data: OnboardingNameSchema) => {
    console.log(data);
    setData(data);
    router.push("/auth/step-three");
  };

  useEffect(() => {
    if (!useOnboardingStore.persist.hasHydrated) return;

    if (!name || !birthday) {
      router.push("/auth/step-one");
    }
  }, [name, birthday, router]);

  return (
    <div>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="w-full p-[8px] space-y-8"
        >
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input
                    type="password"
                    className={cn("bg-[#E6E4E4]", font_secondary.className)}
                    id="custom-input"
                    placeholder="Enter your password"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="repeatPassword"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Repeat Password</FormLabel>
                <FormControl>
                  <Input placeholder="Repeat your password" {...field} className={cn("bg-[#E6E4E4]", font_secondary.className)}
                    id="custom-input" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit" className="text-white auth-buttons cursor-pointer"
            id="sign-button"><h3 className={font_primary.className}>Next</h3></Button>
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
