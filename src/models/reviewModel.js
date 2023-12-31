import mongoose from 'mongoose';

const ObjectId = mongoose.Schema.Types.ObjectId;

const reviewSchema = mongoose.Schema(   
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
            required: true
        },
        score: {
            type: Number,
            required: true,
            min: 1,
            max: 10
        },
        description: {
            type: String,
            required: false,
            maxLength: 256
        }
    },
    {
        timestamps: true
    }
);

const Review = mongoose.model('Reviews', reviewSchema);

export default Review;