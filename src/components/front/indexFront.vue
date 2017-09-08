<template>
  <div v-bind:class="{ day: isActive}">
    <header-box></header-box>
    <logo-title></logo-title>
    <article-box></article-box>
    <footer-box></footer-box>
  </div>
</template>
<script>
  import HeaderBox from './indexpage/HeaderBox'
  import LogoTitle from './indexpage/LogoTitle'
  import ArticleBox from './indexpage/ArticleBox'
  import FooterBox from './indexpage/FooterBox'
  export default {
    data () {
      return {
        isOn:true,
          isActive:false
      }
    },
    components:{
      'HeaderBox':HeaderBox,
      'ArticleBox':ArticleBox,
      'LogoTitle':LogoTitle,
      'FooterBox':FooterBox
    }
  }
</script>
<style>
</style>