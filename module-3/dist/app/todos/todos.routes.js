"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.todosRouter = void 0;
// import { Express } from "express";   // ✅ imports the TYPE
const express_1 = __importDefault(require("express")); // ✅ imports the express FUNCTION
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const filepath = path_1.default.join(__dirname, '../../../db/todo.json');
exports.todosRouter = express_1.default.Router();
exports.todosRouter.get("/", (req, res) => {
    const data = fs_1.default.readFileSync(filepath, { encoding: "utf-8" });
    console.log('from todos router');
    res.json({
        message: "From Todos Router",
        data
    });
});
exports.todosRouter.post("/create-todo", (req, res) => {
    const data = req.body;
    const { title, body } = req.body;
    // console.log(data);
    console.log('from todos post router');
    console.log(title, body);
    res.send("hello world");
});
