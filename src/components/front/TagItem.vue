<template>
    <div class="tagArticles">
        <div class="tagLogo" v-text="tag"></div>
        <div class="articles">
            <ul v-for="article in articles">
                <li>
                    <router-link :to="{path:'articleDetail',query:{id:article._id}}">
                        <span v-text="article.title"></span>
                    </router-link>
                    &nbsp;&nbsp;&nbsp;&nbsp;
                    <span v-text="article.pubDate"></span>
                </li>

            </ul>
            <div class="closeMenu">
                <router-link to="/TagPage">
                    <i class="fa fa-times" aria-hidden="true"></i>
                </router-link>
            </div>
        </div>
    </div>
</template>
<script>
    export default {
        data(){
            return {
                tag:'',
                articles:[]
            }
        },
        methods:{
            getDate(){
                this.tag = this.$route.query.tagName
                this.$http.post('/api/tagArticleList',{tag:this.tag}).then((res)=>{
                    this.articles=res.data.data
                    console.log(this.articles)
                },(error)=>{
                    console.log(error)
                })
            }
        },
        created(){
            this.getDate()
        },
        watch:{
            '$route' (to,from){
                this.getDate()
            }
        }

    }
</script>
<style scoped>
    a{
        color: rgba(0,0,0,0.5);
        transition: all 1s;
    }
    a:hover{
        text-decoration: underline;
        color: black;
    }
    .tagArticles{
        position: fixed;
        top: 0;
        left: 0;
        width: 99.95%;
        height: 99.95%;
        background-color: white;
        display: flex;
        justify-content: center;
        z-index: 1;
        font-family: 'MakeWords';
    }
    .tagLogo{
        color: black;
        margin-top: 2rem;
        font-size: 25px;
        margin-left: 0rem;
    }
    .articles{
        align-self: center;
    }
    .articles li{
        padding: 0.2rem;
    }
    .articles li span{
        color: rgba(0,0,0,0.5);
        font-size: 16px;
    }
    .closeMenu{
        position: fixed;
        right: 0;
        top: 0;
        width: 2rem;
        height: 1rem;
        line-height: 1rem;
        font-size: 20px;
        color: rgba(0,0,0,0.5);
        transition: box-shadow 1s;
    }
    .closeMenu:hover{
        box-shadow: -6px 6px 40px rgba(0,0,0,0.3);
        border: 1px solid #F8F8F8;
    }
</style>
