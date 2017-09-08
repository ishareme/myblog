import Vue from 'vue'
import Router from 'vue-router'
import ElementUi from 'element-ui'
import 'element-ui/lib/theme-default/index.css'
import IndexFront from '../components/front/indexFront'

// import ArticleDetail from '../components/front/ArticleDetail'
const ArticleDetail = resolve => require(['../components/front/ArticleDetail.vue'], resolve)
// import CategaryPage from '../components/front/CategaryPage'
const CategaryPage = resolve=>require(['../components/front/CategaryPage.vue'],resolve)
// import CategaryItem from '../components/front/CategaryItem'
const CategaryItem = resolve=>require(['../components/front/CategaryItem.vue'],resolve)
// import TagPage from '../components/front/TagPage'
const TagPage = resolve=>require(['../components/front/TagPage.vue'],resolve)
// import TagItem from '../components/front/TagItem'
const TagItem = resolve=>require(['../components/front/TagItem.vue'],resolve)
// import TimelinePage from '../components/front/TimelinePage'
const TimelinePage = resolve=>require(['../components/front/TimelinePage.vue'],resolve)




//用vue.js写单页面应用时，会出现打包后的JavaScript包非常大，影响页面加载，
// 我们可以利用路由的懒加载去优化这个问题，
// 当我们用到某个路由后，才去加载对应的组件，这样就会更加高效，
// import LoginAdmin from '../components/admin/LoginAdmin'
const LoginAdmin = resolve => require(['../components/admin/LoginAdmin.vue'],resolve)
// import IndexAdmin from '../components/admin/indexAdmin'
const IndexAdmin = resolve => require(['../components/admin/indexAdmin.vue'], resolve)
// import ArticleList from '../components/admin/adminMainPage/ArticleList'
const ArticleList = resolve => require(['../components/admin/adminMainPage/ArticleList.vue'], resolve)
// import ArticleAdd from '../components/admin/adminMainPage/ArticleAdd'
const ArticleAdd = resolve => require(['../components/admin/adminMainPage/ArticleAdd.vue'], resolve)
// import ArticleEdit from '../components/admin/adminMainPage/ArticleEdit'
const ArticleEdit = resolve => require(['../components/admin/adminMainPage/ArticleEdit.vue'], resolve)
// import CategaryList from '../components/admin/adminMainPage/CategaryList'
const CategaryList = resolve => require(['../components/admin/adminMainPage/CategaryList.vue'], resolve)
// import CategaryAdd from '../components/admin/adminMainPage/CategaryAdd'
const CategaryAdd = resolve => require(['../components/admin/adminMainPage/CategaryAdd.vue'], resolve)
import TagList from '../components/admin/adminMainPage/TagList'
import TagAdd from '../components/admin/adminMainPage/TagAdd'
// import LoginOut from '../components/admin/adminMainPage/LoginOut'
const LoginOut = resolve => require(['../components/admin/adminMainPage/LoginOut.vue'],resolve)
// import UserList from '../components/admin/adminMainPage/UserList'
const UserList = resolve => require(['../components/admin/adminMainPage/UserList.vue'],resolve)
// import UserEdit from '../components/admin/adminMainPage/UserEdit'
const UserEdit = resolve => require(['../components/admin/adminMainPage/UserEdit.vue'],resolve)


// import SearchResult from '../components/admin/adminMainPage/SearchResult'
const SearchResult = resolve=>require(['../components/admin/adminMainPage/SearchResult.vue'],resolve)
// import Empty from '../components/admin/adminMainPage/empty'
const Empty = resolve=>require(['../components/admin/adminMainPage/empty.vue'],resolve)

// import ShowHTML from '../components/admin/adminMainPage/ShowHTML'
const ShowHTML = resolve=>require(['../components/admin/adminMainPage/ShowHTML.vue'],resolve)

Vue.use(Router)
Vue.use(ElementUi)

export default new Router({
  mode:'history',
  routes: [
      {
          path: '/',
          component: IndexFront,
      },
      {
          path:'/articleDetail' ,
          component: ArticleDetail,
          name:'ArticleDetail'
      },
      {
          path:'/CategaryPage',
          component: CategaryPage
      },
      {
          path:'/CategaryItem',
          component:CategaryItem
      },
      {
          path:'/TagPage',
          component:TagPage
      },
      {
          path:'/TagItem',
          component:TagItem
      },
      {
          path:'/TimelinePage',
          component:TimelinePage
      },
      {
        path:'/admin',
        component: LoginAdmin
      },
      {
          path:'/admin/index' ,
          component: IndexAdmin,
          children:[
              {
                  path:'articlelist',
                  component: ArticleList
              },
              {
                  path:'articleadd',
                  component: ArticleAdd
              },
              {
                  path:'articleEdit',
                  component:ArticleEdit
              },
              {
                  path:'CategaryList',
                  component: CategaryList
              },
              {
                  path:'CategaryAdd',
                  component: CategaryAdd
              },
              {
                  path:'TagList',
                  component: TagList
              },
              {
                  path:'TagAdd',
                  component: TagAdd
              },
              {
                path:'Empty',
                component: Empty
              },
              {
                  path:'SearchResult',
                  component: SearchResult
              },
              {
                  path:'LoginOut',
                  component: LoginOut
              },
              {
                  path:'ShowHTML',
                  component: ShowHTML
              },
              {
                  path:'UserList',
                  component: UserList
              },
              {
                  path:'UserEdit',
                  component: UserEdit
              },
              {
                  path: '/',
                  redirect: 'articlelist'
              },

          ]
      }
  ]
})
