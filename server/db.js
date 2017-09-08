//引入mongoose模块
var mongoose=require('mongoose')
mongoose.Promise=require('bluebird')

//数据库连接地址  连接到mynlog数据库
var DB_URL='mongodb://localhost:27017/myblog'
//进行数据库连接
mongoose.connect(DB_URL)

//连接成功终端显示消息
mongoose.connection.on('connected',function () {
    console.log('mongoose connection open to ' +DB_URL)
})

//连接失败终端显示消息
mongoose.connection.on('error',function () {
    console.log('mongoose error')
})

//连接断开终端显示消息
mongoose.connection.on('disconnected',function () {
    console.log('mongoose disconnected')
})

//导出
module.exports=mongoose

