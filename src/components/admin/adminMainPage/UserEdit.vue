<template>
    <div class="userEdit">
        <ring-loader :loading="loading" class="loadingBox"></ring-loader>
        <el-form v-if="showForm" class="userEditForm" v-bind:model="user" :rules="rules" ref="userEditForm" label-width="150px">
            <el-form-item label="用户名:" prop="name">
                <el-input type="text" v-model="user.name" class="userItem"></el-input>
            </el-form-item>
            <el-form-item label="密码:" prop="password">
                <el-input type="text" v-model="user.password" class="userItem"></el-input>
            </el-form-item>
            <el-form-item label="邮箱:" prop="email">
                <el-input type="email" v-model="user.email" class="userItem"></el-input>
            </el-form-item>
            <el-form-item label="网址:" prop="site">
                <el-input type="email" v-model="user.site" class="userItem"></el-input>
            </el-form-item>
            <el-form-item label="头像上传:" prop="site">
                <el-upload
                        class="avatar-uploader"
                        action="http://upload-z0.qiniu.com"
                        :show-file-list="false"
                        :on-success="handleAvatarSuccess"
                        :on-error="handleError"
                        :before-upload="beforeAvatarUpload"
                        :data="postData"
                >
                    <img v-if="imageUrl" :src="imageUrl" class="avatar">
                    <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                </el-upload>
            </el-form-item>
            <el-form-item class="articleEditBtn">
                <el-button type="primary" @click="updateForm('userEditForm')" :loading="loadingBtnOpen" size="large">修改</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>
<script>
    import RingLoader from 'vue-spinner/src/RingLoader.vue'
    export default {
        data() {
            return {
                postData: {
                    token: 'mtg8F0dboavigT9v_0LI7T78jG-uUOKD98xHO7x-:ABvl0mP6Qx754MFtmTDf4F0Srw0=:eyJzY29wZSI6InNlbGZibG9nIiwiZGVhZGxpbmUiOjE1MDQwNDkxOTN9'
                },
                loading:true,
                showForm:false,
                loadingBtnOpen:false,
                userId:'',
                portrait:'',
                imageUrl: '',
                rules:{
                    name:[
                        {required:true,message:'殿下没有输入标题呢~',trigger:'blur'},
                        { min: 3, message: '殿下用户名最小长度为3哦~~', trigger: 'blur' }
                    ],
                    password:[
                        {required:true,message:'殿下没有输入密码呢~',trigger:'blur'},
                        { min: 3, message: '殿下密码最小长度为3哦~~', trigger: 'blur' }
                    ],
                    email:[
                        {required:true,message:'殿下没有输入邮箱呢~',trigger:'blur'},
                    ],
                    site:[
                        {required:true,message:'殿下没有输入网址呢~',trigger:'blur'},
                    ],
                },
                user:{}
            }
        },
        methods:{
            getData(){
                let userId = this.$route.query.id
                this.userId=userId
                console.log(this.userId)
                this.$http.post('/api/userEdit',{id:this.userId}).then((res)=>{
//                    console.log(res.data.data)
                    this.user=res.data.data[0]
                    console.log(this.user)
                },(error)=>{
                    console.log(error)
                })
            },

            updateForm(formName) {
                this.$refs[formName].validate((valid) => {
                    console.log(valid)
                    if (valid) {
                        this.$http.post('/api/updateUser',
                            {
                                id:this.userId,
                                name:this.user.name,
                                password:this.user.password,
                                email:this.user.email,
                                site:this.user.site,
                                portrait:this.imageUrl
                            }
                        ).then((res)=>{
                            this.$message({
                                message: res.data.message,
                                type: 'success'
                            });
                            this.loadingBtnOpen=true
                            setTimeout(function () {
                                this.$router.push({path:'/admin/index/UserList'})
                            }.bind(this),500)
                            console.log(res.data)
                        },(error)=>{
                            this.$message.error(error);
                            console.log(error)
                        })
                    } else {
                        this.$message.error('error submit');
                    }
                });
            },

            handleAvatarSuccess(res, file) {
                this.imageUrl =' http://ovg169nib.bkt.clouddn.com/'+ res.key
                console.log(res)
                console.log(file)
            },
            handleError(res) {   //显示错误
                console.log(res)
            },
            beforeAvatarUpload(file) {
                const isLt2M = file.size / 1024 / 1024 < 2;

                if (!isLt2M) {
                    this.$message.error('上传头像图片大小不能超过 2MB!');
                }
                return isLt2M;
            }

        },
        created(){
            setTimeout(function () {
                this.loading=false
                this.showForm=true
            }.bind(this),800)
        },
        mounted(){
            this.getData()
        },
        watch: {
            '$route' (to, from) {
                this.getData()
            }
        },
        components: {
            RingLoader
        }
    }
</script>
<style>
    .userEdit{
        width: 90%;
        font-size: 16px;
    }
    .el-form-item__label{
        font-size: 20px;
        color: rgba(255,255,255,0.8);
    }
    .userEditForm .userItem{
        width: 600px;
        text-align: left;
        display: block;
    }
    .el-textarea__inner{
        font-family: 'MarkWords';
        height: 90px;
    }
    .loadingBox{
        position: absolute;
        left: 50%;
        top: 30%;
    }



    .avatar-uploader{
        text-align: left;
        margin-left: 50px;
    }
    .avatar-uploader .el-upload {
        border: 1px dashed #d9d9d9;
        border-radius: 6px;
        cursor: pointer;
        position: relative;
        overflow: hidden;
    }
    .avatar-uploader .el-upload:hover {
        border-color: #20a0ff;
    }
    .avatar-uploader-icon {
        font-size: 28px;
        color: #8c939d;
        width: 178px;
        height: 178px;
        line-height: 178px;
        text-align: center;
    }
    .avatar {
        width: 178px;
        height: 178px;
        display: block;
    }
</style>