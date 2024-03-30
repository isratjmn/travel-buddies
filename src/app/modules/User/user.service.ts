import { PrismaClient } from "@prisma/client";
import bcrypt from 'bcrypt';

const prisma = new PrismaClient();

const createUser = async (data: any) => {
    try
    {
        const existingUser = await prisma.user.findUnique({
            where: {
                email: data.email,
            },
        });
        if (existingUser)
        {
            throw new Error('Email Already Exists!!!');
        }
        const hashedPassword: string = await bcrypt.hash(data.password, 12);

        const userData = {
            name: data.name,
            email: data.email,
            password: hashedPassword,
            userProfile: {
                create: {
                    bio: data.profile.bio,
                    age: data.profile.age
                }
            }
        };
        const newUserAndProfile = await prisma.$transaction(async (transactionClient) => {
            const createUserData = await transactionClient.user.create({
                data: userData,
                include: {
                    userProfile: true
                }
            });
            return createUserData;
        });
        return newUserAndProfile;
    } catch (err)
    {
        throw err;
    }
};


export const UserService = {
    createUser
};