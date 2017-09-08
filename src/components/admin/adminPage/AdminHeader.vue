<template>
    <div class="adminHeader">
        <div class="adminHeaderL">
            A d m i n
        </div>

        <div class="adminHeaderR">
            <div>
                <el-input
                        size="small"
                        placeholder="请殿下输入"
                        icon="search"
                        v-model="inputSearch"
                        @click="handleIconClick(inputSearch)">
                </el-input>
            </div>
            <div class="portrait">
                <div class="portraitIcon" @click="">
                    <img :src="portrait" alt="">
                </div>
            </div>
        </div>
    </div>
</template>
<script>
    export default {
        data() {
            return {
                portrait:'',
                inputSearch: '',
                searchTxt:''
            }
        },
        methods: {
            handleIconClick(value) {
                this.searchTxt=this.inputSearch
                this.$router.replace({
                    path:'/admin/SearchResult',
                    query:{articleTitle:this.searchTxt}
                })
            },
            getPortrait(){
                this.$http.get('/api/userList').then((res)=>{
                    this.portrait=res.data.data[0].portrait
                    console.log(res.data.data[0])
                },(error)=>{
                    console.log(error)
                })
            }
        },
        created(){
            this.getPortrait()
        }
    }
</script>
<style>
    .adminHeader{
        width: 100%;
        height: 55px;
        background-color: rgb(50,65,87);
        box-shadow: 0 5px 5px rgba(0,0,0,0.5);
        display: flex;
        justify-content: space-between;
        position: fixed;
        top: 0;
        z-index: 99;
    }
    .adminHeaderL{
        width: 120px;
        height: 55px;
        margin-left: 30px;
        line-height: 55px;
        text-align: left;
        font-size: 30px;
        background: linear-gradient(to bottom,rgba(255,255,255,0.5), yellow);
        -webkit-text-fill-color: transparent;
        -webkit-background-clip: text;
        box-shadow: 5px 0 5px rgba(0,0,0,0.2);
    }
    .adminHeaderR{
        margin-right: 10px;
        display: flex;
    }
    .el-input{
        line-height: 55px;
    }
    .portrait{
        width: 55px;
        height: 55px;
        margin-left: 25px;
        line-height: 55px;
        box-shadow: -5px 0 5px rgba(0,0,0,0.2);
    }
    .portraitIcon{
        cursor: pointer;
    }
    .portrait img{
        width: 30px;
        height: 30px;
        border-radius: 50%;
        margin-top: 10px;
        margin-left: 10px;
        line-height: 110px;
        transition: all 2s;
        opacity: 1;
    }
    .portrait img:hover{
        border-radius: 0;
        opacity: 0.5;
    }
</style>