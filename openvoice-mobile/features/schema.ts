import { z } from "zod";

export const onboardingSchema = z.object({
    username: z.string().min(3).max(20),
    email: z.string().min(1).max(20),
    name: z.string().min(3).max(20),
    password: z.string().min(8).max(20),
    repeatPassword: z.string().min(8).max(20),
    birthday: z.coerce.date()
    .refine((date) => {
        // Check if date is valid (not in the future)
        return date <= new Date();
    }, {
        message: "Birthday cannot be in the future",
    })
    .refine((date) => {
        // Calculate age
        const today = new Date();
        const birthDate = new Date(date);
        let age = today.getFullYear() - birthDate.getFullYear();
        const monthDiff = today.getMonth() - birthDate.getMonth();
        
        // Adjust age if birthday hasn't occurred yet this year
        if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
            age--;
        }
        
        // Check if at least 18 years old (change the number for different age requirements)
        return age >= 18;
    }, {
        message: "You must be at least 18 years old",
    }),
    terms: z.boolean().refine((data) => data),
});

export type OnboardingSchema = z.infer<typeof onboardingSchema>;
