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
exports.TripServices = void 0;
const client_1 = require("@prisma/client");
const http_status_1 = __importDefault(require("http-status"));
const validateQueryParams_1 = __importDefault(require("../../../Utils/validateQueryParams"));
const prisma = new client_1.PrismaClient();
const createTrip = (tripData, userId) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const newTrip = yield prisma.trip.create({
            data: {
                userId,
                destination: tripData.destination,
                startDate: new Date(tripData.startDate),
                endDate: new Date(tripData.endDate),
                budget: tripData.budget,
                activities: tripData.activities,
            },
        });
        return newTrip;
    }
    catch (error) {
        throw new Error('Failed to create trip');
    }
});
const getTrips = (queryParams) => __awaiter(void 0, void 0, void 0, function* () {
    (0, validateQueryParams_1.default)(queryParams);
    const { destination, startDate, endDate, budget, searchTerm, minBudget, maxBudget, page = 1, limit = 10, sortBy, sortOrder, } = queryParams;
    const pageNumber = parseInt(page);
    const limitNumber = parseInt(limit);
    const where = {
        destination: destination ? { contains: destination } : undefined,
        startDate: startDate ? { gte: new Date(startDate) } : undefined,
        endDate: endDate ? { lte: new Date(endDate) } : undefined,
        budget: budget
            ? {
                gte: parseInt(budget.minBudget),
                lte: parseInt(budget.maxBudget),
            }
            : undefined,
        OR: searchTerm
            ? [
                { destination: { contains: searchTerm } },
                { budget: parseInt(searchTerm) },
            ]
            : undefined,
    };
    if (minBudget && maxBudget) {
        where.budget = {
            gte: parseInt(minBudget),
            lte: parseInt(maxBudget),
        };
    }
    const [trips, totalCount] = yield Promise.all([
        prisma.trip.findMany({
            where,
            orderBy: sortBy ? {
                [sortBy]: sortOrder || 'desc'
            } : { budget: 'desc' },
            take: limitNumber,
            skip: (pageNumber - 1) * limitNumber,
        }),
        prisma.trip.count({ where }),
    ]);
    return {
        success: true,
        statusCode: http_status_1.default.OK,
        message: 'Trips retrieved successfully!!',
        meta: {
            page: pageNumber,
            limit: limitNumber,
            total: totalCount,
        },
        data: trips,
    };
});
const sendTravelBuddyRequest = (tripId, userId) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const request = yield prisma.travelBuddyRequest.create({
            data: {
                tripId,
                userId,
                status: 'PENDING',
            },
        });
        return request;
    }
    catch (error) {
        throw new Error('Failed to send travel buddy request');
    }
});
exports.TripServices = {
    createTrip, getTrips, sendTravelBuddyRequest
};
