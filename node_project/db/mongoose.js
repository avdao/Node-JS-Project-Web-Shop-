
const mongoose = require("mongoose");


mongoose.connect("mongodb+srv://avdao:bsphkh123@cluster0.tjxba.mongodb.net/mern_blog?retryWrites=true&w=majority",
    { useUnifiedTopology: true, useNewUrlParser: true})