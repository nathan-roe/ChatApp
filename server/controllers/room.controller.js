const { Room } = require("../models/room.model");
// Create
module.exports.createRoom = (req, res) => {
    const {messageLog} = req.body;
    Room.create({messageLog})
        .then(Room => res.json(Room))
        .catch(err => res.status(400).json(err));
}
// Read
module.exports.getAllRooms = (req, res) => {
    Room.find({})
        .then(Room => res.json(Room))
        .catch(err => res.json(err));
}
module.exports.getThisRoom = (req, res) => {
    Room.findOne({"_id": req.params.id})
        .then(Room => res.json(Room))
        .catch(err => res.json(err));
}
// Update
module.exports.updateRoom = (req, res) => {
    // console.log("Backend req.body");
    // console.log(req.body);
    Room.findOneAndUpdate({"_id": req.params.id}, {"$addToSet": {"messageLog":req.body}}, {runValidators: true, new: true})
        .then(updatedRoom => res.json(updatedRoom))
        .catch(err => res.status(400).json(err));
}
// Delete
module.exports.deleteRoom = (req, res) => {
    Room.findOneAndDelete({"_id": req.params.id})
        .then(deletedRoom => res.json(deletedRoom))
        .catch(err => res.json(err));
}