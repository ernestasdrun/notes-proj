import { InferSchemaType, model, Schema } from "mongoose";

const userSchema = new Schema({
    userName: {
        type: String,
        required: true,
        unique: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        select: false
    },
    password: {
        type: String,
        required: true,
        unique: true,
        select: false
    },
    categories: [{
        type: String,
    }],
    groups: [{
        type: Schema.Types.ObjectId,
        ref: "Group",
    }]
}, { timestamps: true });

type User = InferSchemaType<typeof userSchema>;

export default model<User>("User", userSchema);