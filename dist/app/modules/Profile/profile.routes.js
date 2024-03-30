"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.profileRoutes = void 0;
const express_1 = __importDefault(require("express"));
const profile_controller_1 = require("./profile.controller");
const auth_1 = __importDefault(require("../../middlewares/auth"));
const requstValidate_1 = __importDefault(require("../../middlewares/requstValidate"));
const profile_validation_1 = require("./profile.validation");
const router = express_1.default.Router();
router.get('/', auth_1.default, profile_controller_1.UserProfileControllers.getUserProfile);
router.put('/', auth_1.default, (0, requstValidate_1.default)(profile_validation_1.UserProfileValidation.UpdateProfileSchema), profile_controller_1.UserProfileControllers.updateProfile);
exports.profileRoutes = router;
