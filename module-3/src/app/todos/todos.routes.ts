// import { Express } from "express";   // ✅ imports the TYPE
import express, { Request, Response } from 'express' // ✅ imports the express FUNCTION
import fs from 'fs';
import path from 'path';

const filepath = path.join(__dirname, '../../../db/todo.json')


export const todosRouter = express.Router()

todosRouter.get("/", (req: Request, res: Response) => {
    const data = fs.readFileSync(filepath, { encoding: "utf-8" })
    console.log('from todos router');
    res.json({
        message: "From Todos Router",
        data
    });
})


todosRouter.post("/create-todo", (req: Request, res: Response) => {
    const data = req.body;
    const { title, body } = req.body;
    // console.log(data);
    console.log('from todos post router');

    console.log(title, body);
    res.send("hello world");
});