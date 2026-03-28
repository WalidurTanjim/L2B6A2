import { NextFunction, Request, Response } from "express";
import { usersServices } from "./users.services";
import AppError from "../../utils/AppError";

// POST method
const createUser = async(req: Request, res: Response, next: NextFunction) => {
     try{
          const { name, email, password, phone, role } = req.body;
     
          if(!name) throw new AppError("Name is required", 400);
          if(!email) throw new AppError("Email is required", 400);
          if(!password) throw new AppError("Password is required", 400);
          if(!phone) throw new AppError("Phone is required", 400);
          if(!role) throw new AppError("Role is required", 400);

          const result = await usersServices.createUser(req.body);

          res.status(201).json({
               success: true,
               message: "User created successfully",
               data: result
          });
     }catch(err) {
          next(err);
     }
}

// GET method
const getUsers = async(req: Request, res: Response, next: NextFunction) => {
     try{
          const result = await usersServices.getUsers();

          if(result.length > 0) {
               res.status(200).json({
                    success: true,
                    message: "Users retrived successfully",
                    data: result
               });
          }else res.status(404).json({
               success: false,
               message: "No users available",
               data: null
          })
     }catch(err) {
          next(err);
     }
}

export const usersControllers = {
     createUser,
     getUsers,
}