"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserProfileControllers = void 0;
const http_status_1 = __importDefault(require("http-status"));
const ConsignResponse_1 = __importDefault(require("../../../mutual/ConsignResponse"));
const profile_service_1 = require("./profile.service");
const asyncHandler_1 = __importDefault(require("../../../mutual/asyncHandler"));
const getUserProfile = (0, asyncHandler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userProfile = yield profile_service_1.UserProfileServices.getUserProfile();
    return (0, ConsignResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: 'User profile retrieved successfully..!!',
        data: userProfile,
    });
}));
const updateProfile = (0, asyncHandler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const userId = (_a = req.user) === null || _a === void 0 ? void 0 : _a.id;
    console.log("USER", userId);
    const { name, email } = req.body;
    const updatedProfile = yield profile_service_1.UserProfileServices.
        updateUserProfile(userId, { name, email });
    return res.status(http_status_1.default.OK).json({
        success: true,
        statusCode: http_status_1.default.OK,
        message: 'User profile updated successfully',
        data: updatedProfile,
    });
}));
exports.UserProfileControllers = {
    getUserProfile, updateProfile
};
