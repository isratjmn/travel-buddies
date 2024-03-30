"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserProfileValidation = void 0;
const zod_1 = require("zod");
const UpdateProfileSchema = zod_1.z.object({
    body: zod_1.z.object({
        name: zod_1.z.string({
            invalid_type_error: "user Name must be a string",
        })
            .min(1).optional(),
        email: zod_1.z.string({
            invalid_type_error: "Email Address must be a string",
        }).email().optional(),
    })
});
exports.UserProfileValidation = {
    UpdateProfileSchema
};
