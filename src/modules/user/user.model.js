import pool from "../../config/db.js";

 
   export async function createUser({name, email, password}){
        const result = await pool.query("insert into users (name,email,password) values($1,$2,$3) returning name, email", [name,email,password])
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

