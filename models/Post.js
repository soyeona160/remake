const mongoose = require('mongoose')
const { Schema } = mongoose
const { Types: {ObjectId} } = Schema


const postSchema = new Schema({
    author: {
        type: ObjectId,
        required: true,
        ref:'User'
    },
    title:{
        type: String,
        required: true,
        trim: true// 문자열 양쪽 공백 제거
    },
    description: {
        type: String,
        trim: true,
        required: true
    },
    isPrivacy:{
        type: Boolean,
        default: false
    },
    password:{
        type: String,
        trim: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    room : {
        type: String
    }
})

const Post = mongoose.model('Post', postSchema)
// const post = new Post({
//     author: '666fa5b6458624638ce83671',
//     title:"스터디 윗 미",
//     description : "함께 공부해요",
//     isPrivacy: true,
//     password: '0000'
// })
// post.save().then(()=>console.log('작성완료'))
module.exports = Post