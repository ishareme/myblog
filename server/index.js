//导入模块
var express=require('express')
var bodyParser=require('body-parser')


//虽然session与cookie是分开保存的.但是session中的数据经过加密处理后默认保存在一个cookie中.
// 因此在使用session中间件之前必须使用cookieParser中间件.
var session=require('express-session')
var cookieParser=require('cookie-parser')


//实例化函数
var app=express()

app.use(express.static('../dist'))

app.use(bodyParser.urlencoded({extended:false}))
app.use(bodyParser.json())

//应用cookieParser 和session
app.use(cookieParser());
var identityKey='admin'
app.use(session({
    name:identityKey,
    secret:'this is the secret for cookie',
    saveUninitialized: false,  // 是否自动保存未初始化的会话，建议false
    resave: false,  // 是否每次都重新保存会话，建议false
    cookie: { maxAge: 60 * 1000 * 600 }, // 有效期，单位是毫秒
}))

// 允许跨域访问／／／
app.all('/api/*', function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*')
  res.header('Access-Control-Allow-Headers', 'x-Request-with')
  res.header('Access-Control-Allow-Methods', 'PUT,POST,GET,DELETE,OPTIONS')
  res.header('X-Powered-By', '4.15.2')
  res.header('Content-Type', 'application/json;charset=utf-8')
  next()   //执行下一个中间件。
})

// app.post('/api/submitArticle',function (req,res) {
//   res.json({
//     status:'y',
//     message:'提交成功',
//     data:req.body
//   })
// })

var article=require('./api/article')
var categary=require('./api/catagary')
var user=require('./api/user')

app.use('/api',article)

app.use('/api',categary)

app.use('/api',user)


app.listen(3000,()=>{
  console.log('node is ok')
})
