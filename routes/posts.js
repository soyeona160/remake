const mongoose = require('mongoose')
const { Types : {ObjectId}} = mongoose
const express = require('express')
const Post = require('../models/Post') 
const expressAsyncHandler = require('express-async-handler')
const { isAuth } = require('../auth')
const router = express.Router()
const {validateTodoTitle, validateTodoDescription, validateTodoCategory} = require('../validator')
const { validationResult, oneOf } = require('express-validator')

router.get('/', expressAsyncHandler(async(req, res, next) => {
    // res.json("전체 포스트 조회")
    const posts = await Post.find().populate('author')
    if(posts.length===0){
      return res.status(404).json({code: 404, message: "Failed to find posts!"})
    }else{
      res.json({code:200, posts:posts.map(post=>{
        return {
          ...post._doc,
          createdAgo : post.createdAgo, // virtual 필드 조회
        }
      })})
    }
}))

// 글쓰기 기능
router.post('/write', isAuth, expressAsyncHandler( async(req,res,next)=>{
  console.log(req.body)

    const post = new Post({
        author: req.user._id,
        title: req.body.title,
        description: req.body.description,
        password: req.body.password,
        createdAt: req.body.createdAt,
        room: req.body.room
    })

    const newPost = await post.save()

    if(!newPost){
        res.status(401).json({code:401, message: "게시글 저장에 실패했습니다."})
      }else{
        res.status(201).json({code: 201, message:"게시글 작성이 완료되었습니다.", newTodo // 팝업ㅇ창에 띄우는용 
      })
    } // 201: created(생성됨)
}))

// 글읽기 기능
router.get('/read/:id', expressAsyncHandler((async(req,res,next)=>{
  const post = await Post.findOne({
      _id: req.params.id
  }).populate('author')

  if(!post){
      res.status(404).json({code:404, message: '404 not found'})
  }else{
    const { title, author, description, createdAt, isPrivacy, room} = post
    res.json({code: 201, title, author, description, createdAt, isPrivacy, room})
  }
})))

router.put('/read/:id', isAuth, expressAsyncHandler(async(req,res,next)=>{
    const post = await Post.findOne({
        author: req.user._id,
        _id: req.params.id
    })

    if(!post){
        res.status(404).json({code:404, message: '404 not found'})
    }else{
        post.title = req.body.title || post.title
        post.description =req.body.description || post.description
        post.isDone = req.body.isDone || post.isDone

    }
}))

router.delete('/read/:id', isAuth, expressAsyncHandler(async(req,res,next)=>{
  const post = await Post.findByIdAndDelete({
      _id: req.params.id
  })

  if(!post){
      res.statue(404).json({code:404, message: '404 not found'})
  }else{

  }
}))


module.exports = router