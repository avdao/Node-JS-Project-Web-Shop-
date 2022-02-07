const { ObjectID } = require("bson");
const mongoose = require("mongoose")

const Zabrana= new mongoose.model("Zabrana",
    {


        prijavljeni_id: {type:ObjectID},
        username:{type:String},
        date:{type:Date}






    }

);

module.exports=Zabrana;