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
      @refreshData="getComments">
    </comments-list>
  </div>
</template>

<script>
import CommentsList from '@/components/CommentsList'

export default {
  name: 'ArticlesComments',
  components: {
    CommentsList
  },
  data() {
    return {
      articleTitle: '',
      comments: [], 
      path: '' 
    }
  },
  methods: {
    getComments() {  //获取评论数据
      const id = this.$store.state.manageCommentsId
      this.path = `articleComments/${id}`
      this.$http.get(`articleComments/${id}`).then(res => {  
        this.articleTitle = res.data.pop()
        this.comments = res.data
      })
    }
  },
  created() {
    this.getComments()
  }
}
</script>

<style scoped>
</style>