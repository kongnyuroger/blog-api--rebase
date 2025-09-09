import pool from "../../config/db.js"

export async function createPost(title,content,user_id){
    const result = await pool.query('insert into posts (title, content, user_id) values ($1,$2,$3) returning *',[title, content, user_id]);
    return result.rows[0]
}

export async function getPost(id){
    const result = await pool.query(`
        select title, content, comment, comments.user_id 
        from posts left join comments on posts.id = comments.post_id
        where posts.id = $1
        `,[id]);
    return result.rows
}

export async function listPosts({limit, offset}){
    const result = await pool.query(`select * from posts order by 
                                created_at limit $1 offset $2` ,
                                [limit, offset]
                                );
    return result.rows
}

export async function updatePosts({title,content,}, id){
    const result = await pool.query(
        `UPDATE posts 
         SET title = COALESCE($1, title), 
             content = COALESCE($2, content)
         WHERE post_id = $3
         RETURNING *`,
        [title || null, content || null, id]
    );
    return result.rows[0]
}

export async function deletePost(id){
   await pool.query("DELETE FROM comments WHERE post_id = $1", [id]);
    const result = await pool.query("DELETE FROM posts WHERE id = $1 RETURNING *", [id]);

    return result
}