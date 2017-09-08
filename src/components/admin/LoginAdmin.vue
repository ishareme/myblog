<template>
    <div class="loginAdmin">
        <div class="closeLogin"></div>
        <el-form :model="loginForm" :rules="rules" ref="loginForm" label-width="100px" class="loginForm">
            <el-form-item label="UserName" prop="username">
                <el-input v-model="loginForm.username"></el-input>
            </el-form-item>
            <el-form-item label="PassWord" prop="password">
                <el-input type="password" v-model="loginForm.password"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="submitForm('loginForm')" :loading="loadingBtnOpen">登录</el-button>
                <el-button @click="resetForm('loginForm')">重置</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>
<script>
    export default {
        data() {
            return {
                loadingBtnOpen:false,
                loginForm: {
                    username:'',
                    password:''
                },
                rules: {
                    username: [
                        { required: true, message: '殿下要输入用户名哦~~', trigger: 'blur' },
                        { min: 3, message: '殿下用户名最小长度是3哦~~', trigger: 'blur' }
                    ],
                    password: [
                        { required: true, message: '殿下要输入密码哦~~', trigger: 'blur' },
                        { min: 3, message: '殿下密码最小长度是3哦~~', trigger: 'blur' }
                    ],
                }
            };
        },
        methods: {
            isHasSession(){
                this.$http.get('/api/isHasSession').then((res)=>{
                    if (res.data.status == 'y'){
                        this.$message({
                            message:res.data.message,
                            type: 'success'
                        });
                        this.$router.push({path:'/admin/index'})
                    }
                },(error)=>{
                    console.log(error)
                })
            },
            submitForm(formName) {
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        this.loadingBtnOpen=true
                        this.$http.post('/api/adminUser',{loginForm:this.loginForm}).then((res)=>{
                            if (res.data.status == 'y'){
                                this.$message({
                                    message:res.data.message,
                                    type: 'success'
                                });
                                setTimeout(function () {
                                    this.loadingBtnOpen=false
                                    this.$router.push({path:'/admin/index'})
                                }.bind(this),800)
                            }
                            else {
                                this.$message.error(res.data.message);
                                this.loadingBtnOpen=false
                            }
                        },(error)=>{
                            console.log(error)
                        })
                    } else {
                        console.log('error submit!!');
                        return false;
                    }
                });
            },
            resetForm(formName) {
                this.$refs[formName].resetFields();
            }
        },
        created(){
            this.isHasSession()
        }
    }
</script>
<style>
    .loginAdmin{
        display: flex;
        justify-content: center;
        align-items: center;
        margin-top: 15%;
        font-size: 20px;
    }
    .loginForm{
        display: flex;
        flex-direction: column;
        padding: 50px 90px 40px 80px;
        background-color: rgb(34,34,34);
        box-shadow: 0 0 20px rgba(0,0,0,0.2);
    }
    .el-form-item{
        margin-top: 20px;
    }
    .el-form-item__label{
        font-size: 20px;
        color: white;
    }
</style>