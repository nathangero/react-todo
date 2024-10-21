import express from "express";
import { Request, Response } from "express";

const app = express();
const PORT = 3001;

const db: { [key: number]: [string, boolean] } = {};

app.use(express.json());

app.get("/", (req: Request, res: Response) => {
  console.log("server ping");
  res.send("Welcome to the server!");
});

app.put("/todo", (req: Request, res: Response) => {
  console.log("put todo");

  const todo = req.body.todo;
  db[Date.now()] = [todo, false];

  console.log(db);

  res.sendStatus(201);
});

app.listen(PORT, () => {
  console.log(`Listening on port: ${PORT}`);
})