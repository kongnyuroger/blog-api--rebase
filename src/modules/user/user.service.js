import { createUser, findUser } from "./user.model.js";
import bcrypt from 'bcrypt'

export const userService = {
    async createUser(user){
        const userExist = await findUser(user.email)
        if(userExist){
            throw new Error("User already exists with this email");
        }
        if(user.password.length < 8){
            throw new Error("password must be at least 8 characters");
        }
        const hashedPassword = await bcrypt.hash(user.password, 10)
        user.password = hashedPassword
        return await createUser(user)
    },

}


