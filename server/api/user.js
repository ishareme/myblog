var express=require('express')




var router=express.Router()
var User=require('../schema/schemas').user

// var user=new User({
//     name:'ShineTomorrow',
//     password:'hmz5286182',
//     email:'65134877@qq.com',
//     site:'www.huangmingzhao.cn',
//     portrait:''
// })
// user.save(function (error) {
//     if (error){
//         console.log('管理员信息保存失败'+error)
//     }
//     else {
//         console.log('管理员信息保存成功')
//     }
// })

router.get('/isHasSession',function (req, res) {
    if (req.session.username){
        console.log('已经登录')
        console.log(req.session.username)
        res.json({
            status:'y',
            message:'已经登录，欢迎殿下来后台管理~~',
            data:req.session
        })
    }
    else {
        console.log('还没登录')
        res.json({
            status:'n',
            message:'殿下还没登录呢，赶快去登录吧~~',
            data:req.session
        })
    }
})

router.post('/adminUser',function (req, res) {
    User.find({}).exec(function (error,data) {
        if (error){
            console.log('管理员信息读取失败'+error)
        }
        else {
            console.log('管理员信息读取成功')
            if (req.body.loginForm.username == data[0].name && req.body.loginForm.password == data[0].password){
                console.log('登录成功')
                console.log(req.session)
                req.session.username=req.body.loginForm.username
                console.log(req.session.username)
                res.json({
                    status:'y',
                    message:'登录成功，欢迎殿下来后台管理~~',
                    data:data
                })
            }
            else{
                console.log('登录失败')
                res.json({
                    status:'n',
                    message:'殿下用户名密码不一致哦~~~',
                    data:data
                })
            }
        }
    })
})

router.get('/userList',(req,res)=>{
    User.find({}).sort({'_id':-1}).exec(function (error,data) {
        if (error){
            console.log('文章列表读取失败！')
        }
        else{
            res.json({
                status:'y',
                message:'用户列表读取成功！',
                data:data
            })
        }
    })
})
router.post('/userEdit',(req,res)=>{
    User.find({_id:req.body.id}).sort({'_id':-1}).exec(function (error,data) {
        if (error){
            console.log('文章列表读取失败！')
        }
        else{
            res.json({
                status:'y',
                message:'用户列表读取成功！',
                data:data
            })
        }
    })
})
router.post('/updateUser',function (req,res) {
    var updateUserStr={
        $set:{
            name:req.body.name,
            password:req.body.password,
            email:req.body.email,
            site:req.body.site,
            portrait:req.body.portrait
        }
    }
    User.update({_id:req.body.id},updateUserStr,function (error) {
        if (error){
            console.log('资料修改失败！'+error)
            res.json({
                status:'n',
                message:'资料修改失败！',
                data:req.body
            })
        }
        else {
            console.log('资料修改失败！')
            res.json({
                status:'y',
                message:'资料修改成功！',
                data:req.body
            })
        }
    })
})


router.get('/loginOut',function (req, res) {
    //退出：销毁session，并清除cookie；
    req.session.destroy(function (error) {
        if (error){
            console.log('退出登录失败')
            res.json({
                status:'n',
                message:'退出登录失败~~',
                data:req.session
            })
        }
        else {
            console.log('退出登录成功')
            res.clearCookie('admin')
            res.json({
                status:'y',
                message:'退出登录成功~~',
                data:req.session
            })
        }
    })
})

module.exports=router