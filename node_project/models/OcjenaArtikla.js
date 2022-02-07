const { ObjectID } = require("bson");
const mongoose = require("mongoose")

const OcijenaArtikla= new mongoose.model("OcjenaArtikla",
    {
        kupac:{type:String},
        artikal_id: {type:ObjectID},
        comment: {
            type: String
        },

        ocijena:{
            type: Number
        },



    }

);

module.exports=OcijenaArtikla;