const { ObjectID } = require("bson");
const mongoose = require("mongoose")

const GrupnePoruke = new mongoose.model("GrupnePoruke",
    {


        role: {type:String},

        poruke: [{
            type: String
        }],





    }

);

module.exports=GrupnePoruke;