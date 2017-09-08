//引入创建的数据库链接mongoose
var mongoose=require('../db')

//每一个schema会一一对应mongodb中的collection
var schema=mongoose.Schema

//实例化一个Schema
var articleSchema=new schema(
    //设置article的collection信息的数据结构
    {
        title:String,
        categary:String,
        pubDate:String,
        update:String,
        abstract:String,
        abstractMD:String,
        content:String,
        contentMD:String,
        tag:String,
        views:Number
    },
    //{versionKey: false}是干嘛用？如果不加这个设置，我们通过mongoose第一次创建某个集合时，
    // 它会给这个集合设定一个versionKey属性值，我们不需要，所以不让它显示
    {
            versionKey:false
    }
)

//生成一个具体的article的model并导出
//第一个参数是集合名，在数据库中会自动加s
//把model名字字母全部变小写和在后面加负数s
var article=mongoose.model('article',articleSchema)



var categarySchema=new schema(
    {
        name:String,
        pubDate:String,
        count:Number
    },
    {
        versionKey:false
    }
)
var categary=mongoose.model('categary',categarySchema)


var tagSchema=new schema(
    {
        name:String,
    },
    {
        versionKey:false
    }
)
var tag=mongoose.model('tag',tagSchema)


var userSchema=new schema(
    {
        name:String,
        password:String,
        email:String,
        site:String,
        portrait:String
    },
    {
        versionKey:false
    }
)
var user=mongoose.model('user',userSchema)





//将article的model导出
module.exports={
    article,
    categary,
    tag,
    user,
}
