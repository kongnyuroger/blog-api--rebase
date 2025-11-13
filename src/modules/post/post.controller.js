import postService from "./post.services.js";

const postController = {
    async create(req, res){
            try{
                const post = await postService.create(req)
                return res.status(201).json(post)
            }catch(err){
                return res.status(500).json({error: err.message})
            }
        },
         async list(req, res){
            try{
                const posts = await postService.listAllPosts(req.query)
                return res.status(200).json(posts)
            }catch(err){
                return res.status(500).json({error: err.message})
            }
        },

        async getAPost(req, res){
            try{
                const post = await postService.getSinglePosts(parseInt(req.params.id))
                return res.status(200).json(post)
            }catch(err){
                return res.status(500).json({error: err.message})
            }
        },

        async update(req, res){
            try{
                const post = await postService.updatePosts(req.body , req.params.id)
                return res.status(200).json(post)
            }catch(err){
                return res.status(500).json({error: err.message})
            }
        },

        async delete(req, res){
            try{
                const post = await postService.deletePost(req.params.id)
                return res.status(200).json(post)
            }catch(err){
                return res.status(500).json({error: err.message})
            }
        },

    async search(req, res) {
        try {
        const result = await postService.search(req.query);
        return res.status(200).json(result);
        } catch (err) {
        return res.status(500).json({ error: err.message || "Internal Server Error" });
        }
    }
        
}

export default postController