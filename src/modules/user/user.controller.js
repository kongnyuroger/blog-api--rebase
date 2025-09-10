import { userService } from "./user.service.js";

export const userController = {
    async create(req, res){
        try{
            const user = await userService.createUser(req.body)
            return res.status(201).json(user)
        }catch(err){
            return res.status(500).json({error: err.message})
        }
    },

    async login(req, res){
        try{
            const user = await userService.loginUser(req.body)
            return res.status(201).json({message: "login succesfull" ,user})
        }catch(err){
            return res.status(500).json({error: err.message})
        }
    },

    async me(req, res){
        try{
            const user = await userService.getCurrentUser(req.user.id)
            return res.status(200).json(user)
        }catch(err){
            return res.status(500).json({error: err.message})
        }
    },

    async uploadProfile(req, res) {
    try {
      if (!req.file) {
        return res.status(400).json({ error: "No file uploaded" });
      }
      const filePath = `/uploads/${req.file.filename}`;
      const result = await userService.uploadProfilePicture(req.user.id, filePath);

      return res.status(201).json(result);
    } catch (err) {
      return res.status(500).json({ error: err.message });
    }
  },
}

