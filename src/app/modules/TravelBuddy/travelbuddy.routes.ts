
import express from 'express';
import { TravelBuddyControllers } from './travelbuddy.controller';
import auth from '../../middlewares/auth';

const router = express.Router();

router.get('/:tripId', auth, TravelBuddyControllers.getPotentialTravelBuddies);

router.put('/:buddyId/respond', auth, TravelBuddyControllers.respondToRequest);

export const travelBuddyRoutes = router;