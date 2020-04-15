<template>
  <div>
    <el-table :data="articles" style="width: 100%">
      <el-table-column prop="title" label="标题" width="120">
        <template slot-scope="scope">
          <!-- 气泡弹窗，hover上去可看完整的title -->
          <el-tooltip :content="scope.row.title" placement="bottom" effect="light">
            <!-- 只在一行，超出部分省略 -->
            <p style="overflow: hidden; text-overflow: ellipsis; white-space: nowrap;">
              {{ scope.row.title }}
            </p>
          </el-tooltip>
        </template>
      </el-table-column>
      <el-table-column prop="time" label="上一次更新时间" width="200">
        <template slot-scope="scope">
          <i class="el-icon-time" style="color: black"></i>
          <span style="margin-left: 5px">{{ scope.row.time }}</span>
        </template>
      </el-table-column>
      <el-table-column prop="title" label="文章描述" width="160">
        <template slot-scope="scope">
          <!-- 气泡弹窗，hover上去可看完整的title -->
          <el-tooltip :content="scope.row.discription" placement="bottom" effect="light">
            <!-- 只在一行，超出部分省略 -->
            <p style="overflow: hidden; text-overflow: ellipsis; white-space: nowrap;">
              {{ scope.row.discription }}
            </p>
          </el-tooltip>
        </template>
      </el-table-column>
      <el-table-column prop="selectTags" label="标签" width="310">
        <template slot-scope="scope">
          <el-tag v-for="(tag, index) in scope.row.selectTags" :disable-transitions="true"
                  :key="index" :color="getTagColor(tag.i)" class="tag">{{tag.tagName}}
          </el-tag>
        </template>
      </el-table-column>
      <el-table-column prop="detail" label="浏览量/喜欢/评论数" width="180">
        <template slot-scope="scope">
          <i class="iconfont icon-views-sunny"></i>
          <span class="detail">{{scope.row.views}}</span>
          <i class="iconfont icon-like-sunny"></i>
          <span class="detail">{{scope.row.like}}</span>
          <i class="iconfont icon-comments-sunny"></i>
          <span class="detail">{{scope.row.comments.length}}</span>
        </template>
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope"> 
          <div class="control">
            <el-button
              size="mini" 
              @click="edit(scope.row._id)">编辑</el-button>
            <el-button
              size="mini" 
              type="warning"
              @click="manageComments(scope.row._id)">管理评论</el-button>  
            <el-button
              size="mini"
              type="danger"
              @click="remove(scope.row._id)">删除</el-button>
          </div>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      background
      :hide-on-single-page="true"
      layout="total, prev, pager, next"
      :current-page="currentPage"
      :total="total"
      @current-change = "changePage"
      @prev-text="changePage"
      @next-text="changePage">
    </el-pagination>
  </div>
</template>


<script>
import { tagColor } from '../../common/utils'

export default {
  name: 'ArticlesList',
  components: {
    
  },
  data() {
    return {
      articles: [],
      total: 0, //数据库中存的文章数  
      currentPage: 1
    }
  },
  watch: {

  },
  methods: {
    getData() {  //获取文章列表数据
      this.$http.get('articlesList', {
        headers: {'Authorization': `Bearer ${this.$store.state.userToken}`},  //token加入请求头中
        params: {
          page: 1
        }
      }).then(res => {
        const identify = res.data.pop()  
        const totalLength = res.data.pop()  //拿到博客总数
        this.$store.commit('getUser', identify)  //将用户身份放到vuex中
        this.total = totalLength  
        this.articles = res.data
      })
    },
    changePage(currentPage) {  //改变page重新请求数据
      this.$http.get('articlesList', {
        headers: {'Authorization': `Bearer ${this.$store.state.userToken}`},  //token加入请求头中
        params: {
          page: currentPage
        }
      }).then(res => {
        const length = res.data.length
        let currentArticles = res.data.slice(0, length-2)
        this.articles = currentArticles
      })
    },
    getTagColor(index) {  //确定标签颜色，不知道为什么放在utils里面没用，只有用一次写一次了
      return tagColor(index)
    },
    remove(id) { //删除文章
      if(this.$store.state.user === 'visitor') {  //如果是游客则禁止操作
        return this.$message({  
          message: '游客身份禁止操作',
          type: 'error'
        });
      }  
      this.$confirm('是否确定删除该篇文章？', '提示', {  //提示框
        cancelButtonText: '取消',
        confirmButtonText: '确定',
        type: 'warning'
      })
        .then(() => {
          this.$http.delete(`articlesList/${id}`).then(() => {  //模板字符串，传递变量
            this.$message({  //成功弹窗
              message: '成功删除',
              type: 'success'
            });
            this.getData()  //删除后重新请求一次数据
          }) 
        })
        .catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });          
        });
    },
    manageComments(id) {  //管理评论
      if(this.$store.state.user === 'visitor') {  //如果是游客则禁止操作
        return this.$message({  
          message: '游客身份禁止操作',
          type: 'error'
        });
      }
      this.$router.push(`/articles/comments/${id}`)  //跳到管理评论页面
      this.$store.commit('changeMCId', id)
    },
    edit(id) {  //编辑这个文章
      if(this.$store.state.user === 'visitor') {  //如果是游客则禁止操作
        return this.$message({  
          message: '游客身份禁止操作',
          type: 'error'
        });
      }
      this.$router.push(`/articles/edit/${id}`)  //跳到编辑页面
      this.$store.commit('changeEAId', id)
    }
  },
  created() {
    this.getData()
  }
}
</script>


<style scoped>
  .tag {
    color: white;
    border: 0;
    margin: 0 10px 5px 0;
  }
  i.el-icon-time {
    font-size: 15px;
    position: unset;
  }
  i {
    font-size: 21px;
    position: relative;
    top: 2px;
  }
  i:nth-of-type(1) {
    color: rgb(46, 89, 209);
  }
  i:nth-of-type(2) {
    color: red;
  }
  i:nth-of-type(3) {
    color: rgb(231, 77, 49);
  }
  span.detail {
    display: inline-block;
    margin-right: 5px;
  }
  .el-pagination {
    margin-top: 10px;
    text-align: center;
  }
  .control {
    display: flex;
    flex-direction: column;
  }
  .control .el-button {
    margin-left: 0;
    margin-bottom: 10px;
  }
  .el-button:last-child {
    margin-bottom: 0;
  }
</style>