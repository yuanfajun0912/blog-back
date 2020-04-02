<template>
  <div>
    <!-- 
      ** @submit.native.prevent="createArticle"
           表单提交后执行createArticle
      ** el-radio-group v-model="currentCg"
           被选中的单选按钮的值  
    -->
    <el-form ref="article" 
           :model="article"
           label-width="80px"
           @submit.native.prevent="createArticle">
      <el-form-item label="标题">
        <el-input v-model="article.title" placeholder="请填写标题" clearable></el-input>
      </el-form-item>
      <el-form-item label="描述">
        <el-input v-model="article.discription" placeholder="请输入文章描述" type="textarea" :autosize="{ minRows: 3, maxRows: 6 }"></el-input>
      </el-form-item>
      <el-form-item label="顶部图">
        <el-input v-model="article.topicImage" placeholder="请填写顶部图的外部链接" clearable></el-input>
        <el-image :src="article.topicImage" :preview-src-list="previewImage" fit="cover" :lazy="true">
        </el-image>
        <span> (点击图片可预览)</span>
      </el-form-item>
      <el-form-item label="标签" class="tagsContainer">
        <el-tag class="tag" v-for="(tag, index) in article.selectTags" :key="index" closable
                @close="removeTag(index)" :color="getTagColor(tag.i)" :disable-transitions="true">{{tag.tagName}}
        </el-tag>
      </el-form-item>
      <el-form-item label="" class="tagsContainer">
        <el-tag effect="dark" class="tagControl tC-1" @click="selectAllTags()">全选标签</el-tag>
        <el-tag effect="dark" class="tagControl tC-2" @click="removeAllTags()">取消已选</el-tag>
        <el-tag effect="dark" class="tagControl tC-3" @click="reverseTags()">标签倒序</el-tag>
        <br>
        <el-tag v-for="(tag, index) in tags" :key="index" 
                class="tag" :color="getTagColor(index)" @click="selectTag(tag, index)">{{tag}}</el-tag>
      </el-form-item>
      <el-form-item class="formButton">
        <span>（提交之前请先点击下方的保存按钮）</span>
        <el-button type="primary" native-type="submit" class="submitBtn">立即创建</el-button>
        <el-button @click="cancelCreate">取消</el-button>
      </el-form-item>
    </el-form>
    <!-- markdown文本编辑器 -->
    <mavon-editor 
      v-model="article.value"
      fontSize="18px"
      @save="getHtml"
    ></mavon-editor>
  </div>
</template>

<script>
import { formatDate, tagColor } from '../../common/utils'
export default {
  name: 'ArticlesCreate',
  data() {
    return { 
      article: {  //文章信息
        title: '',  //标题
        body: '',
        selectTags: [],  //选中的标签，后台就只需要每一项的userName和每一项对应的索引值，每一项的i用作统一颜色
        time: '',
        value: '', //markdown编辑器解析成html前的内容
        discription: '',  //文章描述
        topicImage: '',  //文章顶部图片
        views: 100,
        like: 100,
        comments: [],
      },
      tags: [],  //从后端获取的标签
    }
  },
  computed: {
    previewImage() {
      let list = []
      list.push(this.article.topicImage)
      return list
    }
  },
  methods: {
    getTags() {  //拿到标签
      this.$http.get('/tagsList').then(res => {
        this.tags = res.data.map(item => item.tagName)
      })
    },
    createArticle() {  //新建一篇文章
      if(this.$store.state.user === 'visitor') {  //如果是游客则禁止操作
        return this.$message({  
          message: '游客身份禁止操作',
          type: 'error'
        });
      }
      let myDate = new Date()
      this.article.time = formatDate(myDate, 'yyyy-MM-dd hh:mm:ss') //获取当前时间
      this.$confirm('您是否已经保存了内容？未保存请点击取消去保存，已经保存请点击确定', '提示', {  //提示框
        cancelButtonText: '取消',
        confirmButtonText: '确定',
        type: 'warning'
      })
        .then(() => {
          this.$http.post('articlesList', this.article).then(() => {
          this.$message({ 
            message: '成功添加一篇文章',
            type: 'success'
          });
          this.$router.push('/articles/list') //跳回文章列表页面
          this.article = {  //跳回文章列表页后将新建页数据清空
            title: '',      
            body: '',  
            selectTags: [], 
            time: '',
            value: '',
            discription: '', 
            topicImage: '',  
            views: 100,
            like: 100,
            comments: [],      
          }
        })
        })
        .catch(() => {
          this.$message({
            type: 'info',
            message: '已取消提交'
          });          
        });
    },
    cancelCreate() {  //点击取消按钮
      this.$confirm('您已输入的内容将全部清空，并且返回文章列表页面', '提示', {  //提示框
        cancelButtonText: '取消',
        confirmButtonText: '确定',
        type: 'warning'
      })
        .then(() => {
          this.$message('取消新建');
          this.$router.push('/articles/list') //跳回文章列表页面
          this.article = {  //将新建页数据清空
            title: '',      
            body: '',
            currentCg: '',   
            time: '',
            value: '',
            discription: '', 
            topicImage: '',  
            views: 100,
            like: 100,
            comments: [],      
          }
        })
        .catch(() => {})  //虽然不做处理，但还是要写catch，否则会报错
    },
    getTagColor(index) {  //标签颜色
      return tagColor(index)
    },
    selectTag(tag, index) {  //选中标签
      if(this.article.selectTags.length) {  //有选中标签后，若标签重复选择则报错
        if(this.article.selectTags.findIndex( item => item.tagName === tag ) > -1 ) {
          return this.$message({
            message: '该标签已存在，请勿重复添加',
            type: 'warning'
          });
        }
      }
      this.article.selectTags.push({
        tagName: tag,
        i: index
      })
    },
    removeTag(index) {  //删除某个选中的标签
      this.article.selectTags.splice(index, 1)
    },
    selectAllTags() {  //全选所有标签
      this.tags.forEach((tag, index) => {
        if(this.article.selectTags.findIndex( item => item.tagName === tag ) === -1) {
          this.article.selectTags.push({
            tagName: tag,
            i: index
          })
        }
      })
    },
    removeAllTags() {  //取消已选标签
      this.article.selectTags = []
    },
    reverseTags() {  //选中的标签倒序
      this.article.selectTags.reverse()
    },

    getHtml(value, render) {  //点击markdown编辑器的保存按钮
      this.$confirm('此操作将替换掉原有的文本内容，是否继续？', '提示', {  //提示框
        cancelButtonText: '取消',
        confirmButtonText: '确定',
        type: 'warning'
      }).then(() => {
        this.article.body = render
        this.$message({
          type: 'success',
          message: '已保存'
        });
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消保存'
        });          
      });
    }
  },
  created() {
    this.getTags()
  }
}
</script>

<style scoped>
 .tagsContainer {
    background-color: #fff;  
    box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
  }
  .tags .el-form-item__content {
    margin-left: 0;
  }
  .tagControl {  /* 标签控制按钮 */
    width: 80px;
    height: 40px;
    text-align: center;
    line-height: 40px;
    font-size: 15px;
    display: inline-block;
    margin: 10px 0 15px 20px;
    border-radius: 0;
    border: none;
    cursor: pointer;
  } 
  .tC-1 {  /* 第一个标签控制按钮 */
    background-color: rgb(255, 63, 5);
    margin-left: 0;
  }
  .tC-2 {  /* 第二个标签控制按钮 */
    background-color: rgb(104, 9, 9);
  }
  .tag { /* 标签的统一样式 */
    margin-right: 10px;
    cursor: pointer;
    color: white;
  }
  .formButton {  /* 利用flex布局使得按钮向右排列 */
    display: flex;
    flex-direction: row-reverse;
  }
  .submitBtn {
    border: 0;
    color: rgb(245, 245, 245);
    background-color: rgb(5, 199, 233);
  }
  .submitBtn:hover {
    color: black;
    background-color: rgb(0, 215, 253);
  }
  .el-image {
    margin-top: 10px;
    width: 250px;
    height: 150px;
  }
</style>