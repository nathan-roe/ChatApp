const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/chatappdb', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false
})
    .then(() => console.log("Established a connection the the database"))
    .catch(err => console.log("There was an error", err));
    