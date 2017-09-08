<template>
  <div id="app">
    <transition name="fadeMain">
      <keep-alive>
        <router-view></router-view>
      </keep-alive>
    </transition>
  </div>
</template>

<script>
export default {
  name: 'app'
}
</script>

<style>
  @font-face {
    font-family: 'Montserrat';
    src: url('../static/font/Montserrat-Thin.otf');
  }
  @font-face {
    font-family: 'MakeWords';
    src: url('../static/font/造字工房尚黑G0v1细体.otf');
  }
  *{
    padding: 0;
    margin: 0;
    border: 0;
    box-sizing: border-box;
  }
  html{
    width: 100%;
    height: auto;
  }
  body{
    width: 100%;
    background: #222222;
    color: white;
    font-family: 'MakeWords';
  }
  li{
    list-style: none;
  }
  a{
    text-decoration: none;
    color: white;
  }
  #app {
    width: 100%;
    margin: 0 auto;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
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
    width: 100%;
  }


  .fadeMain-enter-active, .fadeMenu-leave-active {
    transition: all 1s cubic-bezier(.12,1,.94,.71)
  }
  .fadeMain-enter, .fadeMenu-leave-to {
    opacity: 0;
    width: 0;
    height: 0;
    transform: translateX(40%) ;
  }
</style>
