import pool from "../../config/db.js";

 
   export async function createUser({username, email, password}){
        const result = await pool.query("insert into users (name,email,password) values($1,$2,$3) returning name, email", [username,email,password])
        return result.rows[0]
    }

    export async function findUser(email){
        const result = await pool.query("select * from users where email = $1", [email])
        return result.rows[0]
    }

    export async function getUser(currentUserId){
            const result = await pool.query("select * from users where id = $1", [currentUserId])
            return result.rows[0]
        }

    

export async function updateProfilePicture(userId, filePath) {
    const result = await pool.query(
        `UPDATE users 
         SET profile_picture = $1 
         WHERE id = $2 
         RETURNING id, name, email, profile_picture`,
        [filePath, userId]
    );
    return result.rows[0];
}
