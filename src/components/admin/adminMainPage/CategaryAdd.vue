<template>
    <div class="categaryAdd">
        <el-button type="primary"  @click="open">点我添加分类哦~~~</el-button>
    </div>
</template>
<script>
    export default {
        data(){
            return {

            }
        },
        methods:{
            open(){
                this.$prompt('请输入分类名称', '提示', {
                    confirmButtonText: '添加',
                    cancelButtonText: '取消',
                    inputPattern: /\S/,
                    inputErrorMessage: '殿下要输入才能提交啦~~'
                }).then(({ value }) => {
                    this.$http.post('/api/submitCategary',{categary:value}).then((res)=>{
                        this.$message({
                            type:'success',
                            message:res.data.message
                        })
                        setTimeout(function () {
                            this.$router.push({path:'/admin/index/categaryList'})
                        }.bind(this),100)
                    },(error)=>{
                        console.log(error)
                    })
                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '取消输入'
                    });
                });
            }
        }
    }
</script>