<template>
    <div>
        <div class="headerBox">
            <div class="menuBtn" @click="currentHeaderShow='MenuBox'"><i class="fa fa-bars" aria-hidden="true"></i> MENU</div>
            <div class="searchBtn" @click="currentHeaderShow='SearchBox'"><i class="fa fa-search" aria-hidden="true"></i></div>
        </div>
        <transition name="fadeMenu">
            <component :is="currentHeaderShow"></component>
        </transition>
    </div>
</template>
<script>
    import MenuBox from './MenuBox'
    import SearchBox from './SearchBox'
    import ArticleBox from './ArticleBox'
    import bus from '../../../js/bus'
    export default {
        data () {
            return {
                currentHeaderShow:''
            }
        },
        components:{
            'MenuBox':MenuBox,
            'SearchBox':SearchBox,
            'ArticleBox':ArticleBox
        },
        created(){
            bus.$on('giveMsg',function (value) {
                this.currentHeaderShow=value
            }.bind(this))
        }
    }
</script>
<style scoped>
    .headerBox{
        width: 100%;
        margin-top: 0.5rem;
        display: flex;
        justify-content: space-between;
    }
    .menuBtn{
        width: 2rem;
        height: 0.7rem;
        line-height: 0.7rem;
        cursor: pointer;
        transition: all 1s;
    }
    .searchBtn{
        width: 0.7rem;
        height: 0.7rem;
        line-height: 0.7rem;
        margin-right: 0.3rem;
        cursor: pointer;
        transition: all 1s;
    }
    .menuBtn:hover{
        background-color: #222222;
        box-shadow: 3px 3px 5px black;
        transform: translateY(10px);
    }
    .searchBtn:hover{
        background-color: #222222;
        box-shadow: -3px 3px 5px black;
        transform: translateY(10px);
    }


    @media screen and (min-width: 1000px) {
        .menuBtn,.searchBtn{
            font-size: 16px;
        }
    }



    .fadeMenu-enter-active, .fadeMenu-leave-active {
        transition: all 2s cubic-bezier(.53,1.58,.13,-0.51)
    }
    .fadeMenu-enter, .fadeMenu-leave-to {
        opacity: 0;
        width: 0;
        height: 0;
        left: 50%;
        top: 50%;
        transform: translateX(100%);
    }
</style>
