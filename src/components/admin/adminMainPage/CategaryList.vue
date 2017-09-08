<template>
    <div class="categaryList">
        <ring-loader :loading="loading" class="loadingBox"></ring-loader>
        <el-table v-if="showTable"
                  :data="tableData"
                  border
                  style="width: 100%"
                  :default-sort = "{prop: 'pubdate', order: 'descending'}"
        >
            <el-table-column
                    prop="pubDate"
                    label="添加日期"
                    sortable
                    fixed
                    width="200">
            </el-table-column>
            <el-table-column
                    prop="name"
                    label="分类名"
                    width="400"
            >
                <template scope="scope">
                    <el-tag close-transition>{{scope.row.name}}</el-tag>
                </template>
            </el-table-column>
            <el-table-column
                    prop="count"
                    label="文章数"
                    width="200"
            >
            </el-table-column>
            <el-table-column
                    prop="_id"
                    fixed="right"
                    label="操作"
                    width="200">
                <template scope="scope">
                    <el-button type="text" size="small" class="editBtn" @click="openCategoryEdit(scope.row._id)">
                        编辑
                    </el-button>
                    <el-button type="text" size="small" class="viewBtn" @click="openMsgBox(scope.row._id)" >
                        删除
                    </el-button>
                </template>
            </el-table-column>
        </el-table>

        <el-dialog title="修改分类" :visible.sync="dialogFormVisible">
            <el-form :model="categary" :rules="rules">
                <el-form-item label="分类名称" :label-width="formLabelWidth">
                    <el-input v-model="categary.name"></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="closeDialogForm">取 消</el-button>
                <el-button type="primary" @click="updateCategary" :loading="loadingBtnOpen">修 改</el-button>
            </div>
        </el-dialog>
    </div>
</template>
<script>
    import RingLoader from 'vue-spinner/src/RingLoader.vue'
    export default {
        data() {
            return {
                loading:true,
                showTable:false,
                tableData: [],
                dialogFormVisible:false,
                categary:{},
                rules:{
                    name:[
                        {required:true,message:'殿下没有输入分类呢~',trigger:'blur'}
                    ]
                },
                formLabelWidth:'120px',
                loadingBtnOpen:false
            }
        },
        methods: {
            getData(){
                this.$http.get('/api/categaryList').then((res)=>{
                    this.tableData=res.data.data
                    console.log(this.tableData)
                },(error)=>{
                    console.log(error)
                })
            },
            openCategoryEdit(id){
                console.log(id)
                this.$http.post('/api/categaryEdit',{id:id}).then((res)=>{
                    this.categary=res.data.data[0]
                    console.log(this.categary)
                },(error)=>{
                    console.log(error)
                })
                this.dialogFormVisible=true
            },
            closeDialogForm(){
                this.dialogFormVisible=false
                this.$message({
                    type: 'info',
                    message: '已取消修改'
                });
            },
            updateCategary(){
                console.log(this.categary)
                this.$http.post('/api/updateCategary',{categary:this.categary}).then((res)=>{
                    this.$message({
                        type:'success',
                        message:res.data.message
                    })
                    this.loadingBtnOpen=true
                    setTimeout(function () {
                        this.dialogFormVisible=false
                        //刷新本路由页面
                        this.$router.replace({path:'/admin/index/empty'})
//                        this.$router.go(0)
                        this.loadingBtnOpen=false
                    }.bind(this),500)
//                    console.log(res.data)
                },(error)=>{
                    console.log(error)
                })
            },
            openMsgBox(id){
                this.$confirm('此操作将永久删除该分类, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    console.log(this.categary)
                    this.$http.post('/api/deleteCategary',{id:id}).then((res)=>{
                        console.log(res.data)
                        this.$message({
                            type: 'success',
                            message: res.data.message
                        });
                        setTimeout(function () {
                            this.$router.replace({path:'/admin/index/empty'})
//                            this.$router.go(0)
                        }.bind(this),500)
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
                this.showTable=true
            }.bind(this),300)
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
<style scoped>
    .categaryList{
        width: 90%;
        margin: 0 auto;
    }
    .viewBtn,.editBtn{
        color: red;
    }
    .loadingBox{
        position: absolute;
        left: 50%;
        top: 30%;
    }
</style>