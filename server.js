const express = require('express');
const cors = require('cors');
const app = express();
require('./server/config/mongoose.config');
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended: true}));
require('./server/routes/chat.routes')(app);
const port = 8000;
const server = app.listen(port, () => console.log(`Listening on port ${port}`));
const io = require('socket.io')(server, {cors: true});

// const UserController = require('./server/controllers/user.controller');
// const { User } = require("./server/models/user.model");



io.on('connection', socket => {
    socket.on('message-to-server', ({message, time, user}) => {
        io.emit('message-to-client', {"message": message, "time": time, "user": user});
        socket.emit('message-to-sender', {"message": message, "user": ["You", ""], "time": time});
    });
    socket.on('new-user', (firstName) => {
        socket.broadcast.emit('new-user-connected', firstName);
    });
});