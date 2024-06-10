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
    memberMax: {
        type: Number,
        default: 6
    }
})

const Post = mongoose.model('Post', postSchema)
// const post = new Post({
//     author: 'yeona',
//     title:"영어 스터디 윗 미",
//     description : "저는 6시간 동안 영어 공부를 합니다. 출퇴 자유. 마지막까지 함께해주시면 감동일 거예요."
// })
// post.save().then(()=>console.log('작성완료'))
module.exports = Post