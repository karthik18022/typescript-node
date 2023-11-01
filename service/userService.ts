import { Request, Response } from 'express'; // Import Request and Response from Express
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken');
const Utils = require('../Utils/userUtils.js');

import User from "../models/User"
const ApiError = require('../error/ApiError')


exports.userCreation = async (req: Request, res: Response): Promise<any> => {
    interface RequestBody {
        email: string;
        firstName: string;
        lastName: string;
        password: string;
    }

    const { email, firstName, lastName, password }: RequestBody = req.body;
    const existingUser:unknown =  await User.findOne({where: { email: email } });
    if (existingUser) {
        res.status(400).send('email already exists, please login');
        return res;
    }

const hashPassword:string = await hashGeneration(password);
    try {
        const newUser = new User({
            email,
            firstName,
            lastName,
            password: hashPassword 
        })
    
        await newUser.save();
        res.status(201).json(newUser);
    } catch (err) {
        console.error('user creation error',err);
        res.status(500).json({ error: 'User creation failed' });
    }
   
}

exports.login = async(req:Request, res:Response): Promise<any> => {
    try {
        interface RequestBody {
            email: string;
            password: string;
        }
        const {email, password}: RequestBody = req.body;
        const user:User| null = await User.findOne({where: { email: email } });
        if (!user || user === null) {
           throw new ApiError('NOT_FOUND', 404, true, 'user not found');
        }
    
        const value = await checkPassword(password, user.password, user.email, user.id);
        return res.status(200).json(value);
    } catch(err) {
        throw new ApiError('NOT_FOUND', 404, true, 'user not found', res)

    }

}

exports.userDetails = async (req:Request, res:Response): Promise<any> => {
    const response = Utils.getUserId(req, res);
    const userId:number = response.userId;
    const user = await User.findOne({where: {id: userId}});
    res.status(200).json(user);
}

exports.healthcheck =  async (req:Request, res:Response): Promise<any> => {
    res.send('server running...');
}

const hashGeneration = async (password: string): Promise<string> => {
    try {
        const hash:string = await bcrypt.hash(password, 10);
        return hash;
    } catch (err) {
        console.error("Error hashing the value:", err);
        throw err; // You may want to handle the error differently here
    }
}

const checkPassword = async (password:string, userPassword:string, email:string, userId:number) => {
    try {
        const match = await bcrypt.compare(password, userPassword);

        if (!match) {
            return {
                error: "Password does not match"
            };
        }
        const token = jwt.sign({ email, userId: userId, },
             'ben103');
        const response = {
            message: "User signed in!",
            token: token,
        };

        return response;
    } catch (err) {
        console.error("Error comparing passwords or signing JWT:", err);
        throw err; // You may want to handle the error differently here
    }
};