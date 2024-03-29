import "dotenv/config";
import express, { NextFunction, Request, Response } from "express";
import notesRoutes from "./routes/notes";
import userRoutes from "./routes/users";
import groupsRoutes from "./routes/groups";
import morgan from "morgan";
import createHttpError, { isHttpError } from "http-errors";
import cors from "cors";
import { requiresAuth } from "./middleware/auth";

const app = express();
app.use(cors());

app.use(morgan("dev"));

//lets backend receive json as req body
app.use(express.json());

app.use("/api/notes", requiresAuth, notesRoutes);

app.use("/api/groups", requiresAuth, groupsRoutes);

app.use("/api/users", userRoutes);

app.use((req, res, next) => {
    next(createHttpError(404, "Endpoint not found"));
});

// eslint-disable-next-line @typescript-eslint/no-unused-vars
app.use((error: unknown, req: Request, res: Response, next: NextFunction) => {
    console.error(error);
    let errorMesage = "An unknown error occured";
    let statusCode = 500;
    if (isHttpError(error)) {
        statusCode = error.status;
        errorMesage = error.message;
    }
    res.status(statusCode).json({ error: errorMesage });
});

export default app;