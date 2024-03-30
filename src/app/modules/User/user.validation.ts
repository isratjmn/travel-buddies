import { z } from 'zod';

export const CreateUserSchema = z.object({
    body: z.object({
        name: z.string({
            required_error: "Name is required",
            invalid_type_error: "Name must be a string",
        }).max(255),

        email: z.string({
            required_error: "Email is required",
            invalid_type_error: "Email must be a string",
        })
            .email('Invalid email format')
            .max(255),

        password: z.string({
            required_error: "Password is required",
            invalid_type_error: "Password must be a string",
        })
            .min(4, 'Password must be at least 4 characters long'),

        profile: z.object({
            bio: z.string({
                invalid_type_error: "Bio must be a string",
            }),
            age: z.number({
                invalid_type_error: "Age must be a number",
            }),
        }),
    }),
});

export const UserValidation = {
    CreateUserSchema,
};
