import { IUser } from "../features/auth/authSlice";
import { Group } from "../models/group";

export function isGroup(categoryContainer: IUser | Group): categoryContainer is Group {
    return (categoryContainer as Group)._id !== undefined && typeof (categoryContainer as Group)._id === "string";
}