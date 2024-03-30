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
exports.AuthControllers = void 0;
const ConsignResponse_1 = __importDefault(require("../../../mutual/ConsignResponse"));
const http_status_1 = __importDefault(require("http-status"));
const auth_service_1 = require("./auth.service");
const asyncHandler_1 = __importDefault(require("../../../mutual/asyncHandler"));
const user_service_1 = require("../User/user.service");
const registerUser = (0, asyncHandler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield user_service_1.UserService.createUser(req.body);
    (0, ConsignResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: 'User registered successfully.....!!',
        data: {
            id: result.id,
            name: result.name,
            email: result.email
        }
    });
}));
const login = (0, asyncHandler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, email, password } = req.body;
    const result = yield auth_service_1.AuthServices.loginUser({ name, email, password });
    (0, ConsignResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: "User Login Successfully......!!",
        data: {
            id: result.id,
            name: result.name,
            email: result.email,
            token: result.token,
        }
    });
}));
exports.AuthControllers = {
    registerUser,
    login
};
