
import auth from '../../middlewares/auth';
import { TripControllers } from './trip.controller';
import express from 'express';
import { TripsValidation } from './trip.validation';
import requestvalidate from '../../middlewares/requstValidate';

const router = express.Router();

router.post('/',
    auth,
    requestvalidate(TripsValidation.CreateTripSchema),
    TripControllers.createTrip);

router.get('/', TripControllers.getTrips);

router.post('/:tripId/request', auth, TripControllers.sendRequest);

export { router as tripRoutes, router as tripsRoutes };






