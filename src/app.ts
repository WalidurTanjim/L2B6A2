import express, { Request, Response } from "express";
import initDB from "./config/db";
import globalErrorHandler from "./middleware/globalErrorHandler";
const app = express();

// parser
app.use(express.json());

// initialize database
initDB();

app.get('/', (req: Request, res: Response) => {
  res.send('Next Level Web Development');
})

// globalErrorHandler middleware call
app.use(globalErrorHandler);

export default app;
