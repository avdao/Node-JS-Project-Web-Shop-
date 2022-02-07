const { ObjectID } = require("bson");
const mongoose = require("mongoose")

const KljucneRijeci = new mongoose.model("kljucneRijeci",
    {


        artikal_id: {type:ObjectID},
        kljucneRijeci: [{
            type: String
        }],





    }

);

module.exports=KljucneRijeci;