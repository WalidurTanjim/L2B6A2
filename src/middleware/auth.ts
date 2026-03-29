import { NextFunction, Request, Response } from "express";
import AppError from "../utils/AppError";
import config from "../config";
import jwt, { JwtPayload } from "jsonwebtoken"

const auth = (...roles: string[]) => {
     return async (req: Request, res: Response, next: NextFunction) => {
               try{
                    // get token
                    const authHeader = req?.headers.authorization;
                    if(!authHeader) throw new AppError("Forbidden access", 403);

                    if(!authHeader.startsWith("Bearar ")) throw new AppError("Invalid token format", 401)

                    const token = authHeader.split(' ')[1];

                    // verify token
                    const secret = config.JWT_TOKEN_SECRET;
                    const decoded = jwt.verify(token as string, secret as string) as JwtPayload;
                    req.user = decoded;

                    // checking role
                    if(roles.length && !roles.includes(decoded.role)) throw new AppError("Unauthorized access", 401)

                    next();
               }catch(err: any) {
                    next(err);
          }
     }
};

export default auth;