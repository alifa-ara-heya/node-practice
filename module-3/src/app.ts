import express, { Application, NextFunction, Request, Response } from "express";
import { todosRouter } from "./app/todos/todos.routes";
// import fs from 'fs';
// import path from 'path';

// const filepath = path.join(__dirname, '../db/todo.json')


// const express = require("express");
const app: Application = express();

app.use(express.json())

// const todosRouter = express.Router()
const userRouter = express.Router();

app.use("/users", userRouter)
app.use("/todos", todosRouter)

/* todosRouter.get("/all-todos", (req: Request, res: Response) => {
  const data = fs.readFileSync(filepath, { encoding: "utf-8" })
  console.log('from todos router');
  res.json({
    message: "From Todos Router",
    data
  });
}) */

app.get("/", (req: Request, res: Response, next: NextFunction) => {
  // console.log({ req, res });
  // res.send("welcome to todos app");
  console.log('I am custom middleware');
  console.log({
    url: req.url,
    method: req.method,
    header: req.header
  });
  next();
}, async (req: Request, res: Response, next: NextFunction) => {
  // console.log({ req, res });
  try {
    // console.log(something);
    res.send("welcome to todos app");
  } catch (error) {
    next(error)
  }
});

app.get('/error',
  async (req: Request, res: Response, next: NextFunction) => {
    // console.log(somehting);

    try {
      // console.log(something);
      res.send("welcome to error er duniya");
    } catch (error) {
      next(error)
    }
  }
)


// global error handling customization
// sobar laste dite hobe

// this middleware must be used after all other routes but before the global error handling
app.use((req: Request, res: Response, next: NextFunction) => {
  res.status(404).json({ message: 'Route not found' })
})

app.use((error: any, req: Request, res: Response, next: NextFunction) => {
  if (error) {
    console.log("error", error);
    res.status(400).json({ message: 'Something went wrong ,pookie', error })
  }
})
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

export default app;

/**
 * Basic File structure
 * server - server handling like - starting, closing error handling of server. only related to server
 * app file - routing handle, middleware, route related error
 * app folder - app business logic handling like create read update delete, database related works
 */
