<template>
    <div class="adminMain">
        <div class="adminSlideMenu">
            <el-menu theme="dark" default-active="1-4-1" class="el-menu-vertical-demo" :collapse="isCollapse">
                <el-submenu index="1">
                    <template slot="title">
                        <i class="fa fa-file-text-o"></i>&nbsp;&nbsp;&nbsp;
                        <span slot="title">文章管理</span>
                    </template>
                    <el-menu-item-group>
                        <el-menu-item index="1-1"><router-link to="/admin/index/articlelist">文章列表</router-link></el-menu-item>
                        <el-menu-item index="1-2"><router-link to="/admin/index/articleadd">发布文章</router-link></el-menu-item>
                    </el-menu-item-group>
                </el-submenu>
                <el-submenu index="2">
                    <template slot="title">
                        <i class="fa fa-list-ul"></i>&nbsp;&nbsp;&nbsp;
                        <span slot="title">分类管理</span>
                    </template>
                    <el-menu-item-group>
                        <el-menu-item index="1-1"><router-link to="/admin/index/CategaryList">分类列表</router-link></el-menu-item>
                        <el-menu-item index="1-2"><router-link to="/admin/index/CategaryAdd">增加分类</router-link></el-menu-item>
                    </el-menu-item-group>
                </el-submenu>
                <el-submenu index="4">
                    <template slot="title">
                        <i class="fa fa-user-o"></i>&nbsp;&nbsp;&nbsp;
                        <span slot="title">个人中心</span>
                    </template>
                    <el-menu-item-group>
                        <el-menu-item index="1-1">
                            <router-link to="/admin/index/UserList">用户列表</router-link>
                        </el-menu-item>
                        <el-menu-item index="1-2"><router-link to="/admin/index/LoginOut">退出登录</router-link></el-menu-item>
                    </el-menu-item-group>
                </el-submenu>
            </el-menu>
        </div>
        <div class="adminMainBox">
            <div class="adminMenuBtn" @click="toggleAdminMenu">
                <i class="fa fa-reorder"></i>
            </div>
            <div class="adminMainBoxShow">
                <transition>
                    <router-view></router-view>
                </transition>
            </div>
        </div>
    </div>
</template>
<script>
    export default {
        data(){
            return{
                isCollapse: false
            }
        },
        methods:{
            toggleAdminMenu(){
                this.isCollapse=! this.isCollapse
            }
        },
    }
</script>
<style scoped>
    .el-menu-vertical-demo:not(.el-menu--collapse) {
        width: 200px;
        min-height: 400px;
    }
    .adminMain{
        width: 100%;
    }
    .adminSlideMenu {
        margin-top: 10px;
        float: left;
        /*使左侧能根据右侧的高度进行自适应*/
        margin-bottom:-3000px;
        padding-bottom:3000px;
        background-color: rgb(50,65,87);
        box-shadow: 3px -3px 5px rgba(0,0,0,0.5);
    }
    .adminMainBox{
        width: 83%;
        margin-top: 10px;
        margin-left: 20px;
        float: left;
        margin-right: 2%;
        box-shadow: 3px -3px 5px rgba(0,0,0,0.5);
        background-color: rgb(50,65,87);
    }
    .adminMenuBtn{
        width: 55px;
        height: 55px;
        font-size: 25px;
        line-height: 55px;
        color: white;
        transition: all 1s;
    }
    .adminMenuBtn:hover{
        box-shadow: 0px 0px 10px rgba(0,0,0,0.5);
        color: white;
    }
    .adminMainBoxShow{
        margin: 10px;
    }
</style>