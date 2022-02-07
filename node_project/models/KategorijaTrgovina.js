const { ObjectID } = require("bson");
const mongoose = require("mongoose")

const KategorijaTrgovina = new mongoose.model("KategorijaTrgovina",
    {



        kategorija: [{
            type: String
        }],





    }
);

module.exports=KategorijaTrgovina;