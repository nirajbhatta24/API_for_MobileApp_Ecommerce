const mongoose  =  require('mongoose')

const userSchema =  mongoose.Schema({
    fname: {
        type: String,
        required: true,
        trim: true,
    },
    lname: {
        type: String,
        required: true,
        trim: true,
    },
    image:{
        type: String,
    },
    username: {
        type: String,
        required: true,
        trim: true,
    },
    password:{
        type: String,
        required: true,
        trim: true,
    },
    role : {
        type : String,
        enum: ['Admin','User'],
        default : 'User'
    }
    

},{timestamps : true})

module.exports = mongoose.model("User",userSchema)