import commentService from "./comment.services.js"

const commentController = {
     async postcomment(req, res){
            try{
                const post = await commentService.createComment(req.body.comment, req.user.id, parseInt(req.params.id))
                return res.status(200).json(post)
            }catch(err){
                return res.status(500).json({error: err.message})
            }
        },

    async delete(req, res){
            try{
                const comment = await commentService.removeComment(parseInt(req.params.id))
                return res.status(200).json(comment)
            }catch(err){
                return res.status(500).json({error: err.message})
            }
        },

}

export default commentController