const express = require('express')
const User = require('../models/User') 
const expressAsyncHandler = require('express-async-handler')
const {generateToken , isAuth} = require('../auth')
const {validationResult, oneOf} = require('express-validator')
const { validateName, validateEmail, validateUserPassword} = require('../validator')
const router = express.Router()
const { limitUsage } = require('../limiter')


router.post('/register',limitUsage, oneOf([
    validateEmail(),
    validateUserPassword()
  ]), expressAsyncHandler(async (req, res, next) => {
    const errors = validationResult(req)
    if(!errors.isEmpty()){
        console.log(errors.array())
        res.status(400).json({ 
            code: 400, 
            message: 'Invalid Form data for user',
            error: errors.array()
        })
    }else{
        const user = new User({
            name: req.body.name,
            email: req.body.email,
            userId: req.body.userId,
            password: req.body.password
        })
        const newUser = await user.save() // DB에 User 생성
        if(!newUser){
            res.status(401).json({ code: 401, message: 'Invalid User Data'})
        }else{
            const { name, email, userId, isAdmin, createdAt, lastModified } = newUser 
            res.json({
                code: 200,
                token: generateToken(newUser),
                name, email, userId, isAdmin, createdAt,
                status: newUser.status,
                createdAgo: newUser.createdAt,
                lastModifiedAgo: newUser.lastModified,
            })
        }
    }
  }))


  router.post('/login', 
    expressAsyncHandler(async (req, res, next) => {
        console.log(req.body)
          //쿼리
      const errors = validationResult(req)
      if(!errors.isEmpty()){
        console.log(errors.array())
        res.status(400).json({
          code: 400, message: '사용자를 찾을 수 없습니다.',
          error: errors.array()
        })
      }else{
        console.log('로그인중...')
        const loginUser= await User.findOne({
          email : req.body.email,
          password: req.body.password
        })
        if(!loginUser){
          res.status(401).json({code: 401, message: '이메일 혹은 패스워드가 일치하지 않습니다.'})
        }else{
            
          const { name, email, userId, isAdmin, createdAt } = loginUser
          const token = generateToken(loginUser)
          console.log(token)
          res.cookie('token', JSON.stringify(token), {
            httpOnly: true, secure: true, expires: new Date(Date.now() + 24 * 3600000)
          })
          res.json({
            code: 200,
            token: generateToken(loginUser),
            name, email, userId, isAdmin, createdAt,
            status: loginUser.status,
            createdAgo: loginUser.createdAt,
            lastModified: loginUser.lastModified,
            message: '성공적으로 로그인 했습니다!'
          })

        }
      }
  }))

router.put('/users/modify', limitUsage,
oneOf([validateName(), validateEmail(), validateUserPassword()]), isAuth, expressAsyncHandler( async(req, res, next) => {
    const errors = validationResult(req)
    if(!errors.array()){
      res.status(400).json({
        code: 400,
        message: 'Invalid Form data for user',
        error: errors.array()
      })
    }else{
      const user = await User.findById(req.user._id) // 회원인지 검사
      if(!user){
        res.status(404).json({code: 400, message: "User Not Found"})
      }else{
        user.name = req.body.name || user.name
        user.email = req.body.email || user.email
        user.password = req.body.password || user.password
    
        const updatedUser = await user.save() //DB에 반영
        const {name, email, userId, isAdmin, createdAt , createAgo, lastModified, status} = updatedUser
        const token = generateToken(updatedUser) // 추가

        res.cookie('token', JSON.stringify(token), { // 추가 
            httpOnly: false, // 배포시 true
            secure: false, // 배포시 true
            expires: new Date(Date.now() + 24 * 3600000) // cookie will be removed after 24 hours
        })

        res.json({
          code: 200,
          token : generateToken(updatedUser),
          name, email, userId, isAdmin, createdAt, createAgo, lastModified, status
        })
      }
    }
  }
))

router.post('/logout', limitUsage, isAuth, expressAsyncHandler(async (req, res, next) => {
    const user = await User.findById(req.user._id)
    if (!user) {
      res.status(404).json({ code: 404, message: 'User Not Founded'})
    }else{
      res.clearCookie('token', {
        httpOnly: true, // 배포시 true
        secure: true, // 배포시 true
      })
      res.status(200).json({ code: 200, message: 'User Logged out successfully !' })
    } 
  }))

// isAuth : 사용자를 삭제할 권한이 있는지 검사하는 미들웨어 
router.delete('/', limitUsage, isAuth, expressAsyncHandler(async (req, res, next) => {
    const user = await User.findByIdAndDelete(req.user._id)
    if (!user) {
      res.status(404).json({ code: 404, message: 'User Not Founded'})
    }else{
      res.clearCookie('token', {
        httpOnly: true, // 배포시 true
        secure: true, // 배포시 true
      })
      res.status(204).json({ code: 204, message: 'User deleted successfully !' })
    } 
  }))


module.exports = router