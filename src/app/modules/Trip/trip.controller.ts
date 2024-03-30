import { Response, Request } from 'express';
import httpStatus from 'http-status';
import ConsignResponse from '../../../mutual/ConsignResponse';
import { TripServices } from './trip.service';
import asyncHandler from '../../../mutual/asyncHandler';

const createTrip = asyncHandler(async (req: Request, res: Response) => {
    const tripData = req.body;

    const userId = req.body?.userId;
    const newTrip = await TripServices.createTrip(tripData, userId);
    const formattedTrip = {
        ...newTrip,
        startDate: newTrip.startDate.toISOString().split('T')[0],
        endDate: newTrip.endDate.toISOString().split('T')[0]
    };
    return ConsignResponse(res, {
        statusCode: httpStatus.CREATED,
        success: true,
        message: 'Trip created successfully',
        data: formattedTrip,
    });

});

/* const getTrips = asyncHandler(async (req: Request, res: Response) => {
    const trips = await TripServices.getTrips();
    return ConsignResponse(res, {
        statusCode: httpStatus.CREATED,
        success: true,
        message: 'Trips retrieved successfully',
        data: trips,
    });
}); */


const getTrips = asyncHandler(
    async (req: Request, res: Response) => {
        try
        {
            const result = await TripServices.getTrips(req.query);
            return res.status(httpStatus.OK).json(result);
        } catch (error: any)
        {
            return res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
                success: false,
                statusCode: httpStatus.INTERNAL_SERVER_ERROR,
                message: 'Failed to fetch trips',
                error: error?.name,
            });
        }
    }
);


const sendRequest = asyncHandler(
    async (req: Request, res: Response) => {
        const { tripId } = req.params;
        const userId = req.body?.userId;
        const request = await TripServices.sendTravelBuddyRequest(tripId, userId);
        return ConsignResponse(res, {
            statusCode: httpStatus.CREATED,
            success: true,
            message: 'Travel buddy request sent successfully....!!!',
            data: request,
        });
    }
);


export const TripControllers = {
    createTrip, getTrips, sendRequest
};