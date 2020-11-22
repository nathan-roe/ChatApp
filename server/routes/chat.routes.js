const ChatController = require('../controllers/chat.controller');
const UserController = require('../controllers/user.controller');
const RoomController = require('../controllers/room.controller');
const { Room } = require('../models/room.model');
module.exports = function(app){
// chat controller
    app.post('/api/chats/new', ChatController.createChat);
// user controller
    app.get('/api/users/all', UserController.getAllUsers);
    app.get('/api/users/email/:id', UserController.getThisUserOffEmail);
    app.get('/api/users/:id', UserController.getThisUserOffId);
    app.post('/api/users/new', UserController.createUser);
    app.put('/api/users/edit/rooms/:id', UserController.updateUserRooms);
// room controller
    // create
    app.post('/api/rooms/new', RoomController.createRoom);
    // read
    app.get('/api/rooms/:id', RoomController.getThisRoom);
    // update
    app.put('/api/rooms/edit/:id', RoomController.updateRoom)
    // delete
    app.delete('/api/rooms/delete/:id', RoomController.deleteRoom)

// add roomId
    app.post('/api/roomId/:id', UserController.addRoomId);
    app.get('/api/roomIds/get/:id', UserController.getRoomOffId);
    app.get('/api/roomIds/getRoom/:id', UserController.getRoomOffId2);
    app.put('/api/roomIds/edit/:id', UserController.updateRoom);
// add friend
    app.post('/api/friend/:id', UserController.addFriend);
    app.get('/api/friends/get/:id', UserController.getFriendOffId);
    // app.get('/api/roomIds/getRoom/:id', UserController.getRoomOffId2);
}