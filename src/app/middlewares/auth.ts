import { Request, Response, NextFunction } from 'express';
import { Secret } from 'jsonwebtoken';
import httpStatus from 'http-status';
import APIError from './APIError';
import config from '../../config';
import { jwtUtils } from '../../Utils/jwtUtils';
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

declare global {
    namespace Express {
        interface Request {
            user?: {
                id: string;
                email: string;
                name: string;
            };
        }
    }
}

const auth = async (req: Request & { user?: any; }, res: Response, next: NextFunction) => {
    try
    {
        const token = req.headers.authorization;

        if (!token)
        {
            return res.status(401).json({
                success: false,
                message: 'Access denied. No token provided...!!',
                errorDetails: 'Token not found..!!',
            });
        }

        const verifiedUser = jwtUtils.verifyToken(token, config.jwt.jwt_secret as Secret);
        const user = await prisma.user.findUnique({
            where: {
                id: verifiedUser.id,
                email: verifiedUser.email,
                name: verifiedUser.name,
            },
        });
        if (!user)
        {
            throw new Error("User not found..!!");
        }
        req.user = verifiedUser;
        next();
    } catch (err)
    {
        next(err);
    }
};

export default auth;