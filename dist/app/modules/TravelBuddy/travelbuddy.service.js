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
exports.TravelBuddyServices = void 0;
// @ts-nocheck
const client_1 = require("@prisma/client");
const APIError_1 = __importDefault(require("../../middlewares/APIError"));
const http_status_1 = __importDefault(require("http-status"));
const prisma = new client_1.PrismaClient();
const getTravelBuddies = (tripId) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const potentialBuddies = yield prisma.travelBuddyRequest.findMany({
            where: { tripId },
            include: { user: true },
        });
        return potentialBuddies;
    }
    catch (error) {
        throw new Error('Failed to retrieve potential travel buddies');
    }
});
const respondToTravelBuddy = (buddyId, status) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // Check if the travel buddy request exists
        const buddyRequest = yield prisma.travelBuddyRequest.findUnique({
            where: {
                id: buddyId,
            },
        });
        if (!buddyRequest) {
            throw new APIError_1.default(http_status_1.default.NOT_FOUND, 'Travel buddy request not found');
        }
        const updatedRequest = yield prisma.travelBuddyRequest.update({
            where: {
                id: buddyId,
            },
            data: {
                status,
            },
        });
        return updatedRequest;
    }
    catch (error) {
        throw new APIError_1.default(http_status_1.default.INTERNAL_SERVER_ERROR, 'Failed to respond to travel buddy request');
    }
});
exports.TravelBuddyServices = {
    getTravelBuddies, respondToTravelBuddy
};
