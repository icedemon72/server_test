import User from "../models/userModel.js";
import { registerUser } from "../services/userService.js";

export const handleUserRegister = async (req, res) => {
    try {
        let user = {
            ...req.body
        };

        const done = registerUser(user);
        res.status(200).json(done);
        
    } catch (err) {
        return res.status(500).send(err.message);
    }
}