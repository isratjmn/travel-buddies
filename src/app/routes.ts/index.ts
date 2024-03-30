import express from "express";
import { authRoutes } from "../modules/Auth/auth.routes";
import { userRoutes } from "../modules/User/user.routes";
import { tripRoutes, tripsRoutes } from "../modules/Trip/trip.routes";
import { travelBuddyRoutes } from "../modules/TravelBuddy/travelbuddy.routes";
import { profileRoutes } from "../modules/Profile/profile.routes";


const router = express.Router();

const moduleRoutes = [
    {
        path: '/user',
        route: userRoutes
    },
    {
        path: '/auth',
        route: authRoutes
    },
    {
        path: '/trips',
        route: tripsRoutes
    },
    {
        path: '/trip',
        route: tripRoutes
    },
    {
        path: '/travel-buddies',
        route: travelBuddyRoutes
    },
    {
        path: '/profile',
        route: profileRoutes
    },

];

moduleRoutes.forEach(route => router.use(route.path, route.route));

export default router;