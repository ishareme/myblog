<template>
    <div class="main">
        <div class="showBox" v-html="articleHTML">
        </div>
        <div class="closeBtn">
            <router-link :to="{ path:'/admin/index/articleAdd', query: { article: article} }"><i class="fa fa-close"></i></router-link>
        </div>
    </div>

</template>
<script>
    import ShowDown from 'showdown'
    var converter=new ShowDown.Converter()
    export default {
        data(){
            return {
                article:'',
                articleHTML:''
            }
        },
        created(){
            this.getArticleContent()
        },
        methods:{
            getArticleContent(){
                this.article = this.$route.query.article
                console.log(this.article)
                this.articleHTML=converter.makeHtml(this.$route.query.article.articleContent)
            }
        }
    }
</script>
<style>
    .main{
        position: relative;
    }
    .showBox{
        text-align: left;
        line-height: 1.5;
        padding: 20px 50px 20px 50px;
        color: rgba(255,255,255,0.5);
    }
    .closeBtn{
        width: 55px;
        height: 55px;
        position: absolute;
        right: -10px;
        top: -65px;
        font-size: 25px;
        line-height: 50px;
        text-align: center;
        transition: all 1s;
    }
    .closeBtn:hover{
        box-shadow: 0px 0px 10px rgba(0,0,0,0.5);
        color: white;
    }
    blockquote {
        border-left:#eee solid 5px;
        padding-left:20px;
    }
    pre {
        margin-top: 10px;
        margin-bottom: 10px;
        color: white;
        background-color: #434343;
        padding: 10px;
    }
    code{
        max-width: 100px !important;
        /*word-wrap 强调的是是否允许单词内断句，而word-break强调的则是怎么样来进行单词内的断句。*/
        /*word-wrap: break-word !important;*/
        /*word-break更粗暴*/
        word-break: break-all !important;
        /*保留空白符序列，但是正常地进行换行。*/
        white-space: pre-wrap !important;
    }
    strong{
        color: white;
    }
    p>img{
        margin-top: 10px;
        margin-bottom: 10px;
        width: 50%;
    }
</style>