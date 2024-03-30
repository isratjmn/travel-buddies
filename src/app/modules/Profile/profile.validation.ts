
import { z } from 'zod';

const UpdateProfileSchema = z.object({
    body: z.object({
        name: z.string({
            invalid_type_error: "user Name must be a string",
        })
            .min(1).optional(),
        email: z.string({
            invalid_type_error: "Email Address must be a string",
        }).email().optional(),
    })
});

export const UserProfileValidation = {

    UpdateProfileSchema
};
