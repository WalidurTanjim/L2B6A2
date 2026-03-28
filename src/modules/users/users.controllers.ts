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

const getUserById = async(req: Request, res: Response, next: NextFunction) => {
     // userId
     const { userId } = req.params;

     try{
          const result = await usersServices.getUserById(userId as string);

          res.status(200).json({
               success: true,
               message: "User retrived successfully",
               data: result
          })
     }catch(err) {
          next(err);
     }
}

// DELETE method
const deleteUserById = async(req: Request, res: Response, next: NextFunction) => {
     // userId
     const { userId } = req.params;
     
     try{
          await usersServices.deleteUserById(userId as string);
          res.status(204).send();
     }catch(err) {
          next(err);
     }
}

// PUT method
const updateUserById = async(req: Request, res: Response, next: NextFunction) => {
     // userId
     const { userId } = req.params;

     try{
          // body
          const { name, phone, role } = req.body;
     
          if(!name) throw new AppError("Name is required", 400);
          if(!phone) throw new AppError("Phone is required", 400);
          if(!role) throw new AppError("Role is required", 400);

          const userBody = { name, phone, role };

          const result = await usersServices.updateUserById(userId as string, userBody);

          res.status(201).json({
               success: true,
               message: "User updated successfully",
               data: result
          })
     }catch(err) {
          next(err);
     }
}

export const usersControllers = {
     createUser,
     getUsers,
     getUserById,
     deleteUserById,
     updateUserById
}