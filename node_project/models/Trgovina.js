const { ObjectID } = require("bson");
const mongoose = require("mongoose")

const Trgovina = new mongoose.model("Trgovina",
    {
        users_id:{type:ObjectID},

        name: {
            type: String
        },

        telefon:{
            type: String
        },
        email:{
            type:String
        },
        adresa:{
            type: String
        },
        category:{
            type:String

        }




    }

);

module.exports=Trgovina