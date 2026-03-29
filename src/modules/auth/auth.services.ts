import config from "../../config";
import { pool } from "../../config/db";
import { SignInUser, TokenPayloadUser } from "../../types/auth";
import AppError from "../../utils/AppError";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

// POST method
const signInUser = async(payload: SignInUser) => {
     const { email, password } = payload;

     try{
          const result = await pool.query(`SELECT * FROM users WHERE email=$1`, [email]);

          // is user exists with email
          if(result.rows.length === 0) return null;
          const user = result.rows[0];

          // is password valid or invalid
          const matchedPassword = await bcrypt.compare(password as string, user.password);
          if(!matchedPassword) return false;

          // token payload (user info)
          const tokenPayload: TokenPayloadUser = {
               name: user.name,
               email: user.email,
               role: user.role
          };

          // JWT token secret
          const tokenSecret = config.JWT_TOKEN_SECRET;

          // create token with JWT
          const token = jwt.sign(tokenPayload, tokenSecret as string, { expiresIn: "7d" });

          return { token, user };
     }catch(err: any) {
          throw new AppError(err?.message || "Something went wrong!", 500);
     }
}

export const authServices = {
     signInUser
}