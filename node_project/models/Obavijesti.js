const { ObjectID } = require("bson");
const mongoose = require("mongoose")

const Obavijesti = new mongoose.model("Obavijesti",
    {



        posalji_id:{type:ObjectID},

        dogadjaj:{
            type:String
        }





    }

);

module.exports=Obavijesti;