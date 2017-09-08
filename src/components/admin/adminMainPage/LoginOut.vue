<template>

</template>
<script>
    export default {
        data(){
            return{

            }
        },
        methods:{
            loginOut(){
                console.log('1')
                this.$http.get('/api/loginOut').then((res)=>{
                    if (res.data.status == 'y'){
                        console.log(res.data)
                        this.$message({
                            type: 'success',
                            message: res.data.message
                        });
                        this.$router.replace('/')
                    }
                    else {
                        this.$message.error(res.data.message);
                    }
                },(error)=>{
                    console.log(error)
                })
            }
        },
        created(){
            this.loginOut()
        }
    }
</script>
<style>

</style>