const { ObjectID } = require("bson");
const mongoose = require("mongoose")

const KategorijaArtikla = new mongoose.model("KategorijaArtikla",
    {



        kategorija: [{
            type: String
        }],





    }
);

module.exports=KategorijaArtikla;