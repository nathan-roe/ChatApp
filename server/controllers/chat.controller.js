const { Chat } = require("../models/chat.model");
// Create
module.exports.createChat = (req, res) => {
    const {name, message} = req.body;
    Chat.create({name, message})
        .then(Chat => res.json(Chat))
        .catch(err => res.status(400).json(err));
}
// Read
module.exports.getAllChats = (req, res) => {
    Chat.find({})
        .then(Chat => res.json(Chat))
        .catch(err => res.json(err));
}
module.exports.getThisChat = (req, res) => {
    Chat.findOne({"_id": req.params.id})
        .then(Chat => res.json(Chat))
        .catch(err => res.json(err));
}
// Update
module.exports.updateChat = (req, res) => {
    Chat.findOneAndUpdate({"_id": req.params.id}, req.body, {runValidators: true, new: true})
        .then(updatedChat => res.json(updatedChat))
        .catch(err => res.status(400).json(err));
}
// Delete
module.exports.deleteChat = (req, res) => {
    Chat.findOneAndDelete({"_id": req.params.id})
        .then(deletedChat => res.json(deletedChat))
        .catch(err => res.json(err));
}