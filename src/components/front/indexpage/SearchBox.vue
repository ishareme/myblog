<template>
  <div class="searchBox">
    <div class="searchItem">
      <input v-model="searchContent" type="text" @keyup.13="showComponent" placeholder="请殿下输入" class="searchInput">
    </div>
    <div class="closeSearch" @click="hiddenSearch">
      <i class="fa fa-times" aria-hidden="true"></i>
    </div>
    <transition>
      <component :is="currentComponent" :article="article"></component>
    </transition>
  </div>
</template>
<script>
  import bus from '../../../js/bus'
  import NoResult from './SearchResult/NoResult'
  import FrontSearchResult from './SearchResult/FrontSearchResult'
  export default {
    data(){
      return {
        hidden:'',
        currentComponent:'',
        searchContent:'',
        article:[]
      }
    },
    methods:{
      hiddenSearch(){
        bus.$emit('giveMsg',this.hidden)
      },
      showComponent(){
          if (this.searchContent != ''){
              this.$http.post('/api/articleSearchList',{articleTitle:this.searchContent}).then((res)=>{
                  this.article=res.data.data
                  console.log(res.data.data)
                  if (this.article.length != 0){
                      this.currentComponent=FrontSearchResult
                  }
                  else {
                      this.currentComponent=NoResult
                  }
              },(error)=>{
                  console.log(error)
              })
          }
          else {
              this.currentComponent=NoResult
          }

      }
    },
    components:{
        'NoResult':NoResult,
        'FrontSearchResult':FrontSearchResult
    },
  }
</script>
<style>
  .searchBox{
    position: fixed;
    top: 0;
    left: 0;
    width: 99.95%;
    height: 99.95%;
    background-color: white;
    display: flex;
    align-items: center;
    flex-direction: column;
    z-index: 1;
  }
  .searchItem{
    width: 8rem;
    height: 2rem;
    line-height: 2rem;
    margin: 3rem auto;
  }
  .searchInput{
    width: 8rem;
    height: 1rem;
    font-size: 16px;
    text-indent: 8px;
    outline: none;
    color: rgba(0,0,0,0.8);
    font-family: 'MakeWords';
    transition: border-bottom 2s;
  }
  .searchInput:focus{
    border-bottom: 1px solid rgba(0,0,0,0.5);
  }
  .closeSearch{
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
  .closeSearch:hover{
    box-shadow: -6px 6px 40px rgba(0,0,0,0.3);
    border: 1px solid #F8F8F8;
  }

  @media screen and (min-width: 800px) {
    .searchItem{
      width: 10rem;
      margin: 5% auto;
    }
  }
</style>
