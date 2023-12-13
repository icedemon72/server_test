import mongoose from 'mongoose';

const ObjectId = mongoose.Schema.Types.ObjectId;

const userSchema = mongoose.Schema(
    {
        username: {
            type: String, 
            required: [true, "Username is required!"]
        },
        email: {
            type: String,
            required:  [true, "Email is required!"]
        },
        password: {
            type: String,
            required:  [true, "Password is required!"]
        },
        name: {
            type: Object,
            first: {
                type: String,
                required: [true, "First name is required!"]
            },
            last: {
                type: String,
                required: [true, "Last name is required!"]
            },
            required: true
        },
        address: {
            type: String,
            required: [true, "Address is required!"]
        },
        country: {
            type: Object,
            name: {
                type: String
            },
            code: {
                type: String
            },
            id: {
                type: ObjectId
            },
            required: false
        },
        phone: {
            type: String,
            required: true
        },
        wallet: { // TODO: napraviti poseban server kao PayPal
            type: Number,
            default: 100,
            required: false
        },
        role: {
            type: String,
            default: "User",
            required: false
        }
    }, 
    {
        timestamps:true
    }
);

const User = mongoose.model('User', userSchema);

export default User;