import { insertComment, findComment, deleteComments} from "./comment.model.js"


const commentService = {
   

    async createComment(comment, user_id, post_id){
         if (!comment || comment.trim() === "") {
            throw new Error("Comment cannot be empty");
        }

        const result = await insertComment(comment, user_id, post_id)
        return result;
    },

     async removeComment(id){
            const comment = await findComment(id);
             if(!comment){
                throw new Error("comment not found")
             }
             const result = await deleteComments(id);
            return {message: "successfuly deleted", post: result}
        },
}

export default commentService;