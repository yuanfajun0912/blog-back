<template>
  <div>
    <!-- 
      article-title: 文章标题/留言板
      comments: 评论数据
      path: put请求的路径
      @refreshData: 重新获取数据的事件
    -->
    <comments-list 
      :article-title="articleTitle"
      :comments="comments"
      :path="path"
      @refreshData="getLeaveMessages">
    </comments-list>
  </div>
</template>

<script>
import CommentsList from '@/components/CommentsList'

export default {
  name: 'LeaveMessages',
  components: {
    CommentsList
  },
  data() {
    return {
      articleTitle: '留言板',
      comments: [],  
      path: ''
    }
  },
  methods: {
    getLeaveMessages() {  //获取留言数据
      this.$http.get('leaveMessages').then(res => {  
        this.comments = res.data
      })
      this.path = 'leaveMessages'
    }
  },
  created() {
    this.getLeaveMessages()
  }
}
</script>

<style scoped>
</style>