<template>
  <el-container style="height: 100vh;">
    <!-- 
      ** 侧边栏aside
      ** el-menu 总的目录标签
      ** :default-openeds 默认开启的子类
      ** el-submenu 子标签
      ** el-menu-item 孙子标签
      ** active-text-color 活跃标签的字体颜色
     -->
    <el-aside width="200px">
      <div class="aside-title">YFJ</div>
      <el-menu :default-openeds="['article','tag','category','globalManage']" 
               router
               background-color="#464545"
               text-color="rgb(221, 220, 220)"
               >  
        <el-submenu index="article">
          <template slot="title"><i class="el-icon-notebook-2"></i>文章管理</template>
          <el-menu-item index="/articles/list">文章列表</el-menu-item>
          <el-menu-item index="/articles/create">新建文章</el-menu-item>
        </el-submenu>
        <el-submenu index="tag">
          <template slot="title"><i class="el-icon-menu"></i>标签管理</template>
          <el-menu-item index="/tags/manage">标签管理</el-menu-item>
        </el-submenu>
        <el-submenu index="globalManage">
          <template slot="title"><i class="el-icon-setting"></i>全局管理</template>
          <el-menu-item index="/globalManage/theme">主题设置</el-menu-item>
          <el-menu-item index="/globalManage/leaveMessages">留言管理</el-menu-item>
          <el-menu-item index="/globalManage/timeline">时间线管理</el-menu-item>
        </el-submenu>
      </el-menu>
    </el-aside>
    <el-container>

      <el-header style="background-color: rgb(134, 156, 126); padding-right: 5px">
        <!-- 头像按钮 -->
        <el-button @click="drawer = true" type="text" style="margin-left: 16px; margin-top: -4px; font-size: 20px">
          <span style="color: white; position: relative; bottom: 10px; right: 8px">{{this.$store.state.user}}</span>
          <el-avatar :src="avatarImgUrl" alt="用户"></el-avatar><i class="el-icon-caret-right"></i>  <!-- 头像的图片一定要从网上找 -->
        </el-button>
        <!-- 抽屉界面 -->
        <el-drawer  
          :visible.sync="drawer"
          direction="rtl"  
          size="20%"
          style="font-size: 22px">  
          <el-avatar :src="avatarImgUrl" alt="用户" :size="100"></el-avatar>  <!-- 头像的图片一定要从网上找 -->
          <div class="divider"></div>  <!-- 分割线 -->
          <div class="item-container">
            <i class="el-icon-user-solid"></i>
            <span style="display: inline-block; margin-left: 20px">
              {{userName}}
            </span>  <!-- 通过token判断是YFJ还是游客 -->
          </div>
          <div class="item-container" @click="changeUser">
            <i class="el-icon-s-tools"></i>
            <span style="display: inline-block; margin-left: 20px">切换账号</span>  
          </div>
          <div class="item-container" @click="showTextarea">
            <i class="el-icon-picture"></i>
            <span style="display: inline-block; margin-left: 20px">切换头像</span>
          </div>
          <div v-if="isShow" style="font-size: 13px; text-align: center;">
            <span>请覆盖下面的图片的url</span><br>
            <span>（目前只支持在线图片，不支持本地图片）</span><br>
            <span>（一旦输入即会覆盖原有图片，若要撤回操作请按 CTRL + Z）</span>
            <el-input
              type="textarea"
              :rows="2"
              placeholder="请输入图片的url"
              v-model="avatarImgUrl"
              style="width: 250px"
              autosize>
            </el-input>
          </div>
        </el-drawer>
      </el-header>
      
      <el-main>
        <!-- 主体部分路由,include中的组件名一定不要加空格 -->
        <keep-alive include="ArticlesList,ArticlesCreate">
          <router-view></router-view> 
        </keep-alive> 
      </el-main>
    </el-container>
  </el-container>
</template>


<script>
export default {
  name: 'BlogBack',
  components: {
    
  },
  data() {
    return {
      drawer: false,  //控制抽屉的打开与否
      avatarImgUrl: 'https://avatars0.githubusercontent.com/u/51826622?s=460&u=b5f11df8b624eb0178cc8780d5a90f2142f7e642&v=4',  //头像图片的url
      isShow: false  //控制头像图片输入框显示与否
    }
  },
  computed: {
    userName() {
      if(this.$store.state.user === 'visitor') return 'visitor'
      return 'YFJ'
    }
  },
  methods: {
    showTextarea() {  //控制头像图片url的显示
      if(this.$store.state.user === 'visitor') {  //如果是游客则禁止操作
        return this.$message({  
          message: '游客身份禁止操作',
          type: 'error'
        });
      }
      this.isShow = !this.isShow
    },
    isHaveToken() {  //没有token则返回login页面
      let token = localStorage.getItem('token')
      if(!token) this.$router.push('/login')  //若没有token则返回login页面
    },
    changeUser() {  //切换用户
      this.$router.push('/login')
    }
  },
  created() {
    // localStorage.removeItem('token')
    this.isHaveToken()
    this.$store.commit('getToken', localStorage.getItem('token'))
    this.$http.get('articlesList', {  //所有路由都用到了这个组件，所以可保证vuex的user属性一直保持活性
      headers: {'Authorization': `Bearer ${this.$store.state.userToken}`}
    }).then(res => {
      let identify = res.data.pop()  
      this.$store.commit('getUser', identify)  //将用户身份放到vuex中
    })
  }
}
</script>

<style>
  * {
    margin: 0;
    padding: 0;
  }
  .aside-title {
    color: white;
    font-size: 25px;
    height: 59px;
    padding-left: 60px;
    line-height: 49px;
    border-bottom: 1px solid white;
  }
  .el-aside {
    color: #333;
    background-color: rgb(70, 69, 69);
    padding: 0;
  }
  .el-header {
    text-align: right; 
    font-size: 12px; 
    height: 60px;
  }
  .el-icon-caret-right { /* 头像旁边的小按钮 */
    position: relative;
    bottom: 10px;
  }
  .el-drawer {
    text-align: center;
  }
  .divider {
    width: 60%;
    height: 1px;
    margin: 40px auto 40px auto;
    background-color: rgb(184, 210, 245);
  }
  .item-container {
    text-align: left; 
    margin-bottom: 20px; 
    padding-left: 80px;
    cursor: pointer;
  }
  .item-container:hover {
    color: rgb(252, 117, 39);
  }
  /* 自己太sb了，不要自己加类，el-menu元素地类就是el-munu */
  .el-menu {  
    border-right-width: 0;
  }
  .el-header {
    background-color: white;
    color: #333;
  }
  .el-main {
    background-color: #d5dad3;
  }
</style>
