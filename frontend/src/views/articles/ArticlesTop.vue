<template>
  <div id="articles-top">
    <!-- 文章列表 -->
    <el-table
      row-key="_id"
      ref="multipleTable"
      :data="articles"
      tooltip-effect="dark"
      style="width: 50%; margin-right: 50px">
      <el-table-column
        type="index">
      </el-table-column>
      <el-table-column
        prop="title"
        label="标题"
        width="200">
      </el-table-column>
      <el-table-column
        prop="time"
        label="时间"
        width="110">
      </el-table-column>
      <el-table-column
        label="浏览量/喜欢/评论数"
        width="150">
        <template slot-scope="scope">
          {{scope.row.views}}/{{scope.row.like}}/{{scope.row.comments.length}}
        </template>
      </el-table-column>
      <el-table-column
        label="是否已置顶"
        width="110">
        <template slot-scope="scope">
          <span v-if="!scope.row.isTopic">否</span>
          <span v-else style="color: red">是</span>
        </template>
      </el-table-column>
      <el-table-column
        label="操作">
        <template slot-scope="scope">
          <el-button
            round
            type="warning"
            size="mini" 
            :disabled="scope.row.isTopic"
            @click="topic(scope.$index, scope.row)">置顶
          </el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- 置顶的文章 -->
    <el-card>
      <div slot="header" class="card-header">
        置顶文章（必须选四个）
      </div>
      <div class="card-item" v-for="(item, index) in topicArticles" :key="index">
        <span>{{item.articleTitle}}</span>
        <el-button
          round
          type="danger"
          @click="removeArticle(item)"
          size="mini">删除</el-button>
      </div>
      <div style="text-align: right">
        <el-button type="primary" @click="submitTopic">提交</el-button>
      </div>
    </el-card>
  </div>
</template>

<script>
export default {
  name: 'ArticlesTop',
  data() {
    return {
      articles: [],
      articlesTotal: 0,
      topicArticles: [
        {
          articleId: '65556616',
          articleTitle: '我去'
        },
        {
          articleId: '65556616',
          articleTitle: '我去'
        }
      ],
    }
  },
  methods: {
    getArticles() {  //拿到文章数据
      this.$http.get('articles').then(res => {
        this.topicArticles = res.data.pop()  //置顶文章
        this.articlesTotal = res.data.pop()
        this.articles = res.data
        this.articles.forEach(item => {  //给每个文章加个isTopic
          item.isTopic = false
          for(let i of this.topicArticles) {
            if(item._id == i.articleId) {
              item.isTopic = true
            }
          }
        })
      })
    },
    topic(index, item) {  //置顶文章
      if(this.topicArticles.length > 3) {
        this.$message.error('不能再添加了！');
      }else {
        item.isTopic = true
        this.$set(this.articles, index, this.articles[index])  //强制渲染
        this.topicArticles.push({
          articleId: item._id,
          articleTitle: item.title
        })
      }
    },
    removeArticle(item) {  //移除置顶文章
      this.topicArticles = this.topicArticles.filter(topicArticle => {  //移除
        return item.articleId !== topicArticle.articleId
      })
      this.articles.forEach((article, index) => {
        if(article._id == item.articleId) {
          article.isTopic = false
          this.$set(this.articles, index, this.articles[index])  //强制渲染
        }
        return 
      })
    },
    submitTopic() {  //提交置顶文章
      if(this.topicArticles.length !== 4) {  //确保提交文章数为4
        return this.$message.error('请确保提交文章数为4');
      }
      if(this.$store.state.user === 'visitor') {  //如果是游客则禁止操作
        return this.$message({  
          message: '游客身份禁止操作',
          type: 'error'
        });
      }  
      this.$confirm('是否确定提交置顶文章？', '提示', {  //提示框
        cancelButtonText: '取消',
        confirmButtonText: '确定',
        type: 'warning'
      })
        .then(() => {
          this.$http.post('topicArticles', this.topicArticles)
          this.$message({  
            message: '提交成功',
            type: 'success'
          });
        })
        .catch(() => {
          this.$message({
            type: 'info',
            message: '已取消提交'
          });          
        });
    }
  },
  created() {
    this.getArticles()
  }
}
</script>

<style scoped>
  #articles-top {
    display: flex;
    justify-content: space-between;
  }
  .el-table {
    flex: 2
  }
  .el-card {
    flex: 1;
  }
  .card-header {
    font-size: 14px;
    font-weight: bold;
  }
  .card-item {
    display: flex;
    justify-content: space-between;
    margin-bottom: 20px;
  }
</style>