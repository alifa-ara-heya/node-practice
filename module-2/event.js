const EventEmitter = require('node:events');

class SchoolBell extends EventEmitter { }

const schoolBell = new SchoolBell();

schoolBell.on('ring', () => {
    console.log('Yahoo, class finished!');
})

schoolBell.on('ring', () => {
    console.log('Oh! Another class');
})

schoolBell.on('broken', () => {
    console.log('alas! ring broken!');
})

schoolBell.emit('ring') //Yahoo, class finished!    Oh! Another class
schoolBell.emit('broken') //alas! ring broken!

