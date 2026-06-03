import { userService } from "./user.service.js";

// Map error codes set in userService to HTTP status numbers
function httpStatus(code) {
    switch (code) {
        case 'VALIDATION': return 400;
        case 'UNAUTHORIZED': return 401;
        case 'DUPLICATE': return 409;
        case 'NOT_FOUND': return 404;
        default: return 500;
    }
}

export const userController = {
    async create(req, res){
        try{
            const result = await userService.createUser(req.body)
            return res.status(201).json(result)
        }catch(err){
            return res.status(httpStatus(err.code)).json({ error: err.message })
        }
    },

    async login(req, res){
        try{
            const result = await userService.loginUser(req.body)
            return res.status(200).json(result)
        }catch(err){
            return res.status(httpStatus(err.code)).json({ error: err.message })
        }
    },

    async me(req, res){
        try{
            const user = await userService.getCurrentUser(req.user.id)
            return res.status(200).json(user)
        }catch(err){
            return res.status(500).json({ error: err.message })
        }
    },

    async uploadProfile(req, res) {
        try {
            if (!req.file) {
                return res.status(400).json({ error: "No file uploaded" });
            }
            const filePath = `/uploads/${req.file.filename}`;
            const result = await userService.uploadProfilePicture(req.user.id, filePath);
            return res.status(200).json(result);
        } catch (err) {
            return res.status(httpStatus(err.code)).json({ error: err.message });
        }
    },
}
