import mongoose from "mongoose";

const ObjectId = mongoose.Schema.Types.ObjectId;

const sessionSchema = Schema(
    {
        userId: {
            type: ObjectId,
            required: true
        },
        refreshToken: {
            type: String
        },
        active: {
            type: Boolean
        },
        userAgent: {
            type: String
        }
    }
);

const Session = model("Session", sessionSchema);

export default Session;