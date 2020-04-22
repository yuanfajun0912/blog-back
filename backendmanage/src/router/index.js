import Vue from 'vue'
import VueRouter from 'vue-router'

//懒加载
const Login = () => import('@/views/Login.vue')
const BlogBack = () => import('@/views/BlogBack.vue')
const ArticlesList = () => import('@/views/articles/ArticlesList.vue')
const ArticlesCreate = () => import('@/views/articles/ArticlesCreate.vue')
const ArticlesComments = () => import('@/views/articles/ArticlesComments.vue')
const ArticlesTop = () => import('@/views/articles/ArticlesTop.vue')
const ArticlesEdit = () => import('@/views/articles/ArticlesEdit.vue')
const TagsManage = () => import('@/views/tags/TagsManage.vue')
const LeaveMessages = () => import('@/views/global/LeaveMessages.vue')
const Timeline = () => import('@/views/global/Timeline.vue')
const AboutManage = () => import('@/views/global/AboutManage.vue')
const LinksManage = () => import('@/views/global/LinksManage.vue')

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect: '/login',
    meta: { title: '登录 | YFJ的博客后台' },
  },
  {
    path: '/login',
    // name: 'Login',
    component: Login,
    meta: { title: '登录 | YFJ的博客后台' },
  },
  {
    path: '/articles',
    // name: 'BlogBack',
    component: BlogBack,
    redirect: '/articles/list',
    children: [
      {
        path: 'list',
        // name: 'ArticlesList',
        component: ArticlesList,
        meta: { title: '文章列表 | YFJ的博客后台' }
      },
      {
        path: 'create',
        // name: 'ArticlesCreate',
        component: ArticlesCreate,
        meta: { title: '新建文章 | YFJ的博客后台'}
      },
      {
        path: 'comments/:id',
        // name: 'ArticlesComments',
        component: ArticlesComments,
        meta: { title: '评论管理 | YFJ的博客后台'}
      },
      {
        path: 'edit/:id',
        // name: 'ArticlesEdit',
        component: ArticlesEdit,
        meta: { title: '编辑文章 | YFJ的博客后台'}
      },
      {
        path: 'topManage',
        // name: 'ArticlesTop',
        component: ArticlesTop,
        meta: { title: '置顶文章管理 | YFJ的博客后台'}
      }
    ]
  },
  {
    path: '/tags',
    // name: 'BlogBack',
    component: BlogBack,
    redirect: '/tags/manage',
    meta: { title: '标签管理 | YFJ的博客后台' },
    children: [
      {
        path: 'manage',
        // name: 'TagsManage',
        component: TagsManage,
        meta: { title: '标签管理 | YFJ的博客后台' },
      }
    ]
  },
  {
    path: '/globalManage',
    // name: 'Blog',
    component: BlogBack,
    children: [
      {
        path: 'about',
        component: AboutManage,
        meta: { title: '关于页面管理 | YFJ的博客后台' },
      }, 
      {
        path: 'leaveMessages',
        component: LeaveMessages,
        meta: { title: '留言管理 | YFJ的博客后台' },
      }, 
      {
        path: 'timeline',
        component: Timeline,
        meta: { title: '时间线管理 | YFJ的博客后台' }
      },
      {
        path: 'linksmanage',
        component: LinksManage,
        meta: { title: '友链管理 | YFJ的博客后台' }
      }
    ]
  },
]

const router = new VueRouter({
  mode: 'hash',
  base: process.env.BASE_URL,
  routes
})
// 全局导航守卫，使得title随着路由跳转而改变
const defaultTitle = 'YFJ的博客后台'
router.beforeEach((to, from, next) => {
  document.title = to.meta.title || defaultTitle
  next()
})
export default router
