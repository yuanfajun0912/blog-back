<template>
  <div>
    <!-- 文章标题 -->
    <span class="article-title">{{articleTitle}}</span>
    <!-- 评论列表 -->
    <el-table :data="comments">
      <el-table-column prop="time" label="评论时间" width="180">
        <template slot-scope="scope">
          <i class="el-icon-time" style="color: black"></i>
          <span style="margin-left: 5px">{{ scope.row.time }}</span>
        </template>
      </el-table-column>
      <el-table-column prop="nickName" label="昵称" width="150">
        <template slot-scope="scope">
          <el-tooltip :content="scope.row.nickName" placement="bottom" effect="light">
            <!-- 只在一行，超出部分省略 -->
            <p style="overflow: hidden; text-overflow: ellipsis; white-space: nowrap;">
              {{ scope.row.nickName }}
            </p>
          </el-tooltip>
        </template>
      </el-table-column>
      <el-table-column prop="body" label="评论内容" width="300">
      </el-table-column>
      <el-table-column prop="reply" label="博主回复" width="300">
        <template slot-scope="scope">
          <p v-if="!showInput">{{ scope.row.reply }}</p>
          <el-input
            v-else
            type="textarea"
            autosize
            placeholder="请输入内容"
            v-model="scope.row.reply"
            @keyup.enter.native="cancelInput"
            @blur="cancelInput">
          </el-input>
        </template>
      </el-table-column>
      <el-table-column label="操作">
        <!-- scope.row是当前行的数据信息，id是它在数据库中的id --> 
        <template slot-scope="scope"> 
            <el-button
              size="mini" 
              @click="reply">回复/编辑</el-button>
            <el-button
              size="mini"
              type="danger"
              @click="remove(scope.row.commentId)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- 操作按钮 -->
    <div class="btn-container">
      <span style="font-size: 14px; position: relative; top: 10px; right: 5px">(请一定记得保存操作)</span>
      <el-button type="primary" @click="updateComments">保存操作</el-button>
      <el-button @click="cancel">取消</el-button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'CommentsList',
  props: {
    path: {
      type: String
    },
    articleTitle: {
      type: String
    },
    comments: {
      type: Array
    }
  },
  data() {
    return { 
      showInput: false,  //是否显示输入框
    }
  },
  methods: {
    reply() {  //出现输入框
      this.showInput = true
    },
    cancelInput() {  //隐藏输入框
      this.showInput = false
    },
    remove(id) {  //删除某条评论
      const arr = this.comments.filter(item => item.commentId !== id)
      this.comments = arr
    },
    updateComments() {  //保存操作
      if(this.$store.state.user === 'visitor') {  //如果是游客则禁止操作
        return this.$message({  
          message: '游客身份禁止操作',
          type: 'error'
        });
      }
      this.$confirm('是否确定保存以上操作？', '提示', {  //提示框
        cancelButtonText: '取消',
        confirmButtonText: '确定',
        type: 'warning'
      })
        .then(() => {
          this.$http.put(this.path, this.comments).then(() => {
          this.$message({ 
            message: '保存操作成功',
            type: 'success'
          });
          this.$emit('refreshData')  //刷新数据，重新请求一次
        })
        })
        .catch(() => {
          this.$message({
            type: 'info',
            message: '已取消'
          });          
        });
    },
    cancel() { //点击取消按钮
      this.$confirm('您已修改的内容将不会保存，并且返回文章列表页面', '提示', {  //提示框
        cancelButtonText: '取消',
        confirmButtonText: '确定',
        type: 'warning'
      })
        .then(() => {
          this.$message('取消修改');
          this.$router.push('/articles/list') //跳回文章列表页面
        })
        .catch(() => {})  //虽然不做处理，但还是要写catch，否则会报错
    } 
  },
}
</script>

<style scoped>
  .article-title {
    display: inline-block;
    padding-left: 5px;
    margin-bottom: 10px; 
    color: black; 
    border-left: 5px solid rgb(255, 117, 4)
  }
  .btn-container {
    text-align: right;
    margin-top: 10px;
  }
</style>