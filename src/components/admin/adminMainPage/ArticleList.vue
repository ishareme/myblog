<template>
    <div class="articleList">
        <ring-loader :loading="loading" class="loadingBox"></ring-loader>
        <el-table v-if="showTable"
                :data="tableData"
                border
                style="width: 100%"
                :default-sort = "{prop: 'pubdate', order: 'descending'}"
        >
            <el-table-column
                    prop="pubDate"

                    label="发布日期"
                    sortable
                    fixed
                    width="120">
            </el-table-column>
            <el-table-column
                    prop="update"
                    label="更新日期"
                    sortable
                    width="120">
            </el-table-column>
            <el-table-column
                    prop="title"
                    label="文章标题"
                    sortable
                    width="200">
            </el-table-column>
            <el-table-column
                    prop="categary"
                    label="文章分类"
                    width="150"
                    :filters="filterCategaryDataFinalArr"
                    :filter-method="filterCategary"
                    filter-placement="bottom-end"
            >
                <template scope="scope">
                    <el-tag close-transition>{{scope.row.categary}}</el-tag>
                </template>
            </el-table-column>
            <el-table-column
                    prop="abstract"
                    label="摘要"
                    width="500"
                    :formatter="formatter">
            </el-table-column>
            <el-table-column
                    prop="tag"
                    label="标签"
                    width="150"
                    :filters="filterTagDataFinalArr"
                    :filter-method="filterTag"
                    filter-placement="bottom-end"
            >
                <template scope="scope">
                    <el-tag close-transition>{{scope.row.tag}}</el-tag>
                </template>
            </el-table-column>
            <el-table-column prop="_id"
                    fixed="right"
                    label="操作"
                    width="100">
                <template scope="scope">
                    <el-button type="text" size="small" class="viewBtn">
                        <router-link class="viewBtnA" :to="{ path:'/articleDetail', query: { id: scope.row._id} }">查看</router-link>
                    </el-button>
                    <el-button type="text" size="small" class="editBtn">
                        <router-link class="editBtnA" :to="{ path:'articleEdit', query: { id: scope.row._id} }">编辑</router-link>
                    </el-button>
                </template>
            </el-table-column>
        </el-table>
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
                filterTagData:[],
                filterTagDataFinal:[],
                filterTagDataFinalArr:[],
                filterCategaryDataFinal:[],
                filterCategaryDataFinalArr:[]
            }
        },
        methods: {
            formatter(row, column) {
                return row.abstract;
            },
            filterTag(value, row) {
                return row.tag.indexOf(value) > -1;
            },
            filterCategary(value,row){
                return row.categary.indexOf(value) > -1;
            },
            getData(){
                this.$http.get('/api/articleList').then((res)=>{
                    this.tableData=res.data.data
//                    console.log(this.tableData)

                    this.tableData.forEach((item,index)=>{
                        this.filterTagData.push(item.tag)
                    })
                    this.filterTagData.forEach((item,index)=>{
                        var  itemArr=item.split(',')
                        this.filterTagDataFinal=this.filterTagDataFinal.concat(itemArr)
                    })
                    //利用es6 set集合的元素必须是唯一的特性  进行去重
                    this.filterTagDataFinal = new Set(this.filterTagDataFinal);
                    console.log(this.filterTagDataFinal)
                    this.filterTagDataFinal.forEach((item,index)=>{
                        this.filterTagDataFinalArr.push({ text: item , value: item })
                    })
                    console.log(this.filterTagDataFinalArr)
//                    console.log(this.filterTagDataFinal)
                },(error)=>{
                    console.log(error)
                })
                this.$http.get('/api/categaryList').then((res)=>{
//                    console.log(res.data.data)
                    this.filterCategaryDataFinal=res.data.data
                    this.filterCategaryDataFinal.forEach((item,index)=>{
                        this.filterCategaryDataFinalArr.push({text:item.name,value:item.name})
                    })
                    console.log(this.filterCategaryDataFinalArr)
                },(error)=>{
                    console.log(error)
                })
            },
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
    .articleList{
        width: 90%;
        margin: 0 auto;
    }
    .viewBtn,.editBtn{
        color: red;
    }
    .viewBtnA,.editBtnA{
        color: red;
    }
    .loadingBox{
        position: absolute;
        left: 50%;
        top: 30%;
    }
</style>