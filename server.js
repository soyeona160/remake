const express = require('express')
const app = express()
const mongoose =require('mongoose') 
const logger = require('morgan') 
const axios = require('axios')
const cors = require('cors')
const cookieParser = require('cookie-parser')

const usersRouter = require('./routes/users')
const postsRouter = require('./routes/posts')

const corsOptions = {
    origin : 'http://localhost:3000',
    credentials: true
}

mongoose.connect('mongodb://localhost:27017/canmate')
.then(()=>console.log('DB CONNECT DONE'))
.catch(e=>console.log(`CANNOT CONNECT DB ${e}`))


/* **************공통 미들웨어****************** */
app.use(cors(corsOptions))
// 미들웨어 설정 : 요청본문 request body 파싱(해석)을 위한 미들웨어
app.use(express.json()) // request body 파싱
app.use(logger('tiny'))// Logger 설정
app.use(cookieParser())
/* ************************************************************ */

app.use('/users', usersRouter)
app.use('/posts' , postsRouter)


// 폴백 핸들러 (fallback handler)
app.use( (req, res, next) => {  // 사용자가 요청한 페이지가 없는 경우 에러처리
    res.status(404).send("Sorry can't find page")
})
app.use( (err, req, res, next) => { // 서버 내부 오류 처리
    console.error(err.stack)
    res.status(500).send("something is broken on server !")
})

app.listen(5001, ()=>{
    console.log('server is running on port 5001...')
})