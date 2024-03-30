"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TravelBuddyValidation = void 0;
const zod_1 = require("zod");
const SendBuddyRequestSchema = zod_1.z.object({
    body: zod_1.z.object({
        userId: zod_1.z.string({
            required_error: "User ID is required",
            invalid_type_error: "User ID must be a string",
        }),
    })
});
const RespondToTravelBuddySchema = zod_1.z.object({
    body: zod_1.z.object({
        status: zod_1.z.enum(['APPROVED', 'REJECTED'], {
            required_error: "Status is required and must be one of 'APPROVED' or 'REJECTED'"
        }),
    })
});
exports.TravelBuddyValidation = {
    SendBuddyRequestSchema, RespondToTravelBuddySchema
};
