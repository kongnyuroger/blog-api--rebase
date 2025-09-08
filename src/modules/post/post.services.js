import { createPost, listPosts, updatePosts } from "./post.model.js"


const postService = {
    async create(req){
        if(!req.body.content){
            throw new Error("content required");
        }
        const user_id = req.user.id
        const result = {
            message: "success",
            post: await createPost(req.body.title, req.body.content, user_id)
        }
        return result
    },

    async listAllPosts(reqQuery){
        const result = await listPosts(reqQuery)
        return result
    },

    async updatePosts(reqQuery, id){
        const result = await updatePosts(reqQuery, id)
        return result
    },


}

export default postService;