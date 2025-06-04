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
    // console.log('req', req);
    const url = new URL(req.url, `http://${req.headers.host}`)
    const pathname = url.pathname;
    // console.log('url', url);
    // console.log(req.url, req.method);

    // get all todos
    if (pathname === '/todos' && req.method === 'GET') {
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
    } else if (pathname === '/todo' && req.method === 'POST') {
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

    } //get a single todo
    else if (pathname == '/todo' && req.method === "GET") {
        const title = url.searchParams.get("title")
        // console.log(title);
        // console.log(pathname, 'single todo');
        const data = fs.readFileSync(filepath, { encoding: "utf-8" }); // Step 1: Read file as string
        const parsedData = JSON.parse(data) // Step 2: Convert JSON string into JavaScript object/array
        const todo = parsedData.find(todo => todo.title === title) // Step 3: Use JavaScript to search for matching todo
        const stringifiedTodo = JSON.stringify(todo); // Step 4: Convert result back into a JSON string for the response
        res.writeHead(200, {
            "content-type": "application/json",
        })
        res.end(stringifiedTodo)
    } //update todo
    else if (pathname === '/todos/update-todo' && req.method === 'PATCH') {
        const title = url.searchParams.get("title")
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
            const { body } = JSON.parse(data)
            // console.log(title, body);

            const allTodos = fs.readFileSync(filepath, { encoding: "utf-8" })
            // console.log(allTodos);
            const parsedAllTodos = JSON.parse(allTodos)
            // console.log(parsedAllTodos);

            const todoIndex = parsedAllTodos.findIndex(todo => todo.title === title)

            parsedAllTodos[todoIndex].body = body
            fs.writeFileSync(filepath, JSON.stringify(parsedAllTodos, null, 2), { encoding: "utf-8" }) //@param space — Adds indentation, white space, and line break characters to the return-value JSON text to make it easier to read.
            // console.log(JSON.stringify({ title, body, createdAt }, null, 2));
            // console.log(JSON.stringify({ title, body, createdAt }));

            res.end(JSON.stringify({ title, body, createdAt: parsedAllTodos[todoIndex].createdAt }, null, 2))
        })
    }
    //delete todo
    else if (pathname === '/todos/delete-todo' && req.method === 'DELETE') {
        const title = url.searchParams.get('title')
        const todoIndex = parsedAllTodos.findIndex(todo => todo.title === title)

        // todo- write delete function
    }
    else {
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