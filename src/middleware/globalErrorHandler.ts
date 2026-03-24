import { NextFunction, Request, Response } from "express";

const globalErrorHandler = async(err: any, req: Request, res: Response, next: NextFunction) => {
     const statusCode = err?.statusCode || 500;

     res.status(statusCode).json({
          success: false,
          message: err?.message || "Something went wrong!",
          ...(process.env.NODE_ENV === "development" && { stack: err?.stack })
     });
}

export default globalErrorHandler;