<template>
    <div class="timelineArticles">
        <!--<div class="categaryLogo" v-text="categary"></div>-->
        <div class="articles">
            <ul>
                <li v-for="article in articles">
                    <router-link :to="{path:'articleDetail',query:{id:article._id}}">
                        <span v-text="article.title"></span>
                    </router-link>
                    &nbsp;&nbsp;&nbsp;&nbsp;
                    <span v-text="article.pubDate" class="time"></span>
                </li>

            </ul>
            <div class="closeMenu">
                <router-link to="/">
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
                articles:[]
            }
        },
        methods:{
            getDate(){
                this.$http.get('/api/articleList').then((res)=>{
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
        font-size: 16px;
    }
    a:hover{
        text-decoration: underline;
        color: black;
    }
    li{
        display: flex;
        flex-direction: row-reverse;
        justify-content: space-between;
    }

    .timelineArticles{
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
    .articles{
        align-self: center;
    }
    .articles li{
        padding: 0.2rem;
    }
    .time{
        color: black;
        font-size: 20px;
    }
    .time:before{
        content: ' ◎ ';
        color: black;
        font-weight: bold;
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
