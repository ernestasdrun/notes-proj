import { RequestHandler, Request } from "express";
import createHttpError from "http-errors";
import jwt from "jsonwebtoken";
import env from "../util/validateEnv";

export interface AuthRequest extends Request {
    user?: string | jwt.JwtPayload | undefined;
}

export const requiresAuth: RequestHandler = (req: AuthRequest, res, next) => {
    const token = req.headers.authorization?.split(" ")[1];
    if (token) {
        jwt.verify(token, env.ACCESS_TOKEN_SECRET, (err, user) => {
            if (err) return res.sendStatus(403);
            req.user = user;
            next();
        });
    } else {
        next(createHttpError(401, "User not authenticated"));
    }
};