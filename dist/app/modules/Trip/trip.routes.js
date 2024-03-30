"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.tripsRoutes = exports.tripRoutes = void 0;
const auth_1 = __importDefault(require("../../middlewares/auth"));
const trip_controller_1 = require("./trip.controller");
const express_1 = __importDefault(require("express"));
const trip_validation_1 = require("./trip.validation");
const requstValidate_1 = __importDefault(require("../../middlewares/requstValidate"));
const router = express_1.default.Router();
exports.tripRoutes = router;
exports.tripsRoutes = router;
router.post('/', auth_1.default, (0, requstValidate_1.default)(trip_validation_1.TripsValidation.CreateTripSchema), trip_controller_1.TripControllers.createTrip);
router.get('/', trip_controller_1.TripControllers.getTrips);
router.post('/:tripId/request', auth_1.default, trip_controller_1.TripControllers.sendRequest);
