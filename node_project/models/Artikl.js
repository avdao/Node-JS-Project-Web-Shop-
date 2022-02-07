const { ObjectID } = require("bson");
const mongoose = require("mongoose")

const Artikl = new mongoose.model("Artikl",
    {


        trgovina_id: {type:ObjectID},
        name: {
            type: String
        },

        kratkiOpis:{
            type: String
        },
        avatar: {
            type:String,
        },
        cloudinary_id: {
            type: String,
        },

        kolicina:{
            type:Number

        },
        cijena:{
          type:String
        }




    }

);

module.exports=Artikl;