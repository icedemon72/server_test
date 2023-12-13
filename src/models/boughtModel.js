import mongoose from "mongoose";

const ObjectId = mongoose.Schema.Types.ObjectId;

const boughtSchema = mongoose.Schema(
    {
        user: {
            type: Object,
            name: {
                type: String,
                requred: true
            },
            id: {
                type: ObjectId,
                required: true
            },
            required: true
        },
        product: {
            type: Object,
            name: {
                type: String,
                requred: true
            },
            id: {
                type: ObjectId,
                required: true
            },
            price: {
                type: Number,
                required: true
            },
            required: true
        }
    },
    {
        timestamps: true
    }
);

const Bought = mongoose.model('Bought', boughtSchema);

export default Bought;