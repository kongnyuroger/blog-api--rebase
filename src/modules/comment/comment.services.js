import {findPost, insertComment} from "./post.model.js"


const postService = {
   

    async createComment(comment, user_id, post_id){
        const post = await findPost(post_id);
         if(!post){
            throw new Error("post not found")
         }
         if (!comment || comment.trim() === "") {
            throw new Error("Comment cannot be empty");
        }

        const result = await insertComment(comment, user_id, post_id)
        return result;
    }

}

export default postService;