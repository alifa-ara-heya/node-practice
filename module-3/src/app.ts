import express, { Application, Request, Response } from "express";
import fs from 'fs';
import path from 'path';

const filepath = path.join(__dirname, '../db/todo.json')


// const express = require("express");
const app: Application = express();

app.use(express.json())

app.get("/", (req: Request, res: Response) => {
  // console.log({ req, res });
  res.send("welcome to todos app");
});


app.get("/todos", (req: Request, res: Response) => {
  const data = fs.readFileSync(filepath, { encoding: "utf-8" })
  // console.log(data);

  res.json(data);
});


app.post("/todos/create-todo", (req: Request, res: Response) => {
  const data = req.body;
  console.log(data);
  res.send("hello world");
});

export default app;

/**
 * Basic File structure
 * server - server handling like - starting, closing error handling of server. only related to server
 * app file - routing handle, middleware, route related error
 * app folder - app business logic handling like create read update delete, database related works
 */
