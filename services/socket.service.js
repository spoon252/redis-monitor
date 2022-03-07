const config = require('../config').config;

function startSocketService(io){
//Whenever someone connects this gets executed
io.on('connection', function(socket) {
    console.log('A user connected');
    io.emit('redis-list',Object.keys(config.redis_databases))
    //Whenever someone disconnects this piece of code executed
    socket.on('disconnect', function () {
       console.log('A user disconnected');
    });
 });

}

 exports.startSocketService = startSocketService;