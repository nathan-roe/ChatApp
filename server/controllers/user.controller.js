const { User } = require("../models/user.model");
const { RoomIds } = require("../models/user.model");
const { Friends } = require("../models/user.model");
// Create
module.exports.createUser = (req, res) => {
    const {firstName, lastName, email, phone, password, confirm, profileImg} = req.body;
    User.create({firstName, lastName, email, phone, password, confirm, profileImg})
        .then(User => res.json(User))
        .catch(err => res.status(400).json(err));
}




// Read
module.exports.getAllUsers = (req, res) => {
    User.find({}).populate('_roomIds').exec()
        .then(User => res.json(User))
        .catch(err => res.json(err));
}
module.exports.getThisUserOffId = (req, res) => {
    User.findOne({"_id": req.params.id})
        .then(User => res.json(User))
        .catch(err => res.json(err));
}
module.exports.getThisUserOffEmail = (req, res) => {
    User.findOne({"email": req.params.id})
        .then(User => res.json(User))
        .catch(err => res.json(err));
}
// Update
module.exports.updateUserRooms = (req, res) => {
    console.log("The backend req.data is: ");
    console.log(req.data);
    User.findOneAndUpdate({"_id": req.params.id}, {"$push": {"roomIds": req.data}}, {runValidators: true, new: true})
        .then(updatedUser => res.json(updatedUser))
        .catch(err => res.status(400).json(err));
}
// Delete
module.exports.deleteUser = (req, res) => {
    User.findOneAndDelete({"_id": req.params.id})
        .then(deletedUser => res.json(deletedUser))
        .catch(err => res.json(err));
}

module.exports.addRoomId = (req, res) => {
    console.log(req.body);
    console.log("The req.params.id is: ")
    console.log(req.params.id);
    let newRoomId = new RoomIds(req.body);
    newRoomId._user = req.params.id;
    newRoomId.save()
        .catch((err) => {console.log(err);})
        .then((savedRoomId) => {
            console.log(savedRoomId);
            User.findOne({"_id": req.params.id})
                .catch((err) => {console.log(err);})
                .then((user) => {
                    console.log("This is the user: ")
                    console.log(user);
                    console.log(user._roomIds)
                    user._roomIds.push(savedRoomId);
                    user.save()
                        .catch((err) => {console.log(err);})
                        .then((newUser) => {console.log(newUser);})
                })
        })
}
module.exports.getRoomOffId = (req, res) => {
    RoomIds.findOne({"_id": req.params.id})
        .then(room => res.json(room))
        .catch(err => console.log(err))
}
module.exports.getRoomOffId2 = (req, res) => {
    RoomIds.findOne({"id": req.params.id})
        .then(room => res.json(room))
        .catch(err => console.log(err))
}
module.exports.updateRoom = (req, res) => {
    RoomIds.findOneAndUpdate({"_id": req.params.id}, {"$set":{"name": req.body.name }}, {runValidators: true, new: true})
        .then(updatedChat => res.json(updatedChat))
        .catch(err => res.status(400).json(err));
}


//  Friend
module.exports.getFriendOffId = (req, res) => {
    Friends.findOne({"_id": req.params.id})
        .then(room => res.json(room))
        .catch(err => console.log(err))
}
module.exports.addFriend = (req, res) => {
    console.log(req.body);
    console.log("The req.params.id is: ");
    console.log(req.params.id);
    let newFriend = new Friends(req.body);
    newFriend._user = req.params.id;
    newFriend.save()
        .catch((err) => {console.log(err);})
        .then((savedFriend) => {
            console.log(savedFriend);
            User.findOne({"_id": req.params.id})
                .catch((err) => {console.log(err);})
                .then((user) => {
                    console.log("This is the user: ")
                    console.log(user);
                    console.log(user._friends)
                    user._friends.push(savedFriend);
                    user.save()
                        .catch((err) => {console.log(err);})
                        .then((newUser) => {console.log(newUser);})
                })
        })
}