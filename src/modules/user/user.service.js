import { createUser, findUser, getUser, updateProfilePicture } from "./user.model.js";
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

export const userService = {
    async createUser(reqbody){
        if (!reqbody.username || !reqbody.password || !reqbody.email) {
            throw new Error( 'username , password and email required' );
        }
        const userExist = await findUser(reqbody.email)
        if(userExist){
            throw new Error("User already exists with this email");
        }
        if(reqbody.password.length < 8){
            throw new Error("password must be at least 8 characters");
        }
        const hashedPassword = await bcrypt.hash(reqbody.password, 10)
        reqbody.password = hashedPassword
        const result = {
            message: 'registration successful',
            user: await createUser(reqbody)
        }
        return  result 
    },

    async loginUser(reqbody){
        
        const user = await findUser(reqbody.email)
        if(!user){
            throw new Error(`User with email ${reqbody.email} does not exist`);
        }
    
        const password = await bcrypt.compare(reqbody.password, user.password)
        if(!password){ 
            throw new Error ("password is incorrect")
        }

        const token = jwt.sign(
            { id: user.id, username: user.name , email: user.email},
            'my_secretkey',
            { expiresIn: '6h' }
        );
        const result = {
            message: 'Login successful', 
            token
        }
        return result;

    },

    async getCurrentUser(reqUser){
        const user = await getUser(reqUser)
        return user;
    },

    async uploadProfilePicture(userId, filePath) {
        const user = await updateProfilePicture(userId, filePath);
        if (!user) {
            throw new Error("User not found");
        }
        return {
            message: "Profile picture updated successfully",
            user,
        };
    },

}


