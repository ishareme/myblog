<template>
    <div class="categaryItems">
        <div class="itemLogo">分类：</div>
        <div class="cateitems">
            <ul>
                <li v-for="item in categary">
                    <router-link :to="{ path:'CategaryItem', query: { categaryName: item.name} }">
                        <span v-text="item.name"></span>
                    </router-link>
                    &nbsp;&nbsp;&nbsp;&nbsp;
                    <span class="categaryNumber" v-text="item.count"></span>
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
                categary:[]
            }
        },
        methods:{
        },
        created(){
            this.$http.get('/api/categaryList').then((res)=>{
                this.categary=res.data.data
                console.log(this.categary)
            },(error)=>{
                console.log(error)
            })
        }
    }
</script>
<style scoped>
    a{
        color: rgba(0,0,0,0.5);
    }
    .categaryItems{
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
    .itemLogo{
        color: black;
        margin-top: 4.5rem;
        font-size: 25px;
    }
    .cateitems{
        align-self: center;
        margin-left: -50px;
    }
    .cateitems li{
        padding: 0.1rem;
        display: flex;
        justify-content: space-between;
    }
    .cateitems li span{
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
