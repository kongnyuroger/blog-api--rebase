import { createUser, findUser, getUser, updateProfilePicture } from "./user.model.js";
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

export const userService = {
    async createUser(reqbody){
        if (!reqbody.username || !reqbody.password || !reqbody.email) {
            const err = new Error('username, password and email required');
            err.code = 'VALIDATION';
            throw err;
        }
        const userExist = await findUser(reqbody.email)
        if(userExist){
            const err = new Error("User already exists with this email");
            err.code = 'DUPLICATE';
            throw err;
        }
        if(reqbody.password.length < 8){
            const err = new Error("Password must be at least 8 characters");
            err.code = 'VALIDATION';
            throw err;
        }
        const hashedPassword = await bcrypt.hash(reqbody.password, 10)
        reqbody.password = hashedPassword
        const result = {
            message: 'Registration successful',
            user: await createUser(reqbody)
        }
        return result
    },

    async loginUser(reqbody){
        if (!reqbody.email || !reqbody.password) {
            const err = new Error('Email and password required');
            err.code = 'VALIDATION';
            throw err;
        }
        const user = await findUser(reqbody.email)
        if(!user){
            const err = new Error(`No account found for ${reqbody.email}`);
            err.code = 'UNAUTHORIZED';
            throw err;
        }

        const match = await bcrypt.compare(reqbody.password, user.password)
        if(!match){
            const err = new Error("Incorrect password");
            err.code = 'UNAUTHORIZED';
            throw err;
        }

        const token = jwt.sign(
            { id: user.id, username: user.name, email: user.email },
            process.env.JWT_SECRET,
            { expiresIn: '6h' }
        );
        return { message: 'Login successful', token };
    },

    async getCurrentUser(reqUser){
        const user = await getUser(reqUser)
        return user;
    },

    async uploadProfilePicture(userId, filePath) {
        const user = await updateProfilePicture(userId, filePath);
        if (!user) {
            const err = new Error("User not found");
            err.code = 'NOT_FOUND';
            throw err;
        }
        return {
            message: "Profile picture updated successfully",
            user,
        };
    },
}
