import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';
import jwt, { Secret } from 'jsonwebtoken';
import APIError from '../../middlewares/APIError';
import httpStatus from 'http-status';
import { jwtUtils } from '../../../Utils/jwtUtils';
import config from '../../../config';

const prisma = new PrismaClient();

const loginUser = async (payload: { email: string, name: string, password: string; }) => {
    const userData = await prisma.user.findUniqueOrThrow({
        where: {
            email: payload.email,
            name: payload.name
        },
    });
    if (!userData)
    {
        throw new APIError(httpStatus.NOT_FOUND, 'User not found !!');
    }
    const passwordMatch: boolean = await bcrypt.compare(payload.password, userData.password);
    if (!passwordMatch)
    {
        throw new Error('Incorrect Password !!');
    }
    const token = jwtUtils.generateToken({
        id: userData.id,
        email: userData.email,
        name: userData.name,
    },
        config.jwt.jwt_secret as Secret,
        config.jwt.expires_in as string
    );
    return {
        id: userData.id,
        name: userData.name,
        email: userData.email,
        token,
    };

};

export const AuthServices = {
    loginUser
};