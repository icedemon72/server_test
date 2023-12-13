import User from "../models/userModel.js";
import bcrypt from "bcrypt";

export const registerUser = async (user) => {
    try {
        if(!user.email.match('/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g')) {
            throw new ReferenceError('Unet je nevalidan e-mail!');
        }

        if(user.password.length <= 3) {
            throw new ReferenceError('Lozinka mora sadržati bar 3 karaktera!');
        } 

        const userExists = await User.findOne({$or: [{"email": user.email}, {"username": user.username}]});

        if(userExists) {
            throw new ReferenceError('Korisničko ime ili e-mail adresa već postoje!');
        } 
    
        user.password = await bcrypt.hash(user.password, 10);

        const userObj = await User.create(user);
        return userObj;
    } catch (err) {
        return new Error(err);
    }
}

export const loginUser = async () => {

}

export const logout = async () => {
    
}