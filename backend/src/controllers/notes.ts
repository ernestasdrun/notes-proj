import { RequestHandler } from "express";
import createHttpError from "http-errors";
import mongoose, { Schema } from "mongoose";
import { AuthRequest } from "../middleware/auth";
import NoteModel, { Note } from "../models/note";
import { assertIsDefined } from "../util/assertIsDefined";
import { UserReq } from "./users";
import UserModel from "../models/user";
import GroupModel from "../models/group";

export const getNotes: RequestHandler = async (req: AuthRequest, res, next) => {
    const { userId } = <UserReq> req.user;
    const groupId = req.body.groupId;
    let notes: unknown = null;

    console.log(req.body);
    try {
        assertIsDefined(userId);

        if (groupId) {
            notes = await NoteModel.find({groupId: groupId}).exec();
        } else {
            notes = await NoteModel.find({userId: userId, groupId: null}).exec();
        }

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

export const createNote: RequestHandler = async (req: AuthRequest, res, next) => {
    const title = req.body.title;
    const text = req.body.text;
    const category = req.body.category;
    const groupId = req.params.groupId;
    const { userId } = <UserReq> req.user;

    try {
        assertIsDefined(userId);

        if (!title) {
            throw createHttpError(400, "Note must have a title");
        }

        const newNote = await NoteModel.create({
            userId: userId,
            groupId: groupId,
            title: title,
            text: text,
            category: category,
        });

        if (groupId) {
            await GroupModel.updateOne({_id: groupId}, {$push: {notes: newNote._id}}).exec();
        }

        res.status(201).json(newNote);
    } catch (error) {
        next(error);
    }
};

export const updateNote: RequestHandler = async (req: AuthRequest, res, next) => {
    const noteId = req.params.noteId;
    const newCategory = req.body.category;
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
        note.category = newCategory;

        const updatedNote = await note.save();

        res.status(200).json(updatedNote);
    } catch (error) {
        next(error);
    }
}

export const deleteNote: RequestHandler = async (req: AuthRequest, res, next) => {
    const noteId = req.params.noteId;
    const { userId } = <UserReq> req.user;
    const groupId = req.params.groupId;

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

        if (groupId) {
            await GroupModel.updateOne({_id: groupId}, {$pull: {notes: noteId}}).exec();
        }

        await note.remove();

        res.sendStatus(204);
    } catch (error) {
        next(error);
    }
}