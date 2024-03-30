"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.unauthorizedErrorHandler = exports.genericErrorHandler = void 0;
const http_status_1 = __importDefault(require("http-status"));
// Generic error handling middleware
const genericErrorHandler = (err, req, res, next) => {
    res.status(http_status_1.default.INTERNAL_SERVER_ERROR).json({
        success: false,
        message: (err === null || err === void 0 ? void 0 : err.name) || 'Internal Server Error',
        errorDetails: err,
    });
    console.log(err);
};
exports.genericErrorHandler = genericErrorHandler;
// Unauthorized error handling middleware
const unauthorizedErrorHandler = (err, req, res, next) => {
    res.status(http_status_1.default.UNAUTHORIZED).json({
        success: false,
        message: 'Unauthorized Access',
        errorDetails: err,
    });
};
exports.unauthorizedErrorHandler = unauthorizedErrorHandler;
