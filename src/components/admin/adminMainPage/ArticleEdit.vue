<template>
    <div class="articleEdit">
        <ring-loader :loading="loading" class="loadingBox"></ring-loader>
        <el-form v-if="showForm" class="articleEditForm" v-bind:model="article" :rules="rules" ref="articleEditForm" label-width="150px">
            <el-form-item label="文章标题:" prop="title">
                <el-input type="text" v-model="article.title" class="articleAddTitle"></el-input>
            </el-form-item>
            <el-form-item label="文章分类:" prop="categary">
                <el-select multiple v-model="article.categary" placeholder="请选择分类" class="articleAddCategary">
                    <el-option
                            v-for="item in articleCategaryOptions"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value">
                    </el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="文章摘要:" prop="abstract">
                <el-input
                        type="textarea"
                        autosize
                        :rows="5"
                        :autosize="{ minRows: 5, maxRows: 100}"
                        placeholder="请输入摘要"
                        v-model="article.abstract">
                </el-input>
            </el-form-item>
            <el-form-item label="文章内容:" prop="content">
                <el-input
                        type="textarea"
                        autosize
                        :rows="23"
                        :autosize="{ minRows: 20, maxRows: 10000}"
                        placeholder="请输入内容"
                        v-model="article.content">
                </el-input>
            </el-form-item>
            <el-form-item label="文章标签:" prop="tag">
                <el-tooltip class="item" effect="dark" content="多个标签殿下要以英文,(逗号)分割哦~~" placement="bottom-start">
                    <el-input type="text" v-model="article.tag" placeholder="请输入标签"></el-input>
                </el-tooltip>
            </el-form-item>
            <el-form-item class="articleEditBtn">
                <el-button type="primary" @click="updateForm('articleEditForm')" :loading="loadingBtnOpen" size="large">修改发布</el-button>
                <el-button @click="openMsgBox" type="danger">删除</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>
<script>
    import RingLoader from 'vue-spinner/src/RingLoader.vue'
    export default {
        data() {
            return {
                loading:true,
                showForm:false,
                loadingBtnOpen:false,
                articleId:'',
                articleCategaryOptions: [],
                categary:[],
                rules:{
                    title:[
                        {required:true,message:'殿下没有输入标题呢~',trigger:'blur'}
                    ],
                    categary:[
                        {type: 'array',required:true,message:'殿下没有选择分类呢~',trigger:'change'}
                    ],
                    abstract:[
                        {required:true,message:'殿下没有输入摘要呢~',trigger:'blur'}
                    ],
                    content:[
                        {required:true,message:'殿下没有输入内容呢~',trigger:'blur'}
                    ],
                    tag:[
                        {required:true,message:'殿下没有输入标签呢~',trigger:'blur'}
                    ]
                },
                article:{}
            }
        },
        methods:{
            getData () {
                let id = this.$route.query.id
                this.articleId=id
                this.$http.post('/api/articleEdit',{id:this.articleId}).then((res)=>{
                    this.article=res.data.data[0]
                    this.article.categary=this.article.categary.split(',')
                },(error)=>{
                    console.log(error)
                })
                //获取分类名
                this.$http.get('/api/categaryList').then((res)=>{
//                    console.log(res.data.data)
                    this.categary=res.data.data
                    this.categary.forEach((item,index)=>{
                        this.articleCategaryOptions.push({
                            value: item.name,
                            label: item.name
                        })
                    })
                    console.log(this.articleCategaryOptions)
                },(error)=>{
                    console.log(error)
                })
            },
            updateForm(formName) {
                this.$refs[formName].validate((valid) => {
                    console.log(valid)
                    if (valid) {
                        this.$http.post('/api/updateArticle',
                            {
                                id:this.articleId,
                                title:this.article.title,
                                categary:this.article.categary,
                                abstract:this.article.abstract,
                                content:this.article.content,
                                tag:this.article.tag
                            }
                        ).then((res)=>{
                            this.$message({
                                message: res.data.message,
                                type: 'success'
                            });
                            this.loadingBtnOpen=true
                            setTimeout(function () {
                                this.$router.push({path:'/admin/index'})
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
            openMsgBox(){
                this.$confirm('此操作将永久删除该文章, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    this.$http.post('/api/deleteArticle',{id:this.articleId}).then((res)=>{
                        console.log(res.data)
                        this.$message({
                            type: 'success',
                            message: res.data.message
                        });
                        setTimeout(function () {
                            this.$router.push({path:'/admin/index'})
                        }.bind(this),1000)
                    },(error)=>{
                        console.log(error)
                    })
                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消删除'
                    });
                });
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
    .articleEdit{
        width: 90%;
        font-size: 16px;
    }
    .el-form-item__label{
        font-size: 20px;
        color: rgba(255,255,255,0.8);
    }
    .articleEditForm .articleAddTitle{
        width: 600px;
        text-align: left;
        display: block;
    }
    .articleEditForm .articleAddCategary{
        width: 200px;
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
</style>