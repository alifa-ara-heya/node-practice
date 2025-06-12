// import { Express } from "express";   // ✅ imports the TYPE
import express, { Request, Response } from 'express' // ✅ imports the express FUNCTION
import fs from 'fs';
import path from 'path';
import { client } from '../../config/mongoDB';
import { ObjectId } from 'mongodb';

// const filepath = path.join(__dirname, '../../../db/todo.json')


export const todosRouter = express.Router()

// get all todos
todosRouter.get("/", async (req: Request, res: Response) => {
    /*   const data = fs.readFileSync(filepath, { encoding: "utf-8" })
      console.log('from todos router');
      res.json({
          message: "From Todos Router",
          data
      }); */
    const db = await client.db("todosDB")
    const collection = await db.collection("todos")
    const cursor = collection.find({})
    // console.log(cursor);
    const todos = await cursor.toArray();
    res.json(todos)

})

// get single todo
todosRouter.get('/:id', async (req: Request, res: Response) => {
    const id = req.params.id
    // console.log(id);
    // const { title, body } = req.body
    // console.log(title, body);
    const db = await client.db("todosDB")
    const collection = await db.collection('todos')
    const todo = await collection.findOne({ _id: new ObjectId(id) })
    res.json(todo)
})


// create a todo
todosRouter.post("/create-todo", async (req: Request, res: Response) => {
    const { title, description, priority } = req.body;
    const db = await client.db("todosDB")
    const collection = await db.collection("todos")
    await collection.insertOne({
        title: title,
        description: description,
        priority: priority,
        isCompleted: false
    })

    const cursor = collection.find({})
    // console.log(cursor);
    const todos = await cursor.toArray();
    res.json(todos)
    console.log(todos);

});


// update a todo
todosRouter.put('/update-todo/:id', async (req: Request, res: Response) => {
    const id = req.params.id
    const db = await client.db("todosDB")
    const collection = await db.collection('todos')
    const { title, description, priority, isCompleted } = req.body;
    const filter = { _id: new ObjectId(id) }
    const updatedTodo = await collection.updateOne(
        filter,
        { $set: { title, description, priority, isCompleted } },
        { upsert: true }
    )
    res.json(updatedTodo)
})

// delete a todo
todosRouter.delete('/:delete-todo/:id', async (req: Request, res: Response) => {
    const id = req.params.id
    const db = await client.db("todosDB")
    const collection = await db.collection('todos')
    await collection.deleteOne({ _id: new ObjectId(id) })
    // console.log(data);
    res.json({
        message: "deleted successfully."
    })
})