"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.todosRouter = void 0;
// import { Express } from "express";   // ✅ imports the TYPE
const express_1 = __importDefault(require("express")); // ✅ imports the express FUNCTION
const mongoDB_1 = require("../../config/mongoDB");
const mongodb_1 = require("mongodb");
// const filepath = path.join(__dirname, '../../../db/todo.json')
exports.todosRouter = express_1.default.Router();
// get all todos
exports.todosRouter.get("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    /*   const data = fs.readFileSync(filepath, { encoding: "utf-8" })
      console.log('from todos router');
      res.json({
          message: "From Todos Router",
          data
      }); */
    const db = yield mongoDB_1.client.db("todosDB");
    const collection = yield db.collection("todos");
    const cursor = collection.find({});
    // console.log(cursor);
    const todos = yield cursor.toArray();
    res.json(todos);
}));
// get single todo
exports.todosRouter.get('/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    // console.log(id);
    // const { title, body } = req.body
    // console.log(title, body);
    const db = yield mongoDB_1.client.db("todosDB");
    const collection = yield db.collection('todos');
    const todo = yield collection.findOne({ _id: new mongodb_1.ObjectId(id) });
    res.json(todo);
}));
// create a todo
exports.todosRouter.post("/create-todo", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { title, description, priority } = req.body;
    const db = yield mongoDB_1.client.db("todosDB");
    const collection = yield db.collection("todos");
    yield collection.insertOne({
        title: title,
        description: description,
        priority: priority,
        isCompleted: false
    });
    const cursor = collection.find({});
    // console.log(cursor);
    const todos = yield cursor.toArray();
    res.json(todos);
    console.log(todos);
}));
// update a todo
exports.todosRouter.put('/update-todo/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    const db = yield mongoDB_1.client.db("todosDB");
    const collection = yield db.collection('todos');
    const { title, description, priority, isCompleted } = req.body;
    const filter = { _id: new mongodb_1.ObjectId(id) };
    const updatedTodo = yield collection.updateOne(filter, { $set: { title, description, priority, isCompleted } }, { upsert: true });
    res.json(updatedTodo);
}));
// delete a todo
exports.todosRouter.delete('/:delete-todo/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    const db = yield mongoDB_1.client.db("todosDB");
    const collection = yield db.collection('todos');
    yield collection.deleteOne({ _id: new mongodb_1.ObjectId(id) });
    // console.log(data);
    res.json({
        message: "deleted successfully."
    });
}));
