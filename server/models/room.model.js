const mongoose = require('mongoose')
const RoomSchema = new mongoose.Schema({
    messageLog: {type: Array}
}, {timestamps: true}); 
module.exports.Room = mongoose.model('Room', RoomSchema);