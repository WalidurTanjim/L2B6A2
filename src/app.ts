import express, { Request, Response } from "express";
import initDB from "./config/db";
import globalErrorHandler from "./middleware/globalErrorHandler";
import { usersRoutes } from "./modules/users/users.routes";
import { authRouters } from "./modules/auth/auth.routes";
import { vehiclesRoutes } from "./modules/vehicles/vehicles.routes";
import { bookingsRoutes } from "./modules/bookings/bookings.routes";
const app = express();

// parser
app.use(express.json());

// initialize database
initDB();

app.get('/', (req: Request, res: Response) => {
  res.send('Next Level Web Development');
})

// users api route
app.use("/api/v1", usersRoutes);

// auth api route
app.use("/api/v1/auth", authRouters);

// vehicles api route
app.use("/api/v1/vehicles", vehiclesRoutes);

// bookings api route
app.use("/api/v1/bookings", bookingsRoutes)

// 404 not found route
app.use((req: Request, res: Response) => {
  res.status(404).json({
    success: false,
    message: "Route not found",
    route: req.path
  })
})

// globalErrorHandler middleware call
app.use(globalErrorHandler);

export default app;
