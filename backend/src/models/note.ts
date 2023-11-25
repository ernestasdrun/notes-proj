import { InferSchemaType, model, Schema } from "mongoose";
import User from "./user";

const noteSchema = new Schema({
    userId: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: "User",
    },
    groupId: {
        type: Schema.Types.ObjectId,
        ref: "Group",
    },
    title: {
        type: String,
        required: true,
    },
    text: {
        type: String,
    },
    category: {
        type: String,
    }
}, { timestamps: true });

export type Note = InferSchemaType<typeof noteSchema>;

export default model<Note>("Note", noteSchema);