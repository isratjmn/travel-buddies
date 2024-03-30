import { PrismaClient } from "@prisma/client";
import httpStatus from "http-status";
import validateQueryParams from "../../../Utils/validateQueryParams";

const prisma = new PrismaClient();

const createTrip = async (tripData: any, userId: string) => {
    try
    {
        const newTrip = await prisma.trip.create({
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
    } catch (error)
    {
        throw new Error('Failed to create trip');
    }
};


const getTrips = async (queryParams: any) => {
    validateQueryParams(queryParams);
    const {
        destination,
        startDate,
        endDate,
        budget,
        searchTerm,
        minBudget,
        maxBudget,
        page = 1,
        limit = 10,
        sortBy,
        sortOrder,
    } = queryParams;

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

    if (minBudget && maxBudget)
    {
        where.budget = {
            gte: parseInt(minBudget),
            lte: parseInt(maxBudget),
        };
    }

    const [trips, totalCount] = await Promise.all([
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
        statusCode: httpStatus.OK,
        message: 'Trips retrieved successfully!!',
        meta: {
            page: pageNumber,
            limit: limitNumber,
            total: totalCount,
        },
        data: trips,
    };
};

const sendTravelBuddyRequest = async (tripId: string, userId: string) => {
    try
    {
        const request = await prisma.travelBuddyRequest.create({
            data: {
                tripId,
                userId,
                status: 'PENDING',
            },
        });
        return request;
    } catch (error)
    {
        throw new Error('Failed to send travel buddy request');
    }
};

export const TripServices = {
    createTrip, getTrips, sendTravelBuddyRequest
};