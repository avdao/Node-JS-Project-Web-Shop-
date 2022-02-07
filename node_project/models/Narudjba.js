const { ObjectID } = require("bson");
const mongoose = require("mongoose")

const Narudjba = new mongoose.model("Narudjba",
    {

        res_id1: {type:String},
        artikal_id:{type:ObjectID},
        nameofClient:{
            type:String
        },
        name:{
            type:String
        },

        cijena:{
            type:String
        },
        kolicina:{
            type:String,
        }

    }

);

module.exports=Narudjba