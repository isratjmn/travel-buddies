"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const auth_routes_1 = require("../modules/Auth/auth.routes");
const user_routes_1 = require("../modules/User/user.routes");
const trip_routes_1 = require("../modules/Trip/trip.routes");
const travelbuddy_routes_1 = require("../modules/TravelBuddy/travelbuddy.routes");
const profile_routes_1 = require("../modules/Profile/profile.routes");
const router = express_1.default.Router();
const moduleRoutes = [
    {
        path: '/user',
        route: user_routes_1.userRoutes
    },
    {
        path: '/auth',
        route: auth_routes_1.authRoutes
    },
    {
        path: '/trips',
        route: trip_routes_1.tripsRoutes
    },
    {
        path: '/trip',
        route: trip_routes_1.tripRoutes
    },
    {
        path: '/travel-buddies',
        route: travelbuddy_routes_1.travelBuddyRoutes
    },
    {
        path: '/profile',
        route: profile_routes_1.profileRoutes
    },
];
moduleRoutes.forEach(route => router.use(route.path, route.route));
exports.default = router;
