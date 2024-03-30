"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TripsValidation = exports.CreateTripSchema = void 0;
const zod_1 = require("zod");
exports.CreateTripSchema = zod_1.z.object({
    body: zod_1.z.object({
        userId: zod_1.z.string({
            required_error: "User ID is required",
            invalid_type_error: "User ID must be a string",
        }),
        destination: zod_1.z.string({
            required_error: "Destination is required",
            invalid_type_error: "Destination must be a string",
        }).max(255),
        startDate: zod_1.z.string({
            required_error: "Start date is required",
            invalid_type_error: "Start date must be a string",
        }).regex(/^\d{4}-\d{2}-\d{2}$/, 'Invalid date format (YYYY-MM-DD)'),
        endDate: zod_1.z.string({
            required_error: "End date is required",
            invalid_type_error: "End date must be a string",
        }).regex(/^\d{4}-\d{2}-\d{2}$/, 'Invalid date format (YYYY-MM-DD)'),
        budget: zod_1.z.number({
            required_error: "Budget is required",
            invalid_type_error: "Budget must be a number",
        }).min(0, 'Budget must be a positive number'),
        activities: zod_1.z.array(zod_1.z.string({
            invalid_type_error: "Activity must be a string",
        })),
    })
});
exports.TripsValidation = {
    CreateTripSchema: exports.CreateTripSchema,
};
