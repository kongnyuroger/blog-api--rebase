import pool from "../../config/db.js"

export async function createPost(title,content,user_id){
    const result = await pool.query('insert into posts (title, content, user_id) values ($1,$2,$3) returning *',[title, content, user_id]);
    return result.rows[0]
}

export async function getPost(id) {
    const result = await pool.query(
        `
        SELECT 
            posts.id,
            posts.title, 
            posts.content,
            COALESCE(
                json_agg(
                    json_build_object(
                        'id', comments.id,
                        'comment', comments.comment,
                        'user_id', comments.user_id
                    )
                ) FILTER (WHERE comments.id IS NOT NULL), '[]'
            ) AS comments
        FROM posts
        LEFT JOIN comments ON posts.id = comments.post_id
        WHERE posts.id = $1
        GROUP BY posts.id
        `,
        [id]
    );
    return result.rows[0]; // returns single object
}


export async function findPost(id){
    const result = await pool.query(`
        select * from posts
        where posts.id = $1
        `,[id]);
    return result.rows[0]
}

export async function listPosts({limit, offset}){
    const result = await pool.query(`select * from posts limit $1 offset $2 order by 
                                created_at` ,
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

    return result.rows[0]
}

export async function searchPosts(q) {
  const result = await pool.query(
    `SELECT *
     FROM posts
     WHERE title ILIKE $1 OR content ILIKE $1
     ORDER BY created_at DESC
     `,
    [`%${q}%`]

  );
  return result.rows;
}




