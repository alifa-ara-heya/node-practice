// console.log(process.argv); ['C:\\Users\\sakib\\AppData\\Local\\fnm_multishells\\11508_1748630293586\\node.exe','D:\\L2-programming-hero\\node-practice\\module-2\\logger_app\\index.js','Hello','World']

const path = require('path')
const fs = require('fs');

const inputArguments = process.argv.slice(2); //removes first 2 elements

// console.log(inputArguments); //node index.js Hello World i am learning node js- [ 'Hello', 'World' ] 

const text = inputArguments.join(" ")
const timestamp = new Date().toISOString()
console.log(timestamp);
const message = `${text}, created at- ${timestamp}\n`


if (!message) {
    console.log('❌ please provide a message to log');
    console.log('Example: node index.js hello world');
    process.exit(1)
}
// console.log(text); //Hello World i am learning node js

const filePath = path.join(__dirname, "log.txt")
console.log(filePath);

fs.appendFile(filePath, message, { encoding: 'utf-8' }, () => {
    console.log('Your log added successfully');
})