import { RequestHandler } from "express";
import { AuthRequest } from "../middleware/auth";
import mongoose, { Types } from "mongoose";
import { UserReq } from "./users";
import { assertIsDefined } from "../util/assertIsDefined";
import createHttpError from "http-errors";
import GroupModel from "../models/group";
import UserModel from "../models/user";
import NoteModel from "../models/note";

export const getGroup: RequestHandler = async (req: AuthRequest, res, next) => {
    const { userId } = <UserReq>req.user;
    const groupId = req.params.groupId;

    try {
        assertIsDefined(userId);
        isIdValid(groupId);

        const group = await GroupModel.findById(groupId).exec();

        if (!group) {
            throw createHttpError(404, "Group not found");
        }

        if (!group.owner.equals(userId)) {
            throw createHttpError(401, "You cannot access this group");
        }

        res.status(200).json(group);

    } catch (error) {
        next(error);
    }
}

export const getGroups: RequestHandler = async (req: AuthRequest, res, next) => {
    const { userId } = <UserReq>req.user;

    try {
        assertIsDefined(userId);

        const groups = await GroupModel.find({ users: userId }).exec();
        res.status(200).json(groups);
    } catch (error) {
        next(error);
    }
}

export const createGroup: RequestHandler = async (req: AuthRequest, res, next) => {
    const { userId } = <UserReq>req.user;
    const name = req.body.name;

    try {
        assertIsDefined(userId);

        if (!name) {
            throw createHttpError(400, "Group must have a name");
        }

        const newGroup = await GroupModel.create({
            owner: userId,
            name: name,
            categories: ["All"],
            users: [userId]
        });

        await UserModel.updateOne({ _id: userId }, { $push: { groups: newGroup._id } }).exec();

        res.status(200).json(newGroup);

    } catch (error) {
        next(error);
    }
}

export const updateGroup: RequestHandler = async (req: AuthRequest, res, next) => {
    const { userId } = <UserReq>req.user;

    try {
        assertIsDefined(userId);

    } catch (error) {
        next(error);
    }
}

export const deleteGroup: RequestHandler = async (req: AuthRequest, res, next) => {
    const { userId } = <UserReq>req.user;
    const groupId = req.params.groupId;

    try {
        assertIsDefined(userId);
        isIdValid(groupId);

        const group = await GroupModel.findById(groupId).exec();

        if (!group) {
            throw createHttpError(404, "Group not found");
        }

        if (!group.owner.equals(userId)) {
            throw createHttpError(401, "You cannot access this group");
        }

        await UserModel.updateMany({ groups: groupId }, { $pull: { groups: groupId } });

        await group.remove();

        res.sendStatus(204);
    } catch (error) {
        next(error);
    }
}

export const addCategory: RequestHandler = async (req: AuthRequest, res, next) => {
    const { userId } = <UserReq>req.user;

    const groupId = req.params.groupId;
    const userObjectId = new Types.ObjectId(userId);


    const category = req.body.name;

    try {
        assertIsDefined(userId);
        isIdValid(groupId);

        if (!category) {
            throw createHttpError(400, "Category must have a name");
        }

        const group = await GroupModel.findById(groupId).exec();

        if (!group) {
            throw createHttpError(404, "Group not found");
        }

        if (!group.users.includes(userObjectId)) {
            throw createHttpError(401, "You cannot access this group");
        }

        if (group.categories.includes(category)) {
            throw createHttpError(401, "Group already has this category");
        }

        group.categories.push(category);

        const updatedGroup = await group.save();

        res.status(200).json(updatedGroup);

    } catch (error) {
        next(error);
    }
}

export const removeCategoryFromGroup: RequestHandler = async (req: AuthRequest, res, next) => {
    const { userId } = <UserReq>req.user;

    const groupId = req.params.groupId;
    const userObjectId = new Types.ObjectId(userId);

    const category = req.body.name;

    try {
        assertIsDefined(userId);
        isIdValid(groupId);

        const group = await GroupModel.findById(groupId).exec();

        if (!group) {
            throw createHttpError(404, "Group not found");
        }

        if (!group.users.includes(userObjectId)) {
            throw createHttpError(401, "You cannot access this group");
        }

        if (!group.categories.includes(category)) {
            throw createHttpError(401, "Group does not have this category");
        }

        const updatedNotes = await NoteModel.updateMany({ groupId: groupId, category: category }, { $set: { category: "All" } });
        const updatedGroup = await GroupModel.findOneAndUpdate({ _id: groupId }, { $pull: { categories: category } }, { new: true }).exec();

        res.status(200).json(updatedGroup);

    } catch (error) {
        next(error);
    }
}

export const addUserToGroup: RequestHandler = async (req: AuthRequest, res, next) => {
    const { userId } = <UserReq>req.user;
    const groupId = req.params.groupId;
    const userObjectId = new Types.ObjectId(userId);

    try {
        assertIsDefined(userId);
        isIdValid(groupId);

        const group = await GroupModel.findById(groupId).exec();

        if (!group) {
            throw createHttpError(404, "Group not found");
        }

        if (group.users.includes(userObjectId)) {
            throw createHttpError(404, "User already joined");
        }

        const updatedUser = await UserModel.updateOne({ _id: userId }, { $push: { groups: groupId } });

        group.users.push(userObjectId);
        await group.save();

        res.status(200).json(updatedUser);

    } catch (error) {
        next(error);
    }
}

export const removeUserFromGroup: RequestHandler = async (req: AuthRequest, res, next) => {
    const { userId } = <UserReq>req.user;
    const groupId = req.params.groupId;
    const userObjectId = new Types.ObjectId(userId);


    try {
        assertIsDefined(userId);
        isIdValid(groupId);

        const group = await GroupModel.findById(groupId).exec();

        if (!group) {
            throw createHttpError(404, "Group not found");
        }

        if (!group.users.includes(userObjectId)) {
            throw createHttpError(404, "User is not in group");
        }

        const updatedUser = await UserModel.updateOne({ _id: userId }, { $pull: { groups: groupId } });
        await GroupModel.updateOne({ _id: groupId }, { $pull: { users: userId } }).exec();

        res.status(204).json(updatedUser);

    } catch (error) {
        next(error);
    }
}

function isIdValid(groupId: string | null) {
    if (!mongoose.isValidObjectId(groupId)) {
        throw createHttpError(400, "Invalid group id");
    }
}