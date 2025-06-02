const http = require('http');
const path = require('path');
const filepath = path.join(__dirname, "./db/todo.json");
const fs = require('fs');
/* __dirname is a Node.js global variable that gives you the absolute path of the directory where the current script file resides.

✅ Example:
If your file is located in:
/Users/sakib/projects/todo-app/server.js
Then __dirname will be:
/Users/sakib/projects/todo-app */

/* const data = [
    {
        title: "prisma",
        body: 'learning prisma',
        createdAt: "5/08/2025, 1:25:02 AM"
    },
    {
        title: "typescript",
        body: 'learning typescript',
        createdAt: "6/08/2025, 1:25:02 AM"
    }
] */
const server = http.createServer((req, res) => {
    // console.log(req.url, req.method);

    // get all todos
    if (req.url === '/todos' && req.method === 'GET') {
        const data = fs.readFileSync(filepath, { encoding: "utf-8" })
        res.writeHead(200, {
            "content-type": "application/json",
            // "content-type": "text/html",
            "email": "ph@gmail.com"
        })

        // res.setHeader('content-type', 'text/plain');
        // res.setHeader('email', 'ph2@gmail.com')
        // res.statusCode = 201
        // res.end('All todos here')
        // res.end(JSON.stringify(data));
        // res.end(`<h1>Hello World</h1> <h2>Hello World</h2> `);
        res.end(data)

        // post a todo
    } else if (req.url === '/todos/create-todo' && req.method === 'POST') {
        let data = ""

        // listening
        req.on("data", (chunk) => {
            data = data + chunk //data = chunk
        })


        // listening ends
        req.on("end", () => {
            // console.log("data", data);
            // const todo = JSON.parse(data)
            // console.log("todo", todo);
            const { title, body } = JSON.parse(data)
            // console.log(title, body);
            const createdAt = new Date().toLocaleString();
            const allTodos = fs.readFileSync(filepath, { encoding: "utf-8" })
            // console.log(allTodos);
            const parsedAllTodos = JSON.parse(allTodos)
            // console.log(parsedAllTodos);
            parsedAllTodos.push({ title, body, createdAt })
            fs.writeFileSync(filepath, JSON.stringify(parsedAllTodos, null, 2), { encoding: "utf-8" }) //@param space — Adds indentation, white space, and line break characters to the return-value JSON text to make it easier to read.
            // console.log(JSON.stringify({ title, body, createdAt }, null, 2));
            // console.log(JSON.stringify({ title, body, createdAt }));

            res.end(JSON.stringify({ title, body, createdAt }, null, 2))
        })

    } else {
        res.end('Route not found')
    }
})

server.listen(5000, "127.0.0.1", () => {
    console.log('✅todo server listening from port 5000');
})

/* 
 /todos - GET- all todo
 /todos/create-todo - POST


*/