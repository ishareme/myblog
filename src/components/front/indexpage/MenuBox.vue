<template>
  <div class="menuItems">
    <div class="items">
      <ul>
        <li>
          <router-link to="/">
            <span>主页</span>
          </router-link>
        </li>
        <li>
          <router-link to="/CategaryPage">
            <span>分类</span>
          </router-link>
        </li>
        <li>
          <router-link to="/TagPage">
            <span>标签云</span>
          </router-link>
        </li>
        <li>
          <router-link to="/TimeLinePage">
            <span>时间轴</span>
          </router-link>
        </li>
        <li>
          <router-link to="/">
            <span>摄影</span>
          </router-link>
        </li>
      </ul>
      <div class="closeMenu" @click="hiddenMenu">
        <i class="fa fa-times" aria-hidden="true"></i>
      </div>
    </div>
  </div>
</template>
<script>
  import bus from '../../../js/bus'
  export default {
    data(){
      return {
        hidden:'',
      }
    },
    methods:{
      hiddenMenu(){
        bus.$emit('giveMsg',this.hidden)
      }
    }
  }
</script>
<style>
  .menuItems{
    position: fixed;
    top: 0;
    left: 0;
    width: 99.95%;
    height: 99.95%;
    background-color: white;
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 1;
    font-family: 'MakeWords';
  }
  .items li{
    padding-top: 0.1rem;
  }
  .items li span{
    color: rgba(0,0,0,0.5);
    font-size: 16px;
  }
  .items>ul>li:nth-child(1){
    animation:subMenuAnimateOneIn 2s cubic-bezier(.06,1.59,1,-0.13) 0s 1;
  }
  .items>ul>li:nth-child(2){
    animation:subMenuAnimateOneIn 2.5s cubic-bezier(.06,1.59,1,-0.13) 0s 1;
  }
  .items>ul>li:nth-child(3){
    animation:subMenuAnimateTwoIn 3s cubic-bezier(.06,1.59,1,-0.13) 0s 1;
  }
  .items>ul>li:nth-child(4){
    animation:subMenuAnimateTwoIn 2.5s cubic-bezier(.06,1.59,1,-0.13) 0s 1;
  }
  .items>ul>li:nth-child(5){
    animation:subMenuAnimateTwoIn 2s cubic-bezier(.06,1.59,1,-0.13) 0s 1;
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

  @keyframes subMenuAnimateOneIn {
    0%{
      transform: translateX(10rem);
    }
    100%{
      transform: translateX(0px);
    }
  }
  @keyframes subMenuAnimateTwoIn {
    0%{
      transform: translateX(-10rem);
    }
    100%{
      transform: translateX(0px);
    }
  }
  @keyframes subMenuAnimateOneOut {
    0%{
      transform: translateX(0rem);
    }
    100%{
      transform: translateX(10px);
    }
  }
  @keyframes subMenuAnimateTwoOut {
    0%{
      transform: translateX(0rem);
    }
    100%{
      transform: translateX(-10px);
    }
  }
</style>
