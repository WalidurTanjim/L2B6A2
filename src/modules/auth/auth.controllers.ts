import { NextFunction, Request, Response } from "express";
import AppError from "../../utils/AppError";
import { authServices } from "./auth.services";
import { SignInUser } from "../../types/auth";

// POST method
const signInUser = async(req: Request, res: Response, next: NextFunction) => {
     const { email, password } = req.body;

     if(!email) throw new AppError("Email is required", 401);
     if(!password) throw new AppError("Password is required", 401);

     const authUser: SignInUser = {
          email: email,
          password: password
     }

     try{
          const result = await authServices.signInUser(authUser);
          
          if(result === null) throw new AppError("Invalid email", 500)
          if(result === false) throw new AppError("Invalid password", 500)
                    
          const { token, user } = result;
          const { password, ...rest } = user;
          const newResult = { token, rest };

          res.status(200).json({
               success: true,
               message: "Login successful",
               data: newResult
          })
     }catch(err) {
          next(err);
     }
}

export const authControllers = {
     signInUser
}