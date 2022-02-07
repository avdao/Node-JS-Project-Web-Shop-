
const mongoose = require("mongoose")

const isporucenaNarudjba = new mongoose.model("isporucenaNarudjba",
    {


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
        status:{
            type:String
        },

    }

);

module.exports=isporucenaNarudjba