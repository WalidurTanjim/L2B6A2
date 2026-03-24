import { pool } from "../../config/db";
import User from "../../types/user";
import AppError from "../../utils/AppError";

// POST method 
const createUser = async(payload: User) => {
     const { name, email, password, phone, role } = payload;

     try{
          const result = await pool.query(`INSERT INTO users(name, email, password, phone, role) VALUES($1, $2, $3, $4, %5) RETURNING *`, [name, email, password, phone, role]);

          const user = result?.rows[0];
          return user;
     }catch(err: any) {
          throw new AppError(err?.message || "Something went wrong!", err?.statusCode || 500);
     }
};

export const usersServices = {
     createUser,
}