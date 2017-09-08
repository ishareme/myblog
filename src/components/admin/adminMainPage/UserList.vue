<template>
    <div class="userList">
        <ring-loader :loading="loading" class="loadingBox"></ring-loader>
        <el-table v-if="showTable"
                  :data="tableData"
                  border
                  style="width: 100%"
                  :default-sort = "{prop: 'pubdate', order: 'descending'}"
        >
            <el-table-column
                    prop="name"
                    label="用户名"
                    width="220"
            >
                <template scope="scope">
                    <el-tag close-transition>{{scope.row.name}}</el-tag>
                </template>
            </el-table-column>
            <el-table-column
                    prop="name"
                    label="密码"
                    width="220"
            >
                <template scope="scope">
                    <el-tag close-transition>{{scope.row.password}}</el-tag>
                </template>
            </el-table-column>
            <el-table-column
                    prop="email"
                    label="邮箱"
                    width="250"
            >
                <template scope="scope">
                    <el-tag close-transition>{{scope.row.email}}</el-tag>
                </template>
            </el-table-column>
            <el-table-column
                    prop="site"
                    label="网址"
                    width="250"
            >
                <template scope="scope">
                    <el-tag close-transition>{{scope.row.site}}</el-tag>
                </template>
            </el-table-column>
            <el-table-column prop="_id"
                             fixed="right"
                             label="操作"
                             width="100">
                <template scope="scope">
                    <el-button type="text" size="small" class="editBtn">
                        <router-link class="editBtnA" :to="{ path:'UserEdit', query: { id: scope.row._id} }">编辑</router-link>
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
                formLabelWidth:'120px',
            }
        },
        methods: {
            getData(){
                this.$http.get('/api/userList').then((res)=>{
                    this.tableData=res.data.data
                    console.log(this.tableData)
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
    .userList{
        width: 90%;
        margin: 0 auto;
    }
    .editBtn{
        color: red;
    }
    .editBtnA{
        color: red;
    }
    .loadingBox{
        position: absolute;
        left: 50%;
        top: 30%;
    }

</style>