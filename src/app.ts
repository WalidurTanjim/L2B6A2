import express, { Request, Response } from "express";
import initDB from "./config/db";
const app = express();

// parser
app.use(express.json());

// initialize database
initDB();

app.get('/', (req: Request, res: Response) => {
  res.send('Next Level Web Development');
})

export default app;
