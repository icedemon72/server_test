import mongoose from "mongoose";

const ObjectId = mongoose.Schema.Types.ObjectId;

const boughtSchema = mongoose.Schema(
    {
        user: {
            name: {
                type: String,
                requred: true
            },
            id: {
                type: ObjectId,
                required: true
            }
        },
        product: {
            name: {
                type: String,
                requred: true
            },
            id: {
                type: ObjectId,
                required: true
            }
        }
    },
    {
        timestamps: true
    }
);

const Bought = mongoose.model('Bought', boughtSchema);

export default Bought;