import pool from "./db.js";

export default async function DBinit(){
    try{
        await pool.query('create table if not exists users (id serial primary key , name varchar(30) not null, email varchar(30) not null unique, password text not null, created_at date default current_date);')
        await pool.query('create table if not exists posts (id serial primary key , title text, content text, user_id int references users(id), created_at date default current_timestamp );')
        await pool.query('create table if not exists comments (id serial primary key ,  content text, user_id int references users(id), post_id int references posts(id), created_at date default current_timestamp );')
        console.log("data base is ready")
    }catch(err){
        console.log(err.message)
    }
}


