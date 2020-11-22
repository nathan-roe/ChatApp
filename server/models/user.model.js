const mongoose = require('mongoose')
const RoomIdsSchema = new mongoose.Schema({
    name: String,
    id: String,
    _user: {type: mongoose.Types.ObjectId, ref: 'User'}
});
const FriendsSchema = new mongoose.Schema({
    friendName: String,
    friendId: String,
    _user: {type: mongoose.Types.ObjectId, ref: 'User'}
});
const UserSchema = new mongoose.Schema({
    firstName: {type: String},
    lastName: {type: String},
    email: {type: String},
    phone: {type: Number},
    password: {type: String},
    confirm: {type: String},
    profileImg: { type: String},
    _roomIds: [{type: mongoose.Types.ObjectId, ref: 'RoomIds'}],
    _friends: [{type: mongoose.Types.ObjectId, ref: 'Friends'}]
}, {timestamps: true}); 
module.exports.User = mongoose.model('User', UserSchema);
module.exports.RoomIds = mongoose.model('RoomIds', RoomIdsSchema);
module.exports.Friends = mongoose.model('Friends', FriendsSchema);
