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
const config_1 = __importDefault(require("../../config"));
const jwtUtils_1 = require("../../Utils/jwtUtils");
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
const auth = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const token = req.headers.authorization;
        if (!token) {
            return res.status(401).json({
                success: false,
                message: 'Access denied. No token provided...!!',
                errorDetails: 'Token not found..!!',
            });
        }
        const verifiedUser = jwtUtils_1.jwtUtils.verifyToken(token, config_1.default.jwt.jwt_secret);
        const user = yield prisma.user.findUnique({
            where: {
                id: verifiedUser.id,
                email: verifiedUser.email,
                name: verifiedUser.name,
            },
        });
        if (!user) {
            throw new Error("User not found..!!");
        }
        req.user = verifiedUser;
        next();
    }
    catch (err) {
        next(err);
    }
});
exports.default = auth;
