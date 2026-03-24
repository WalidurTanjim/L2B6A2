import express, { Request, Response } from "express";
const app = express();

app.get('/', (req: Request, res: Response) => {
  res.send('Next Level Web Development');
})

export default app;
