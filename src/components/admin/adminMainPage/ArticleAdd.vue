<template>
    <div class="articleAdd">
        <ring-loader :loading="loading" class="loadingBox"></ring-loader>
        <el-form v-if="showForm" class="articleAddForm" v-bind:model="article" :rules="rules" ref="articleAddForm" label-width="150px">
            <el-form-item label="文章标题:" prop="articleTitle">
                <el-input type="text" v-model="article.articleTitle" class="articleAddTitle" placeholder="请输入标题"></el-input>
            </el-form-item>
            <el-form-item label="文章分类:" prop="articleCategarySelect">
                <el-select multiple v-model="article.articleCategarySelect" placeholder="请选择分类" class="articleAddCategary">
                    <el-option
                            v-for="item in articleCategaryOptions"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value">
                    </el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="文章摘要:" prop="articleAbstract">
                <el-input
                        type="textarea"
                        autosize
                        :rows="5"
                        :autosize="{ minRows: 5, maxRows: 100}"
                        placeholder="请输入摘要"
                        v-model="article.articleAbstract">
                </el-input>
            </el-form-item>
            <el-form-item label="文章内容:" prop="articleContent">
                <el-input
                        type="textarea"
                        autosize
                        :rows="23"
                        :autosize="{ minRows: 20, maxRows: 10000}"
                        placeholder="请输入内容"
                        v-model="article.articleContent">
                </el-input>
                <div class="showHTML">
                    <router-link :to="{ path:'ShowHTML', query: { article: article} }"><i class="fa fa-eye" aria-hidden="true"></i></router-link>
                </div>
            </el-form-item>
            <el-form-item label="文章标签:" prop="articleTag">
                <el-tooltip class="item" effect="dark" content="多个标签殿下要以英文,(逗号)分割哦~~" placement="bottom-start">
                    <el-input type="text" v-model="article.articleTag" placeholder="请输入标签"></el-input>
                </el-tooltip>
            </el-form-item>
            <el-form-item class="articleAddBtn">
                <el-button type="primary" @click="submitForm('articleAddForm')" :loading="loadingBtnOpen" size="large">发布</el-button>
                <el-button @click="resetForm('articleAddForm')">取消</el-button>
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
                articleCategaryOptions: [],
                categary:[],
                rules:{
                    articleTitle:[
                        {required:true,message:'殿下没有输入标题呢~',trigger:'blur'}
                    ],
                    articleCategarySelect:[
                        {type: 'array',required:true,message:'殿下没有选择分类呢~',trigger:'change'}
                    ],
                    articleAbstract:[
                        {required:true,message:'殿下没有输入摘要呢~',trigger:'blur'}
                    ],
                    articleContent:[
                        {required:true,message:'殿下没有输入内容呢~',trigger:'blur'}
                    ],
                    articleTag:[
                        {required:true,message:'殿下没有输入标签呢~',trigger:'blur'}
                    ]
                },
                article:{
                    articleTitle:'',
                    articleCategarySelect: [],
                    articleAbstract:'',
                    articleContent:'',
                    articleTag:'',
                },
                loadingBtnOpen:false
            }
        },
        methods:{
            submitForm(formName) {
                this.$refs[formName].validate((valid) => {
                    console.log(valid)
                    if (valid) {
                        this.$http.post('/api/submitArticle',
                            {
                                articleTitle:this.article.articleTitle,
                                articleCategary:this.article.articleCategarySelect,
                                articleAbstract:this.article.articleAbstract,
                                articleContent:this.article.articleContent,
                                articleTag:this.article.articleTag
                            }
                        ).then((res)=>{
                            this.$message({
                                message: res.data.message,
                                type: 'success'
                            });
                            this.loadingBtnOpen=true
                            setTimeout(function () {
                                this.$router.push({path:'/admin/index'})
                            }.bind(this),1000)
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
            resetForm(formName) {
                this.$refs[formName].resetFields();
            },
            getCategaryData(){
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
            getAticle(){
                if (this.$route.query.article){
                    this.article.articleTitle=this.$route.query.article.articleTitle
                    this.article.articleCategarySelect=this.$route.query.article.articleCategarySelect
                    this.article.articleAbstract=this.$route.query.article.articleAbstract
                    this.article.articleContent=this.$route.query.article.articleContent
                    this.article.articleTag=this.$route.query.article.articleTag
                }
                else {
                    return
                }
            }
        },
        created(){
          setTimeout(function () {
              this.loading=false
              this.showForm=true
          }.bind(this),300)
        },
        mounted(){
            this.getCategaryData()
            this.getAticle()
        },
        watch: {
            '$route' (to, from) {
                this.getCategaryData()
            }
        },
        components: {
            RingLoader
        }
    }
</script>
<style>
    .articleAdd{
        width: 90%;
        font-size: 16px;
    }
    .el-form-item__label{
        font-size: 20px;
        color: rgba(255,255,255,0.8);
    }
    .articleAddForm .articleAddTitle{
        width: 600px;
        text-align: left;
        display: block;
    }
    .articleAddForm .articleAddCategary{
        width: 200px;
        text-align: left;
        display: block;
    }
    .el-form-item__content{
        position: relative;
    }
    .showHTML{
        width: 30px;
        height: 30px;
        position: absolute;
        right: -40px;
        top: 0;
        color: black;
        line-height: 30px;
        font-size: 25px;
        cursor: pointer;
        color: rgba(255,255,255,0.5);
        transition: all 1s;
    }
    .showHTML:hover{
        font-size: 30px;
        color: rgb(255,255,255)
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