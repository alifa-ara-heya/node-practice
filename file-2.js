const { a, add } = require('./file-1')
const var1 = require('./file-1')
const { a: a3, add: add3, b } = require('./file-3')
console.log(a);
console.log(var1.a);
console.log(a3);

console.log(add(2, 8));
console.log(add3(2, 8, 2));