<template>
    <div>
        <header-box></header-box>
        <div class="articleDetail">
            <div class="articleHeader">
                <div class="articleTiTle">
                    <a href="#" v-text="articleDetail.title"></a>
                </div>
                <div class="articleTime">
                    <i class="fa fa-calendar" aria-hidden="true"></i>
                    <span v-text="articleDetail.pubDate"></span>
                </div>
            </div>
            <div class="articleContent">
                <div class="abstract" v-html="articleDetail.abstractMD"></div>
                <div class="content" v-html="articleDetail.contentMD"></div>
            </div>
            <div class="articleFooter">
                <div class="tags">
                    <i class="fa fa-tags" aria-hidden="true"></i>
                    <ul v-for="tag in articleDetail.tag.split(',')">
                        <li>
                            <router-link :to="{ path:'TagItem', query: { tagName: tag} }" v-text="tag"></router-link>
                        </li>
                    </ul>
                </div>
                <div class="footerBtn">
                    <div class="viewBtn">
                        <i class="fa fa-eye"></i>
                        &nbsp;<span v-text="articleDetail.views"></span>
                    </div>
                    <div class="shareBtn">
                        <i class="fa fa-share-alt" aria-hidden="true"></i>
                    </div>
                </div>

            </div>
            <div class="closeBtn" @click="closeArticle">
                <i class="fa fa-times" aria-hidden="true"></i>
            </div>
        </div>
    </div>
</template>
<script>
    import HeaderBox from './indexpage/HeaderBox'
    export default {
        data(){
            return {
                id:'',
                articleDetail:[]
            }
        },
        components:{
            'HeaderBox':HeaderBox,
        },
        methods:{
            closeArticle(){
                this.$router.push({path:'/'})
            },
            getArticleDetail(){
                this.id=this.$route.query.id
                this.$http.post('/api/articleEdit',{id:this.id}).then((res)=>{
                    this.articleDetail=res.data.data[0]
                    console.log(this.articleDetail)
                },(error)=>{
                    console.log(error)
                })
            },
            postViewNum(){
                this.$http.post('/api/updateArticleView',{id:this.id}).then((res)=>{
//                    this.articleDetail.view=res.data.data[0]
                    console.log(res.data.message)
                },(error)=>{
                    console.log(error)
                })
            }
        },
        created(){
            this.getArticleDetail()
            this.postViewNum()
        },
        watch: {
            '$route' (to, from) {
                this.getArticleDetail()
                this.postViewNum()
            }
        },
    }
</script>
<style scoped>
    .articleDetail{
        width: 100%;
        margin: 1rem auto;
        text-align: left;
        padding: 0.4rem;
        color: rgba(255,255,255,0.5);
        transition: all 1s;
        font-family: 'MakeWords';
        position: relative;
    }
    .articleDetail:hover{
        box-shadow: 0 0 20px rgba(0,0,0,0.5);
        transform: translateY(5px);
    }
    .articleHeader{
        display: flex;
        flex-direction: column;
    }
    .articleTiTle>a{
        color: rgba(255,255,255,0.5);
        font-size: 20px;
        line-height: 1;
        padding-bottom: 0.1rem;
        transition: all 2s;
    }
    .articleTiTle>a:hover{
        color: white;
        border-bottom: 1px solid white;
    }
    .articleTime{
        text-align: right;
        padding-right: 0.5rem;
        font-size: 16px;
        margin-top: 0.2rem;
    }
    .articleTime>span{
        margin-left: 0.1rem;
    }
    .articleContent{
        margin-top: 0.2rem;
        font-size: 15px;
        line-height: 1.5;
        padding-bottom: 0.2rem;
        border-bottom: 1px solid rgba(255,255,255,0.2);
    }
    .articleContent>.abstract{
        padding: 20px;
        line-height: 1.5;
        font-size: 16px;
        /*word-wrap 强调的是是否允许单词内断句，而word-break强调的则是怎么样来进行单词内的断句。*/
        word-wrap: break-word;
        /*word-break更粗暴*/
        word-break: break-all;
    }
    .articleContent>.content{
        padding: 10px;
        line-height: 1.5;
        font-size: 16px;
        /*word-wrap 强调的是是否允许单词内断句，而word-break强调的则是怎么样来进行单词内的断句。*/
        word-wrap: break-word;
        /*word-break更粗暴*/
        word-break: break-all;
    }
    ul li {
        line-height: 24px;
    }
    pre {
        color:#D34B62;
        background: white;
        /*word-wrap 强调的是是否允许单词内断句，而word-break强调的则是怎么样来进行单词内的断句。*/
        word-wrap: break-word;
        /*word-break更粗暴*/
        word-break: break-all;
    }
    .readDetail>a{
        color: rgba(255,255,255,0.5);
        font-size: 16px;
        text-decoration: underline;
        transition: all 1s;
    }
    .readDetail:hover a{
        color: white;
        text-decoration: none;
    }
    .articleFooter{
        width: 100%;
        margin-top: 0.2rem;
        display: flex;
        flex-direction: column;
    }
    .tags{
        height: 0.6rem;
    }
    .tags>i{
        float: left;
        font-size: 16px;
        line-height: 0.6rem;
        margin-right: 0.1rem;
        display: inline-block;
    }
    .tags>ul{
        float: left;
        line-height: 0.6rem;
    }
    .tags>ul>li{
        float: left;
        margin-left: 0.1rem;
        font-size: 16px;
    }
    .tags>ul>li>a,.readDetailBtn>a{
        color: rgba(255,255,255,0.5);
        transition: all 1s;
    }
    .tags>ul>li:hover a,.readDetailBtn:hover a{
        color: white;
    }
    .footerBtn{
        margin-top: 0.1rem;
        padding: 0.05rem;
        display: flex;
        justify-content: space-between;
    }
    .viewBtn{
        font-size: 16px;
        cursor: pointer;
        transition: all 1s;
    }
    .shareBtn{
        font-size: 20px;
        cursor: pointer;
        transition: all 1s;
    }
    .shareBtn:hover,.viewBtn:hover{
        color: white;
    }
    .closeBtn{
        width: 0.5rem;
        height: 0.5rem;
        text-align: center;
        line-height: 0.5rem;
        font-size: 18px;
        transition: all 1s;
        cursor: pointer;
        position: absolute;
        top: 0;
        right: 0;
    }
    .closeBtn:hover{
        color: white;
    }

    @media screen and (min-width: 450px) {
        .articleDetail {
            width: 8rem;
        }
    }
    @media screen and (min-width: 600px) {
        .articleDetail {
            width: 10rem;
        }
    }
    @media screen and (min-width: 1000px) {
        .articleDetail {
            width: 15rem;
        }
    }
</style>
