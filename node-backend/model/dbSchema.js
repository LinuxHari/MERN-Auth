const Mongoose = require('mongoose')

const userSchema = new Mongoose.Schema({
    email:{
        type:String,
        requried:true,
        unique:true,
        trim:true,
        lowercase:true,
        match:/^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/
    },
    password:{
        type:String,
        required:true,
        trim:true
    }
}
)

const userModel = Mongoose.model('users',userSchema)

module.exports = userModel