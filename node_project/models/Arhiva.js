const { ObjectID } = require("bson");
const mongoose = require("mongoose")

const Arhiva= new mongoose.model("Arhiva",
    {


        prijavljeni_id: {type:ObjectID},
        username:{type:String},
        date:{type:Date},







    }

);

module.exports=Arhiva;