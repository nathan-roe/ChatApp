const mongoose = require('mongoose')
const ChatSchema = new mongoose.Schema({
    name: {type: String},
    message: {type: String}
}, {timestamps: true}); 
module.exports.Chat = mongoose.model('Chat', ChatSchema);