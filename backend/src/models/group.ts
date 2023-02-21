import { InferSchemaType, model, Schema } from "mongoose";
import User from "./user";

const groupSchema = new Schema({
    owner: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: "User",
    },
    name: {
        type: String,
        required: true,
    },
    categories: [{
        type: String,
    }],
    users: [{
        type: Schema.Types.ObjectId,
        ref: "User",
    }]
}, { timestamps: true });

type Group = InferSchemaType<typeof groupSchema>;

export default model<Group>("Group", groupSchema);