import httpStatus from "http-status";
import ConsignResponse from "../../../mutual/ConsignResponse";
import { Response, Request } from 'express';
import { TravelBuddyServices } from "./travelbuddy.service";
import asyncHandler from "../../../mutual/asyncHandler";


const getPotentialTravelBuddies = asyncHandler(
    async (req: Request, res: Response) => {
        const { tripId } = req.params;
        const potentialBuddies = await TravelBuddyServices.getTravelBuddies(tripId);

        return ConsignResponse(res, {
            statusCode: httpStatus.OK,
            success: true,
            message: 'Potential travel buddies retrieved successfully...!!',
            data: potentialBuddies,
        });
    }
);

const respondToRequest = asyncHandler(
    async (req: Request, res: Response) => {
        const { buddyId } = req.params;
        const { status } = req.body;
        const response = await TravelBuddyServices.respondToTravelBuddy(buddyId, status);
        return ConsignResponse(res, {
            statusCode: httpStatus.OK,
            success: true,
            message: 'Travel buddy request responded successfully',
            data: response,
        });

    }
);

export const TravelBuddyControllers = {
    getPotentialTravelBuddies, respondToRequest
}; 