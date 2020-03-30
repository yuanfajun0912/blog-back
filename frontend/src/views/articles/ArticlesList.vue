<template>
  <div>
    <el-table :data="articles" style="width: 100%">
      <el-table-column prop="title" label="标题" width="100">
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
      <el-table-column prop="title" label="文章描述" width="180">
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
      <el-table-column prop="selectTags" label="标签" width="320">
        <template slot-scope="scope">
          <el-tag v-for="(tag, index) in scope.row.selectTags" :disable-transitions="false"
                  :key="index" :color="getTagColor(tag.i)" class="tag">{{tag.tagName}}
          </el-tag>
        </template>
      </el-table-column>
      <el-table-column prop="title" label="浏览量/喜欢/评论数" width="180">
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
        <!-- scope.row是当前行的数据信息，id是它在数据库中的id --> 
        <template slot-scope="scope"> 
          <el-button
            size="mini" 
            @click="edit(scope.row.id)">编辑</el-button> 
          <el-button
            size="mini"
            type="danger"
            @click="remove(scope.row.id)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>


<script>
import { tagColor } from '../../common/utils'

export default {
  name: 'app',
  components: {
    
  },
  data() {
    return {
      articles: [],
    }
  },
  methods: {
    getData() {  //获取文章列表数据
      this.$http.get('articlesList', {
        headers: {'Authorization': `Bearer ${this.$store.state.userToken}`}  //token加入请求头中
      }).then(res => {
        let identify = res.data.pop()  
        this.$store.commit('getUser', identify)  //将用户身份放到vuex中
        this.articles = res.data
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
      this.$http.delete(`articlesList/${id}`).then(() => {  //模板字符串，传递变量
        this.$message({  //成功弹窗
          message: '成功删除',
          type: 'success'
        });
        this.getData()  //删除后重新请求一次数据
      })  
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
    margin-right: 10px;
  }
</style>