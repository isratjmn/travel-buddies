
import { z } from 'zod';

const SendBuddyRequestSchema = z.object({
    body: z.object({
        userId: z.string({
            required_error: "User ID is required",
            invalid_type_error: "User ID must be a string",
        }),
    })
});

const RespondToTravelBuddySchema = z.object({
    body: z.object({
        status: z.enum(['APPROVED', 'REJECTED'], {
            required_error: "Status is required and must be one of 'APPROVED' or 'REJECTED'"
        }),
    })
});

export const TravelBuddyValidation = {
    SendBuddyRequestSchema, RespondToTravelBuddySchema
};
