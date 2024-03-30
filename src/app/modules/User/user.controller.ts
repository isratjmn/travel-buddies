
import { Response, Request } from 'express';
import { UserService } from './user.service';
import asyncHandler from '../../../mutual/asyncHandler';
import ConsignResponse from '../../../mutual/ConsignResponse';
import httpStatus from 'http-status';

const createUser = asyncHandler(async (req: Request, res: Response) => {
    const result = await UserService.createUser(req.body);
    const { password, ...userData } = result;
    ConsignResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "User Created Successfully",
        data: userData
    });
});


export const UserControllers = {
    createUser
};