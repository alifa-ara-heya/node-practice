"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const todos_routes_1 = require("./app/todos/todos.routes");
// import fs from 'fs';
// import path from 'path';
// const filepath = path.join(__dirname, '../db/todo.json')
// const express = require("express");
const app = (0, express_1.default)();
app.use(express_1.default.json());
// const todosRouter = express.Router()
const userRouter = express_1.default.Router();
app.use("/users", userRouter);
app.use("/todos", todos_routes_1.todosRouter);
/* todosRouter.get("/all-todos", (req: Request, res: Response) => {
  const data = fs.readFileSync(filepath, { encoding: "utf-8" })
  console.log('from todos router');
  res.json({
    message: "From Todos Router",
    data
  });
}) */
app.get("/", (req, res) => {
    // console.log({ req, res });
    res.send("welcome to todos app");
});
/* app.get("/todos", (req: Request, res: Response) => {
  console.log("from query", req.query);
  console.log("from params", req.params);
  const data = fs.readFileSync(filepath, { encoding: "utf-8" })
  // console.log(data);

  res.json(data);
}); */
/*
app.post("/todos/create-todo", (req: Request, res: Response) => {
  const data = req.body;
  const { title, body } = req.body;
  // console.log(data);
  console.log(title, body);
  res.send("hello world");
}); */
exports.default = app;
/**
 * Basic File structure
 * server - server handling like - starting, closing error handling of server. only related to server
 * app file - routing handle, middleware, route related error
 * app folder - app business logic handling like create read update delete, database related works
 */
