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
}

export default postController