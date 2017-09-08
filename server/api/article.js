var express=require('express')
var router=express.Router()

//引入showdown 将md文本转化为markdown
var Showdown=require('showdown')
var converter=new Showdown.Converter()

var Article=require('../schema/schemas').article
var Categary=require('../schema/schemas').categary


router.post('/submitArticle',function (req,res) {
    var now=new Date()
    var year=now.getFullYear()
    var month=now.getMonth()+ 1 <10 ? ('0'+Number(now.getMonth()+ 1)) : now.getMonth()+ 1
    var day=now.getDate() < 10 ? ('0'+now.getDate()) : now.getDate()
    var pubDate=month+'月 '+day+', ' + year
    //实例化一个article
    var article=new Article({
        title:req.body.articleTitle,
        categary:req.body.articleCategary,
        pubDate:pubDate,
        update:pubDate,
        abstract:req.body.articleAbstract,
        abstractMD:converter.makeHtml(req.body.articleAbstract),
        content:req.body.articleContent,
        contentMD:converter.makeHtml(req.body.articleContent),
        tag:req.body.articleTag,
        views:0
    })
    article.save(function (error) {
        if (error){
            console.log('文章添加失败'+error)
            res.json({
                status:'n',
                message:'文章发布失败',
                data:req.body
            })
        }
        else {
            //进行分类的数量增加一
            var categaryArr=req.body.articleCategary
            categaryArr.forEach(function (item,index) {
                var whereStr={name:item}
                //$inc相当于+=
                var updateStr={
                    $inc: {
                        count: 1
                    }
                }
                Categary.update(whereStr,updateStr,function (error) {
                    if (error){
                        console.log('分类的数量修改失败！'+error)
                    }
                    else {
                        console.log('分类的数量修改成功！')
                    }
                })
            })
            console.log('文章添加成功')
            res.json({
                status:'y',
                message:'文章发布成功',
                data:req.body
            })
        }
    })
})

router.get('/articleList',function (req,res) {
    Article.find({}).sort({'_id':-1}).exec(function (error,data) {
        if (error){
            console.log('文章列表读取失败！')
        }
        else{
            res.json({
                status:'y',
                message:'文章列表读取成功！',
                data:data
            })
        }
    })
})

//通过分类名模糊查询文章
router.post('/categaryArticleList',function (req,res) {
    var regStr=req.body.categary
    var reg=new RegExp(regStr)
    Article.find({categary:reg}).sort({'_id':-1}).exec(function (error,data) {
        if (error){
            console.log('文章列表读取失败！')
        }
        else{
            res.json({
                status:'y',
                message:'文章列表读取成功！',
                data:data
            })
        }
    })
})
//通过标签名模糊查询文章
router.post('/tagArticleList',function (req,res) {
    var regStr=req.body.tag
    var reg=new RegExp(regStr)
    Article.find({tag:reg}).sort({'_id':-1}).exec(function (error,data) {
        if (error){
            console.log('文章列表读取失败！')
        }
        else{
            res.json({
                status:'y',
                message:'文章列表读取成功！',
                data:data
            })
        }
    })
})

router.post('/articleSearchList',function (req,res) {
    //模糊查询
    var regStr=req.body.articleTitle
    var reg=new RegExp(regStr)
    Article.find({title:reg}).sort({'_id':-1}).exec(function (error,data) {
        if (error){
            console.log('文章获取失败！')
            res.json({
                status:'y',
                message:'文章获取失败！',
                data:data
            })
        }
        else{
            console.log(data)
            console.log('文章获取成功！')
            res.json({
                status:'y',
                message:'文章获取成功！',
                data:data
            })
        }
    })
})

//获取文章编辑页的文章列表
router.post('/articleEdit',function (req,res) {
    Article.find({_id:req.body.id}).exec(function (error,data) {
        if (error){
            console.log('文章读取失败！')
        }
        else {
            res.json({
                status:'y',
                message:'文章读取成功！',
                data:data
            })
        }
    })
})

router.post('/updateArticle',function (req,res) {
    var now=new Date()
    var year=now.getFullYear()
    var month=now.getMonth()+ 1 <10 ? ('0'+Number(now.getMonth()+ 1)) : now.getMonth()+ 1
    var day=now.getDate() < 10 ? ('0'+now.getDate()) : now.getDate()
    var update=month+'月 '+day+', ' + year
    var whereStr={_id:req.body.id}
    var updateStr={
        $set:{
            title:req.body.title,
            categary:req.body.categary,
            update:update,
            abstract:req.body.abstract,
            abstractMD:converter.makeHtml(req.body.abstract),
            content:req.body.content,
            contentMD:converter.makeHtml(req.body.content),
            tag:req.body.tag,
        }
    }

    //获取这个文章原先的分类 进行数量减一
    var oldCategary=[]
    Article.find(whereStr).exec(function (error,data) {
        if (error){
            console.log('文章读取失败！')
        }
        else {
            oldCategary=data[0].categary.split(',')
            oldCategary.forEach(function (item,index) {
                var whereCategaryStr={name:item}
                //$inc相当于+=
                var updateCategaryStr={
                    $inc: {
                        count: -1
                    }
                }
                Categary.update(whereCategaryStr,updateCategaryStr,function (error) {
                    if (error){
                        console.log('分类的数量修改失败！'+error)
                    }
                    else {
                        console.log('分类的数量修改成功！')
                    }
                })
            })
        }
    })
    Article.update(whereStr,updateStr,function (error) {
        if (error){
            console.log('文章修改失败！'+error)
            res.json({
                status:'n',
                message:'文章修改失败！',
                data:req.body
            })
        }
        else {
            //进行分类的数量增加一
            var categaryArr=req.body.categary
            categaryArr.forEach(function (item,index) {
                var whereStrAddCate={name:item}
                //$inc相当于+=
                var updateStrAddCate={
                    $inc: {
                        count: 1
                    }
                }
                Categary.update(whereStrAddCate,updateStrAddCate,function (error) {
                    if (error){
                        console.log('分类的数量修改失败！'+error)
                    }
                    else {
                        console.log('分类的数量修改成功！')
                    }
                })
            })
            console.log('文章修改成功！')
            res.json({
                status:'y',
                message:'文章修改成功！',
                data:req.body
            })
        }
    })
})

router.post('/updateArticleView',function (req, res) {
    var whereArticleStr={_id:req.body.id}
    //$inc相当于+=
    var updateArticleStr={
        $inc: {
            views: 1
        }
    }
    Article.update(whereArticleStr,updateArticleStr,function (error) {
        if (error){
            console.log('更新文章浏览量错误'+error)
            res.json({
                status:'n',
                message:'更新文章浏览量错误！',
                data:req.body
            })
        }
        else {
            console.log('更新文章浏览量成功！')
            res.json({
                status:'y',
                message:'更新文章浏览量成功！',
                data:req.body
            })
        }
    })
})

router.post('/deleteArticle',function (req,res) {
    var oldCategary=[]
    Article.find({_id:req.body.id}).exec(function (error,data) {
        if (error){
            console.log('文章读取失败！')
        }
        else {
            oldCategary=data[0].categary.split(',')
            oldCategary.forEach(function (item,index) {
                var whereCategaryStr={name:item}
                //$inc相当于+=
                var updateCategaryStr={
                    $inc: {
                        count: -1
                    }
                }
                Categary.update(whereCategaryStr,updateCategaryStr,function (error) {
                    if (error){
                        console.log('分类的数量修改失败！'+error)
                    }
                    else {
                        console.log('分类的数量修改成功！')
                    }
                })
            })
        }
    })
    Article.remove({_id:req.body.id},function (error) {
        if (error){
            console.log(error)
            res.json({
                status:'n',
                message:'文章删除失败！',
                data:req.body
            })
        }
        else {
            res.json({
                status:'n',
                message:'文章删除成功！',
                data:req.body
            })
        }
    })
})

module.exports=router