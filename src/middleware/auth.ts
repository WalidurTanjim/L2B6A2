import { NextFunction, Request, Response } from "express";
import AppError from "../utils/AppError";
import config from "../config";
import jwt, { JwtPayload } from "jsonwebtoken"

const auth = (...roles: string[]) => {
     return async (req: Request, res: Response, next: NextFunction) => {
               try{
                    // get token
                    const token = req?.headers.authorization;
                    if(!token) throw new AppError("Forbidden access", 403);

                    // verify token
                    const secret = config.JWT_TOKEN_SECRET;
                    const decoded = jwt.verify(token, secret as string) as JwtPayload;
                    req.user = decoded;

                    if(roles.length && !roles.includes(decoded.role)) throw new AppError("Unauthorized access", 401)

                    next();
               }catch(err: any) {
                    next(err);
          }
     }
};

export default auth;