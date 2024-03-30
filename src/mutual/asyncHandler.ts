import { NextFunction, Request, RequestHandler, Response } from "express";

const asyncHandler = (fn: RequestHandler) => {
    return async (req: Request, res: Response, next: NextFunction) => {
        try
        {
            await fn(req, res, next);
        }
        catch (err)
        {
            next(err);
        }
    };
};

export default asyncHandler;