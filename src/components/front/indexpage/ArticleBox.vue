<template>
  <div>
    <div class="articleItem" v-for="article in article">
      <div class="articleHeader">
        <div class="articleTiTle">
          <router-link :to="{path:'articleDetail',query:{id:article._id}}" v-text="article.title"></router-link>
        </div>
        <div class="articleTime">
          <i class="fa fa-calendar" aria-hidden="true"></i>
          <span v-text="article.pubDate"></span>
        </div>
      </div>
      <div class="articleContent">
        <div class="articleAbstract" v-text="article.abstract"></div>
        <span class="readDetail">&nbsp;&nbsp;<router-link :to="{path:'articleDetail',query:{id:article._id}}">&nbsp;&nbsp;阅读全文&nbsp;&nbsp;</router-link></span>
      </div>
      <div class="articleFooter">
        <div class="categary">
          <i class="fa fa-pencil-square-o"></i>
          <ul v-for="categary in article.categary.split(',')">
            <li>
              <router-link :to="{ path:'CategaryItem', query: { categaryName: categary} }" v-text="categary"></router-link>
            </li>
          </ul>
        </div>
        <div class="readDetailBtn">
          <router-link :to="{path:'articleDetail',query:{id:article._id}}">展开全文>></router-link>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  export default {
    data(){
      return {
          article:[]
      }
    },
      methods:{
        getArticle(){
            this.$http.get('/api/articleList').then((res)=>{
                this.article=res.data.data
                console.log(this.article)
            },(error)=>{
                console.log(error)
            })
        }
      },
      created(){
        this.getArticle()
      }
  }
</script>
<style scoped>
  .articleItem{
    width: 100%;
    margin: 1rem auto;
    text-align: left;
    padding: 0.4rem;
    color: rgba(255,255,255,0.5);
    transition: all 1s;
    font-family: 'MakeWords';
  }
  .articleItem:hover{
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
    line-height: 1.2;
    padding-bottom: 0.2rem;
    border-bottom: 1px solid rgba(255,255,255,0.2);
    overflow: hidden;
  }
  .articleAbstract{
    /*word-wrap 强调的是是否允许单词内断句，而word-break强调的则是怎么样来进行单词内的断句。*/
    word-wrap: break-word;
    /*word-break更粗暴*/
    word-break: break-all;
  }
  .readDetail{
    float: right;
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
  .categary{
    height: 0.6rem;
  }
  .categary>i{
    float: left;
    font-size: 16px;
    line-height: 0.6rem;
    margin-right: 0.1rem;
    display: inline-block;
  }
  .categary>ul{
    float: left;
    line-height: 0.6rem;
  }
  .categary>ul>li{
    float: left;
    margin-left: 0.1rem;
    font-size: 16px;
  }
  .categary>ul>li>a,.readDetailBtn>a{
    color: rgba(255,255,255,0.5);
    transition: all 1s;
  }
  .categary>ul>li:hover a,.readDetailBtn:hover a{
    color: white;
  }
  .readDetailBtn{
    height: 0.6rem;
    margin-top: 0.1rem;
    transition: all 1s;
    text-align: right;
  }
  .readDetailBtn>a{
    font-size: 18px;
  }

  @media screen and (min-width: 450px) {
    .articleItem {
      width: 8rem;
    }
  }
  @media screen and (min-width: 600px) {
    .articleItem {
      width: 10rem;
    }
  }
  @media screen and (min-width: 1000px) {
    .articleItem {
      width: 15rem;
    }
  }

</style>
