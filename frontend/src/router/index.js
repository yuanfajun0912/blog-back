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

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect: '/login',
    meta: { title: '登录 | YFJ的博客后台' },
  },
  {
    path: '/login',
    component: Login,
    meta: { title: '登录 | YFJ的博客后台' },
  },
  {
    path: '/articles',
    component: BlogBack,
    redirect: '/articles/list',
    children: [
      {
        path: 'list',
        component: ArticlesList,
        meta: { title: '文章列表 | YFJ的博客后台' }
      },
      {
        path: 'create',
        component: ArticlesCreate,
        meta: { title: '新建文章 | YFJ的博客后台'}
      },
      {
        path: 'comments/:id',
        component: ArticlesComments,
        meta: { title: '评论管理 | YFJ的博客后台'}
      },
      {
        path: 'edit/:id',
        component: ArticlesEdit,
        meta: { title: '编辑文章 | YFJ的博客后台'}
      },
      {
        path: 'topManage',
        component: ArticlesTop,
        meta: { title: '置顶文章管理 | YFJ的博客后台'}
      }
    ]
  },
  {
    path: '/tags',
    component: BlogBack,
    redirect: '/tags/manage',
    meta: { title: '标签管理 | YFJ的博客后台' },
    children: [
      {
        path: 'manage',
        component: TagsManage,
        meta: { title: '标签管理 | YFJ的博客后台' },
      }
    ]
  },
  {
    path: '/globalManage',
    component: BlogBack,
    redirect: '/globalManage/theme',
    meta: { title: '主题设置 | YFJ的博客后台' },
    children: [
      {
        path: 'leaveMessages',
        component: LeaveMessages,
        meta: { title: '留言管理 | YFJ的博客后台' },
      }, 
      {
        path: 'timeline',
        component: Timeline,
        meta: { title: '时间线管理 | YFJ的博客后台' }
      }
    ]
  },
]

const router = new VueRouter({
  mode: 'history',
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
