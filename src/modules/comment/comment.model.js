import pool from "../../config/db.js"

export async function insertComment(comment, user_id, post_id){
    const result = await pool.query(`
        insert into comments (user_id, post_id, comment) values($1, $2, $3)
        returning *
        `,[user_id, post_id, comment]);
    return result.rows[0]
}

export async function findComment(id){
    const result = await pool.query(`
        select * from comments
        where comments.id = $1
        `,[id]);
    return result.rows[0]
}


export async function deleteComments(id){    
    const result = await pool.query("DELETE FROM comments WHERE id = $1", [id]);
    return result.rows[0]
}