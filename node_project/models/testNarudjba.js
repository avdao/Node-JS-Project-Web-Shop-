
const mongoose = require("mongoose")
const {ObjectID} = require("bson");

const testNarudjba = new mongoose.model("testNarudjba",
    {
        article_id:{type:ObjectID},
        cheff_ID:{
            type:ObjectID
        },
        res_id:
            {type:ObjectID},

        nameofClient:{
            type:String
        },
        name:{
            type:String
        },

        cijena:{
            type:String
        } ,
        kolicina:{
            type:String,
        },

    }

);

module.exports=testNarudjba