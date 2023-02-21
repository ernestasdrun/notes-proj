import { RequestHandler } from "express";
import createHttpError from "http-errors";
import UserModel from "../models/user";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import env from "../util/validateEnv";
import { AuthRequest } from "../middleware/auth";

export interface UserReq {
    userId: string,
    username: string,
}

export const getAuthenticatedUser: RequestHandler = async (req: AuthRequest, res, next) => {
    const { userId } = <UserReq> req.user;
    try {
        if (!userId) throw createHttpError(400, "error")
        const user = await UserModel.findById(userId).select(["+email", "-__v", "-createdAt", "-updatedAt"]).exec();
        res.status(200).json(user);
    } catch (error) {
        next(error);
    }
}

interface SignUpBody {
    username?: string,
    email?: string,
    password?: string,
}

export const signUp: RequestHandler<unknown, unknown, SignUpBody, unknown> = async (req, res, next) => {
    const username = req.body.username;
    const email = req.body.email;
    const passwordRaw = req.body.password;

    try {
        if (!username || !email || !passwordRaw) {
            throw createHttpError(400, "Parameters missing");
        }

        const existingUsername = await UserModel.findOne({ userName: username }).exec();

        if (existingUsername) {
            throw createHttpError(409, "Username already taken");
        }

        const existingEmail = await UserModel.findOne({ email: email }).exec();

        if (existingEmail) {
            throw createHttpError(409, "Email already exists");
        }

        const passwordHashed = await bcrypt.hash(passwordRaw, 10);

        const newUser = await UserModel.create({
            userName: username,
            email: email,
            password: passwordHashed,
        });

        const token = jwt.sign({
            userId: newUser._id,
            username: newUser.userName,
        }, env.ACCESS_TOKEN_SECRET, {expiresIn: "1d"});

        res.status(201).json({
            "userId": newUser._id,
            "username": newUser.userName,
            "token": token,
        });
    } catch (error) {
        next(error);
    }
};

interface LoginBody {
    username?: string,
    password?: string,
}

export const login: RequestHandler<unknown, unknown, LoginBody, unknown> = async (req, res, next) => {
    const username = req.body.username;
    const password = req.body.password;

    try {
        if (!username || !password) {
            throw createHttpError(400, "Parameters missing");
        }

        const user = await UserModel.findOne({ userName: username }).select("+password +email").exec();

        if (!user) {
            throw createHttpError(401, "Invalid credentials");
        }

        const passwordMatch = await bcrypt.compare(password, user.password);

        if (!passwordMatch) {
            throw createHttpError(401, "Invalid credentials");
        }

        const token = jwt.sign({
            userId: user._id,
            username: user.userName,
        }, env.ACCESS_TOKEN_SECRET, {expiresIn: "1d"});

        res.status(201).json({
            "userId": user._id,
            "username": user.userName,
            "token": token,
        });
    } catch (error) {
        next(error);
    }
}

export const logout: RequestHandler = async (req, res, next) => {

    //TODO delete and implement JWT
    /*req.session.destroy(error => {
        if (error) {
            next(error);
        } else {
            res.sendStatus(200);
        }
    });*/
}