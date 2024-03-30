import express, { Application, NextFunction, Request, Response } from "express";
import cors from "cors";
import router from "./app/routes.ts";
import httpStatus from "http-status";
import { genericErrorHandler, unauthorizedErrorHandler } from "./app/middlewares/errorHandler";

const app: Application = express();

app.use(cors());
// Parser
app.use(express.json());
app.use(express.urlencoded({
    extended: true
}));

app.get('/', (req: Request, res: Response) => {
    res.send(`
        <div style="font-family: 'Poppins', sans-serif; font-weight: 700; font-size: 20px; text-align: center; padding-top: 20px; color: #4b0082;">
            <p>TrekTrax Travel Buddy Server Running.....!!</p>
        </div>
    `);
});



app.use('/api', router);

// Register error handling middleware
app.use(genericErrorHandler);
app.use(unauthorizedErrorHandler);

// Not found handler
app.use((req: Request, res: Response, next: NextFunction) => {
    res.status(httpStatus.NOT_FOUND).json({
        success: false,
        message: "API Not Found!",
        error: {
            path: req.originalUrl,
            message: "Your requested path is not found!",
        },
    });
});

export default app;