const { ObjectID } = require("bson");
const mongoose = require("mongoose")

const Interesi = new mongoose.model("Interesi",
    {


        prijavljeni_id: {type:ObjectID},
        interesovanja: [{
            type: String
        }],





    }

);

module.exports=Interesi;