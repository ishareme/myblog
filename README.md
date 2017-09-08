# myblog

之前用hexo自己搭了个博客，感觉用别人的东西还是有点怪怪的，所以就想自己搞一个基于Vue全家桶前后端分离的个人博客

项目特点：
* 支持 MarkDown 编辑
* 支持代码高亮
* 支持移动端浏览

实现内容包括如下：
1. 前台博客展示(主页、分类、标签云、时间轴)
2. 后台博客管理(文章、分类、个人中心)

前端布局采用flexbox+rem布局，后端布局使用 element-ui

> 主要技术栈： Express & Vue全家桶 & mongoose 

###### 安装
```
npm install

cd server

node index.js
```
