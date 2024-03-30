"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const routes_ts_1 = __importDefault(require("./app/routes.ts"));
const http_status_1 = __importDefault(require("http-status"));
const errorHandler_1 = require("./app/middlewares/errorHandler");
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
// Parser
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({
    extended: true
}));
app.get('/', (req, res) => {
    res.send(`
        <div style="font-family: 'Poppins', sans-serif; font-weight: 700; font-size: 20px; text-align: center; padding-top: 20px; color: #4b0082;">
            <p>TrekTrax Travel Buddy Server Running.....!!</p>
        </div>
    `);
});
app.use('/api', routes_ts_1.default);
// Register error handling middleware
app.use(errorHandler_1.genericErrorHandler);
app.use(errorHandler_1.unauthorizedErrorHandler);
// Not found handler
app.use((req, res, next) => {
    res.status(http_status_1.default.NOT_FOUND).json({
        success: false,
        message: "API Not Found!",
        error: {
            path: req.originalUrl,
            message: "Your requested path is not found!",
        },
    });
});
exports.default = app;
