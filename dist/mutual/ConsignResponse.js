"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ConsignResponse = (res, jsonData) => {
    res.status(jsonData.statusCode).json({
        success: jsonData.success,
        message: jsonData.message,
        meta: jsonData.meta || null || undefined,
        data: jsonData.data || null || undefined
    });
};
exports.default = ConsignResponse;
