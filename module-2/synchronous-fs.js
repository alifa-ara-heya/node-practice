// synchronous file system =>file read > don't go to thread pool => I/O intensive task
//readFileSync
const fs = require("fs");

const text = 'Learning file system.';

fs.writeFileSync("./hello.txt", text)

// const data = fs.readFileSync("./hello.txt");
const dataWithEncoding = fs.readFileSync("./hello.txt", { encoding: "utf8" });

// console.log(data); //<Buffer 68 65 6c 6c 6f 20 77 6f 72 6c 64>
console.log(dataWithEncoding); //previously- Hello world, now- Learning file system.
