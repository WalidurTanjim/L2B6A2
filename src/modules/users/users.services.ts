import { pool } from "../../config/db";
import User from "../../types/user";
import AppError from "../../utils/AppError";
import bcrypt from "bcryptjs";

// POST method 
const createUser = async(payload: User) => {
     const { name, email, password, phone, role } = payload;

     const hashedPassword = await bcrypt.hash(password, 10);

     try{
          const result = await pool.query(`INSERT INTO users(name, email, password, phone, role) VALUES($1, $2, $3, $4, $5) RETURNING *`, [name, email, hashedPassword, phone, role]);

          const user = result?.rows[0];
          return user;
     }catch(err: any) {
          if (err instanceof AppError) {
               throw err;
          }

          if (err?.code === "23505") {
               const detail = err?.detail || "";

               if (detail.includes("email")) {
                    throw new AppError("Email already exists", 409);
               }

               throw new AppError("Duplicate field value", 409);
          }

          throw new AppError(err?.message || "Something went wrong!", 500);
     }
};

// GET method
const getUsers = async() => {
     try{
          const result = await pool.query(`SELECT * FROM users`);
          return result.rows;
     }catch(err: any) {
          throw new AppError(err?.message || "Something went wrong!", 500);
     }
}

const getUserById = async(id: string) => {
     try{
          const result = await pool.query(`SELECT * FROM users WHERE id=$1`, [id]);

          if(result.rowCount === 0) {
               throw new AppError("User not found", 400);
          }

          return result.rows[0];
     }catch(err: any) {
          throw new AppError(err?.message || "Something went wrong!", 500)
     }
}

export const usersServices = {
     createUser,
     getUsers,
     getUserById,
}
