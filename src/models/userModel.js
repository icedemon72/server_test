import mongoose from 'mongoose';

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
            type: String,
            required: [true, "Name is required!"]
        },
        address: {
            type: String,
            required: [true, "Address is required!"]
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