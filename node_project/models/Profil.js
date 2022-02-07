const mongoose=require('mongoose')
const profileSchema=mongoose.Schema({
    username_id:{
        type:String,
        require:true,
    },
    avatar_profile: {
        type:String,
    },
    cloudinary_profile_id: {
        type: String,
    },
    avatar_cover: {
        type:String,
    },
    cloudinary_cover_id: {
        type: String,
    }

},{timestamps:true})
const Profile=mongoose.model('Profile',profileSchema)
module.exports=Profile;