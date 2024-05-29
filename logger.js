const EventEmitter = require('events')

const url = 'http://'

class Logger extends EventEmitter {
    log(message) {
        console.log(message);
        this.emit('messageLogged',{ id: 1, name: 'yash'})
    }
}

module.exports = Logger;