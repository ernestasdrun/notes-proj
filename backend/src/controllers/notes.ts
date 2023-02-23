import { RequestHandler } from "express";
import createHttpError from "http-errors";
import mongoose, { Schema } from "mongoose";
import { AuthRequest } from "../middleware/auth";
import NoteModel from "../models/note";
import { assertIsDefined } from "../util/assertIsDefined";
import { UserReq } from "./users";
import UserModel from "../models/user";

export const getNotes: RequestHandler = async (req: AuthRequest, res, next) => {
    const { userId } = <UserReq> req.user;
    const groupId = req.body.groupId;

    try {
        assertIsDefined(userId);

        /*if (groupId) {
            const notes = await NoteModel.find({: userId}).exec();
        } else {
            const notes = await NoteModel.find({userId: userId}).exec();
        }*/

        const notes = await NoteModel.find({userId: userId}).exec();

        res.status(200).json(notes);
    } catch (error) {
        next(error);
    }
};

export const getNote: RequestHandler = async (req: AuthRequest, res, next) => {
    const noteId = req.params.noteId;
    const { userId } = <UserReq> req.user;

    try {
        assertIsDefined(userId);

        if (!mongoose.isValidObjectId(noteId)) {
            throw createHttpError(400, "Invalid note id");
        }

        const note = await NoteModel.findById(noteId).exec();

        if (!note) {
            throw createHttpError(404, "Note not found");
        }

        if (!note.userId.equals(userId)) {
            throw createHttpError(401, "You cannot access this note");
        }

        res.status(200).json(note);
    } catch (error) {
        next(error);
    }
};

interface ICreateNoteBody {
    title?: string,
    text?: string,
}

//export const createNote: RequestHandler<unknown, unknown, ICreateNoteBody, unknown> = async (req: AuthRequest, res, next) => {
export const createNote: RequestHandler = async (req: AuthRequest, res, next) => {
    const title = req.body.title;
    const text = req.body.text;
    const category = req.body.category;
    const { userId } = <UserReq> req.user;

    try {
        assertIsDefined(userId);

        if (!title) {
            throw createHttpError(400, "Note must have a title");
        }

        const newNote = await NoteModel.create({
            userId: userId,
            title: title,
            text: text,
            category: category,
        });

        res.status(201).json(newNote);
    } catch (error) {
        next(error);
    }
};

interface IUpdateNotePatams {
    noteId: string,
}

interface IUpdateNoteBody {
    title?: string,
    text?: string,
}

//export const updateNote: RequestHandler<IUpdateNotePatams, unknown, IUpdateNoteBody, unknown> = async (req, res, next) => {
export const updateNote: RequestHandler = async (req: AuthRequest, res, next) => {
    const noteId = req.params.noteId;
    const newTitle = req.body.title;
    const newText = req.body.text;
    const { userId } = <UserReq> req.user;

    try {
        assertIsDefined(userId);

        if (!mongoose.isValidObjectId(noteId)) {
            throw createHttpError(400, "Invalid note id");
        }

        if (!newTitle) {
            throw createHttpError(400, "Note must have a title");
        }

        const note = await NoteModel.findById(noteId).exec();

        if (!note) {
            throw createHttpError(404, "Note not found");
        }

        if (!note.userId.equals(userId)) {
            throw createHttpError(401, "You cannot access this note");
        }

        note.title = newTitle;
        note.text = newText;

        const updatedNote = await note.save();

        res.status(200).json(updatedNote);
    } catch (error) {
        next(error);
    }
}

export const deleteNote: RequestHandler = async (req: AuthRequest, res, next) => {
    const noteId = req.params.noteId;
    const { userId } = <UserReq> req.user;

    try {
        assertIsDefined(userId);

        if (!mongoose.isValidObjectId(noteId)) {
            throw createHttpError(400, "Invalid note id");
        }

        const note = await NoteModel.findById(noteId).exec();

        if (!note) {
            throw createHttpError(404, "Note not found");
        }

        if (!note.userId.equals(userId)) {
            throw createHttpError(401, "You cannot access this note");
        }

        await note.remove();

        res.sendStatus(204);
    } catch (error) {
        next(error);
    }
}