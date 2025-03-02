"use client";

import { CalendarIcon } from "lucide-react";
import { useForm } from "react-hook-form";
import { format } from "date-fns";
import { z } from "zod";
import { onboardingSchema } from "@/features/schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { cn } from "@/lib/utils";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

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
import { Calendar } from "../ui/calendar";
import { font_primary, font_secondary } from "@/app/layout";

const onboardingNameSchema = onboardingSchema.pick({
  name: true,
  email: true,
  birthday: true,
});

type OnboardingNameSchema = z.infer<typeof onboardingNameSchema>;

const StepOneForm = () => {
  const router = useRouter();
  const setData = useOnboardingStore((state) => state.setData);
  const form = useForm<OnboardingNameSchema>({
    resolver: zodResolver(onboardingNameSchema),
    defaultValues: {
      name: "",
      email: "",
      birthday: new Date(),
    },
  });

  const onSubmit = (data: OnboardingNameSchema) => {
    console.log(data);
    setData(data);
    router.push("/auth/step-two");
  };

  return (
    <div className="">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="w-full p-[8px] space-y-8"
        >
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Exhibition name</FormLabel>
                <FormControl>
                  <Input
                    type="text"
                    placeholder="Enter your name"
                    {...field}
                    className={cn("bg-[#E6E4E4]", font_secondary.className)}
                    id="custom-input"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input
                    type="email"
                    placeholder="Enter your email"
                    {...field}
                    className={cn("bg-[#E6E4E4]", font_secondary.className)}
                    id="custom-input"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="birthday"
            render={({ field }) => (
              <FormItem className="flex flex-col">
                <FormLabel>Date of birth</FormLabel>
                <Popover>
                  <PopoverTrigger asChild>
                    <FormControl>
                      <Button
                        variant={"outline"}
                        className={cn(
                          "pl-3 text-left font-normal bg-[#E6E4E4]",
                          font_secondary.className,
                          !field.value && "text-muted-foreground"
                        )}
                        id="custom-input"
                      >
                        {field.value ? (
                          format(field.value, "PPP")
                        ) : (
                          <span>Pick a date</span>
                        )}
                        <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                      </Button>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={field.value}
                      onSelect={field.onChange}
                      disabled={(date) =>
                        date > new Date() || date < new Date("1900-01-01")
                      }
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
                <FormDescription>
                  Your date of birth is used to calculate your age. It will not be shown on your profile page.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button
            type="submit"
            className="text-white auth-buttons cursor-pointer"
            id="sign-button"
          >
            <h3 className={font_primary.className}>Next</h3>
          </Button>
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

export default StepOneForm;
