var express=require('express')

var router=express.Router()

var Catagary=require('../schema/schemas').categary
var Article=require('../schema/schemas').article

router.get('/categaryList',function (req,res) {
    Catagary.find({}).sort({'_id':-1}).exec(function (error, data) {
        if (error){
            console.log('分类列表读取失败！')
        }
        else {
            console.log('分类列表读取成功！')
            res.json({
                status:'y',
                message:'分类列表读取成功！',
                data:data
            })
        }
    })
})

router.post('/categaryEdit',function (req,res) {
    Catagary.find({_id:req.body.id}).exec(function (error,data) {
        if (error){
            console.log('分类读取失败'+error)
        }
        else {
            console.log('分类读取成功！')
            res.json({
                status:'y',
                message:'分类读取成功！',
                data:data
            })
        }
    })
})
router.post('/updateCategary',function (req, res) {
    Catagary.find({_id:req.body.categary._id}).exec(function (error, data) {
        if (error){
            console.log('读取文章失败'+error)
        }
        else {
            //删除包含该分类的文章的分类
            //修改前的分类名
            var oldCatagaryName=data[0].name
            var regStr=oldCatagaryName
            var reg=new RegExp(regStr)
            Article.find({categary:reg}).exec(function (error,data) {
                if (error){
                    console.log('读取文章失败'+error)
                }
                else {
                    var oldArticle=data
                    oldArticle.forEach(function (item,index) {
                        var oldCate=item.categary
                        var newCate=req.body.categary.name
                        var newUpdata=oldCate.replace(oldCate,newCate)
                        var updateCategaryStr={
                            $set: {
                                //删除字符串某个字段
                                categary: newUpdata
                            }
                        }
                        Article.update({categary:reg},updateCategaryStr,function (error) {
                            if (error){
                                console.log('文章分类修改失败！'+error)
                            }
                            else {
                                console.log(oldCate)
                                console.log(item)
                                console.log('文章分类修改成功！')
                            }
                        })
                    })
                }
            })
        }
    })
    var whereStr={_id:req.body.categary._id}
    var updateStr={
        $set:{
            name:req.body.categary.name
        }
    }
    // console.log(req.body)
    Catagary.update(whereStr,updateStr,function (error) {
        if (error){
            console.log('分类修改失败！'+error)
            res.json({
                status:'n',
                message:'分类修改失败！',
                data:req.body
            })
        }
        else {
            console.log('分类修改成功！')
            res.json({
                status:'y',
                message:'分类修改成功！',
                data:req.body
            })
        }
    })
})

router.post('/deleteCategary',function (req,res) {
    Catagary.find({_id:req.body.id}).exec(function (error, data) {
        if (error){
            console.log('读取文章失败'+error)
        }
        else {
            //删除包含该分类的文章的分类
            var oldCatagaryName=data[0].name
            var regStr=oldCatagaryName
            var reg=new RegExp(regStr)
            console.log(reg)
            Article.find({categary:reg}).exec(function (error,data) {
                if (error){
                    console.log('读取文章失败'+error)
                }
                else {
                    var oldArticle=data
                    oldArticle.forEach(function (item,index) {
                        var updateCategaryStr={
                            $set: {
                                //删除字符串某个字段
                                categary: item.categary.split(','+oldCatagaryName).join('')
                            }
                        }
                        Article.update({categary:reg},updateCategaryStr,function (error) {
                            if (error){
                                console.log('文章分类修改失败！'+error)
                            }
                            else {
                                console.log('文章分类修改成功！')
                            }
                        })
                    })
                }
            })
        }
    })
    Catagary.remove({_id:req.body.id},function (error) {
        if (error){
            console.log('分类删除失败！'+error)
            res.json({
                status:'n',
                message:'分类删除失败！',
                data:req.body
            })
        }
        else {
            console.log('分类删除成功！')
            res.json({
                status:'n',
                message:'分类删除成功！',
                data:req.body
            })
        }
    })
})

router.post('/submitCategary',function (req,res) {
    var now=new Date()
    var year=now.getFullYear()
    var month=now.getMonth()+ 1 <10 ? ('0'+Number(now.getMonth()+ 1)) : now.getMonth()+ 1
    var day=now.getDate() < 10 ? ('0'+now.getDate()) : now.getDate()
    var pubDate=month+'月 '+day+', ' + year

    var categary=new Catagary({
        name:req.body.categary,
        pubDate:pubDate,
        count:0
    })
    categary.save(function (error) {
        if (error){
            console.log('分类添加失败'+error)
            res.json({
                status:'n',
                message:'分类添加失败',
                data:req.body
            })
        }
        else {
            console.log('分类添加成功')
            res.json({
                status:'y',
                message:'分类添加成功',
                data:req.body
            })
        }
    })
})



module.exports=router