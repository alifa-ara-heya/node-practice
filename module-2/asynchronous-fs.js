// asynchronous file system =>file read > go to thread pool => cpu intensive task => readfile

const fs = require("fs");

// const text = 'I will be a developer, inshaAllah';

//duplicating the text from hello-world.txt to hello.txt

fs.readFile("./hello-world.txt", { encoding: 'utf-8' }, (err, data) => {
    if (err) {
        console.log('error reading file', err);
        return
    }
    fs.writeFile("./hello.txt", data, { encoding: 'utf-8' }, (err) => {
        if (err) {
            console.log('error reading file', err);
            return
        }
        console.log('written successfully');
    })
});

// but this process takes a lot of time

