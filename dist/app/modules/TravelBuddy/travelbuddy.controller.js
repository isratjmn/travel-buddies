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
exports.TravelBuddyControllers = void 0;
const http_status_1 = __importDefault(require("http-status"));
const ConsignResponse_1 = __importDefault(require("../../../mutual/ConsignResponse"));
const travelbuddy_service_1 = require("./travelbuddy.service");
const asyncHandler_1 = __importDefault(require("../../../mutual/asyncHandler"));
const getPotentialTravelBuddies = (0, asyncHandler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { tripId } = req.params;
    const potentialBuddies = yield travelbuddy_service_1.TravelBuddyServices.getTravelBuddies(tripId);
    return (0, ConsignResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: 'Potential travel buddies retrieved successfully...!!',
        data: potentialBuddies,
    });
}));
const respondToRequest = (0, asyncHandler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { buddyId } = req.params;
    const { status } = req.body;
    const response = yield travelbuddy_service_1.TravelBuddyServices.respondToTravelBuddy(buddyId, status);
    return (0, ConsignResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: 'Travel buddy request responded successfully',
        data: response,
    });
}));
exports.TravelBuddyControllers = {
    getPotentialTravelBuddies, respondToRequest
};
