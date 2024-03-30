import { z } from 'zod';

export const CreateTripSchema = z.object({
    body: z.object({
        userId: z.string({
            required_error: "User ID is required",
            invalid_type_error: "User ID must be a string",
        }),

        destination: z.string({
            required_error: "Destination is required",
            invalid_type_error: "Destination must be a string",
        }).max(255),

        startDate: z.string({
            required_error: "Start date is required",
            invalid_type_error: "Start date must be a string",
        }).regex(/^\d{4}-\d{2}-\d{2}$/, 'Invalid date format (YYYY-MM-DD)'),

        endDate: z.string({
            required_error: "End date is required",
            invalid_type_error: "End date must be a string",
        }).regex(/^\d{4}-\d{2}-\d{2}$/, 'Invalid date format (YYYY-MM-DD)'),

        budget: z.number({
            required_error: "Budget is required",
            invalid_type_error: "Budget must be a number",
        }).min(0, 'Budget must be a positive number'),

        activities: z.array(z.string({
            invalid_type_error: "Activity must be a string",
        })),
    })
});


export const TripsValidation = {
    CreateTripSchema,
};
