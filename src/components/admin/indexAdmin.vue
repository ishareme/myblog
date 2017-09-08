<template>
    <div class="admin">
        <admin-header></admin-header>
        <div class="adminMain">
            <admin-main-box></admin-main-box>
        </div>
    </div>

</template>
<style>

</style>
<script>
    import AdminHeader from './adminPage/AdminHeader'
    import AdminMainBox from './adminPage/AdminMainBox'
    export default {
        data () {
            return {

            }
        },
        created(){
            this.isHasSession()
        },
        methods:{
            isHasSession(){
                this.$http.get('/api/isHasSession').then((res)=>{
                    if (res.data.status == 'n'){
                        this.$message({
                            message:res.data.message,
                            type: 'success'
                        });
                        this.$router.push({path:'/admin'})
                    }
                },(error)=>{
                    console.log(error)
                })
            },
        },
        components:{
            'AdminHeader':AdminHeader,
            'AdminMainBox':AdminMainBox
        },
    }
</script>
<style>
    .adminMain{
        margin-top:30px;
        overflow: hidden;
        display: flex;
    }
</style>