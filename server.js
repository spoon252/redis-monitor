const createError = require('http-errors');
let express = require('express'),
    path = require('path'),
    cors = require('cors')
const app = express();
const httpServer = require('http').createServer(app);
const io = require('socket.io')(httpServer, {
    cors: {origin : '*'}
  });
const socketService = require('./services/socket.service')
socketService.startSocketService(io);

const port = process.env.PORT || 3080;
const deviceRoute = require('./routes/redis.routes')

httpServer.listen(port, function() {
   console.log('listening on:',port);
});


app.use(express.json());
app.use(express.urlencoded({
    extended: false
}));
app.use(cors());

// Static directory path
app.use(express.static(path.join(__dirname, 'RedisMonitor/dist/redis-monitor')));

// API root
app.use('/devices', deviceRoute);

// 404 Handler
app.use((req, res, next) => {
    next(createError(404));
});

// Base Route
app.get('/', (req, res) => {
    console.log("/")
    res.send("sent from /")
    //res.send('invaild endpoint');
});

app.get('*', (req, res) => {
    console.log("*")
    res.send("sent from *")
    res.sendFile(path.join(__dirname, 'RedisMonitor/dist/redis-monitor'));
});

// error handler
app.use(function (err, req, res, next) {
    console.error(err.message);
    if (!err.statusCode) err.statusCode = 500;
    res.status(err.statusCode).send(err.message);
});