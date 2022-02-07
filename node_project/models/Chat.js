const { ObjectID } = require("bson");
const mongoose = require("mongoose")

const Chat = new mongoose.model("Chat",
    {


        korisnik1: {type:ObjectID},
       korisnik2: {type:ObjectID},
        poruke: [{
            type: String
        }],





    }

);

module.exports=Chat;