import express, { Request, Response } from "express";
import router from "./routes";

const app = express();

app.use("/", router);

app.get("/", (req: Request, res: Response) => {
  res.send("Hello World");
});

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
