const { ObjectID } = require("bson");
const mongoose = require("mongoose")

const Chat2 = new mongoose.model("Chat2",
    {


       poslao: {type:String},
        poslao_id:{type:ObjectID},
        primio:{type:String},
        primio_id:{type:ObjectID},


        poruke: [{
            type: String
        }],





    }

);

module.exports=Chat2;