import express from "express";
import { Request, Response } from "express";

const app = express();
const PORT = 3001;

app.use(express.json());

app.get("/", (req: Request, res: Response) => {
  console.log("server ping");
  res.send("Welcome to the server!");
});

app.listen(PORT, () => {
  console.log(`Listening on port: ${PORT}`);
})