import { userService } from "./user.service.js";

const profileController = {
  async uploadProfile(req, res) {
    try {
      if (!req.file) {
        return res.status(400).json({ error: "No file uploaded" });
      }

      // File path (relative to server)
      const filePath = `/uploads/${req.file.filename}`;

      // Update DB for the logged-in user
      const result = await userService.uploadProfilePicture(req.user.id, filePath);

      return res.status(201).json(result);
    } catch (err) {
      return res.status(500).json({ error: err.message });
    }
  },
};

export default profileController;
