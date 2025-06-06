"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const filepath = path_1.default.join(__dirname, '../db/todo.json');
// const express = require("express");
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.get("/", (req, res) => {
    // console.log({ req, res });
    res.send("welcome to todos app");
});
app.get("/todos", (req, res) => {
    const data = fs_1.default.readFileSync(filepath, { encoding: "utf-8" });
    // console.log(data);
    res.json(data);
});
app.post("/todos/create-todo", (req, res) => {
    const data = req.body;
    console.log(data);
    res.send("hello world");
});
exports.default = app;
/**
 * Basic File structure
 * server - server handling like - starting, closing error handling of server. only related to server
 * app file - routing handle, middleware, route related error
 * app folder - app business logic handling like create read update delete, database related works
 */
