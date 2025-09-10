import { createPost, listPosts, updatePosts, getPost, deletePost, findPost} from "./post.model.js"


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

    async updatePosts(reqbody, id){
         const post = await findPost(id);
         if(!post){
            throw new Error("post not found")
         }
        if(!reqbody.title || !reqbody.content){
            throw new Error('title or content is required')
        }
       const result = await updatePosts(reqbody, id)
        return result
    },

    async getSinglePosts(id) {
    const result = await getPost(id);
    if (!result) {
        throw new Error("Post not found");
    }
    return result;
},

    async deletePost(id){
        const post = await findPost(id);
         if(!post){
            throw new Error("post not found")
         }
         const result = await deletePost(id);
        return {message: "successfuly deleted", post: result}
    },

    
}

export default postService;