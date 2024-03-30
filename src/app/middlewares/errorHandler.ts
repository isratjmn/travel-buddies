

import { NextFunction, Request, Response } from 'express';
import { z } from 'zod';
import httpStatus from 'http-status';

// Generic error handling middleware
const genericErrorHandler = (
    err: Error,
    req: Request,
    res: Response,
    next: NextFunction
) => {
    res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
        success: false,
        message: err?.name || 'Internal Server Error',
        errorDetails: err,
    });
    console.log(err);
};

// Unauthorized error handling middleware
const unauthorizedErrorHandler = (
    err: Error,
    req: Request,
    res: Response,
    next: NextFunction
) => {
    res.status(httpStatus.UNAUTHORIZED).json({
        success: false,
        message: 'Unauthorized Access',
        errorDetails: err,
    });
};

export { genericErrorHandler, unauthorizedErrorHandler };

