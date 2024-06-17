const mongoose = require('mongoose')
const { Schema } = mongoose

const userSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password:{
        type:String,
        required: true
    },
    createdAt: {
        type: Date,
        dafault: Date.now
    },
    lastModified: {
        type: Date,
        default: Date.now
    },
    profileImg: {
        
    }
    }
)

const User = mongoose.model('User', userSchema)
// const user = new User({
//     email:'dasdaddddd@naver.com',
//     password:'mamamdasama3!',
//     name:'yeona'
// })

// user.save().then(()=>console.log('done!'))
module.exports = User