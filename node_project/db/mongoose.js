
const mongoose = require("mongoose");


mongoose.connect("mongodb+srv://avdao:admin123@cluster0.tjxba.mongodb.net/mern_blog?retryWrites=true&w=majority",
    { useUnifiedTopology: true, useNewUrlParser: true})
