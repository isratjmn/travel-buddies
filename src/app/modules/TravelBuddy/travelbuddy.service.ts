// @ts-nocheck
import { PrismaClient } from '@prisma/client';
import APIError from '../../middlewares/APIError';
import httpStatus from 'http-status';

const prisma = new PrismaClient();
const getTravelBuddies = async (tripId: string) => {
    try
    {
        const potentialBuddies = await prisma.travelBuddyRequest.findMany({
            where: { tripId },
            include: { user: true },
        });
        return potentialBuddies;
    } catch (error)
    {
        throw new Error('Failed to retrieve potential travel buddies');
    }
};

const respondToTravelBuddy = async (buddyId: string, status: string) => {
    try
    {
        // Check if the travel buddy request exists
        const buddyRequest = await prisma.travelBuddyRequest.findUnique({
            where: {
                id: buddyId,
            },
        });

        if (!buddyRequest)
        {
            throw new APIError(httpStatus.NOT_FOUND, 'Travel buddy request not found');
        }
        const updatedRequest = await prisma.travelBuddyRequest.update({
            where: {
                id: buddyId,
            },
            data: {
                status,
            },
        });

        return updatedRequest;
    } catch (error)
    {
        throw new APIError(httpStatus.INTERNAL_SERVER_ERROR, 'Failed to respond to travel buddy request');
    }
};

export const TravelBuddyServices = {
    getTravelBuddies, respondToTravelBuddy
};