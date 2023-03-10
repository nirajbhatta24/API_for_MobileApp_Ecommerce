const { default: mongoose } = require('mongoose');

const profileSchema =  mongoose.Schema({
    username : {
    type:String,
    required : [true,'username is required']
    },
    email : {
        type:String,
        required : [true,'email is required']
    },
    image : {
        type:String,
        required : [true,'Image is required']
    },
    user : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'User'
    }

},{timestamps : true})

module.exports = mongoose.model('Profile',profileSchema)