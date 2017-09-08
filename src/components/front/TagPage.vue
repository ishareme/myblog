<template>
    <div class="TagItems">
        <div class="itemLogo">标签：</div>
        <div class="tagitems">
            <ul>
                <li v-for="item in tagArr">
                    <router-link :to="{ path:'TagItem', query: { tagName: item} }">
                        <span v-text="item"></span>
                    </router-link>
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
                article:[],
                tag:[],
                tagArr:[],
//                tagFinal:[]
            }
        },
        methods:{
        },
        created(){
            this.$http.get('/api/articleList').then((res)=>{
                this.article=res.data.data
                console.log(this.article)
                this.article.forEach(function (item, index) {
                    this.tag.push(item.tag)
                }.bind(this))
                this.tag.forEach( (item, index)=> {
                    var itemArr=item.split(',')
                    this.tagArr=this.tagArr.concat(itemArr)
                })
                //利用es6 set集合的元素必须是唯一的特性  进行去重
                this.tagArr=new Set(this.tagArr)
                //将set集合转化为数组，不然不能遍历
                this.tagArr=Array.from(this.tagArr)
                console.log(this.tagArr)

                //另一种方法 常规
//                this.tagArr.forEach((item,index)=>{
//                    if (this.tagFinal.indexOf(item) == -1){
//                        this.tagFinal.push(item)
//                    }
//                })
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
    .TagItems{
        position: fixed;
        top: 0;
        left: 0;
        width: 99.95%;
        height: 99.95%;
        background-color: white;
        z-index: 1;
        font-family: 'MakeWords';
    }
    .itemLogo{
        color: black;
        margin-top: 2.5rem;
        margin-left: 0.4rem;
        font-size: 25px;
    }
    .tagitems>ul{
        display: flex;
        justify-content: center;
        margin-top: 1rem;
        flex-wrap: wrap;
        overflow: hidden;
    }
    .tagitems li{
        float: left;
        padding: 0.1rem;
        margin-right: 0.2rem;
        transition: all 2s;
    }
    .tagitems li span{
        color: rgba(0,0,0,0.5);
        font-size: 16px;
    }
    .tagitems li:hover{
        color: rgba(0,0,0,0.5);
        box-shadow: 0 0 5px rgba(0,0,0,0.5);
        transform: translateY(5px);
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
