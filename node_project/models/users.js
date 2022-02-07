const mongoose=require('mongoose')
const userSchema=mongoose.Schema({
    username:{
        type:String,
        require:true,
    },
    email:{
        type:String,
        require:true,
    },
    password:{
        type:String,
        require:true,
    },
    role:{
      type:String,
      require:true
    },
    birthday:{
        type:String,
        require:true,
    }
},{timestamps:true})
const User=mongoose.model('User',userSchema)
module.exports=User;