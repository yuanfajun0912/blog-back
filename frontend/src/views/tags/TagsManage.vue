<template>
  <div>
    <!-- 已有 -->
    <div class="item">
      <span class="title">已有标签</span>
      <div class="tags-container">
        <el-tag class="tag" v-for="(tag, index) in tags" :key="index" 
                :color="getTagColor(index)" @click="selectDeleteTag(tag, index)">{{tag.tagName}}
        </el-tag>
      </div>
    </div>
    <!-- 新建 -->
    <div class="item">
      <span class="title">新建标签</span>
      <div class="tags-container">
        <el-tag
          class="add-tag"
          :key="index"
          v-for="(tag, index) in dynamicTags"
          closable
          :disable-transitions="false"
          @close="handleClose(tag)">
          {{tag.tagName}}
        </el-tag>
        <el-input
          class="input-new-tag"
          v-if="inputVisible"
          v-model="inputValue"
          ref="saveTagInput"
          size="small"
          @keyup.enter.native="handleInputConfirm"
          @blur="handleInputConfirm"
        >
        </el-input>
        <el-button v-else class="button-new-tag" size="small"
                   @click="showInput" background="black">+ 新标签
        </el-button>
      </div>
      <div style="text-align: right">
        <el-button type="primary" size="medium" @click="addTags" round>确定</el-button>
        <el-button type="danger" size="medium" @click="removeAddTags" round>清空</el-button>
      </div>
    </div>
    <!-- 删除 -->
    <div class="item">
      <span class="title">删除标签</span>
      <div class="tags-container">
        <span v-if="isShow">(请点击选取已有标签)</span>
        <el-tag v-else class="tag" ref="aaa">{{deleteTag.tagName}}</el-tag>
      </div>
      <div style="text-align: right">
        <el-button type="primary" size="medium" @click="removeTag(deleteTag)" round>删除</el-button>
        <el-button type="danger" size="medium" @click="removeDeleteTag" round>清空</el-button>
      </div>
    </div>
  </div>
</template>

<script>
import { tagColor } from '../../common/utils'

export default {
  name: 'TagsManage',
  data() {
    return {
      tags: [],  //已有标签 

      dynamicTags: [],  //准备新建的标签
      inputVisible: false,  //控制输入框的显示
      inputValue: '',  //输入框输入的内容

      deleteTag: {},  //要删除的标签
    };
  },
  computed: {
    isShow() {  //删除块中的提醒话语是否显示
      if(!Object.keys(this.deleteTag).length) return true
      return false
    },
    isEditShow() {  //编辑快块中的提醒话语是否显示
      if(!Object.keys(this.editTag).length) return true
      return false
    }
  },
  methods: {
    getTagColor(index) {  //标签颜色
      return tagColor(index)
    },
    getTags() {  //拿到已有标签
      this.$http.get('/tagsList').then(res => {
        this.tags = res.data
      })
    },

    handleClose(tag) {  //关闭新建标签
      this.dynamicTags.splice(this.dynamicTags.indexOf(tag), 1);
    },
    showInput() {  //展示输入框
      this.inputVisible = true;
      this.$nextTick(()=> {  //执行一些dom操作的时候就放这里面
        this.$refs.saveTagInput.$refs.input.focus();  //不聚焦在输入框上面了就关闭输入框
      });
    },
    handleInputConfirm() {  //通过输入框为新建标签部分加入标签
      let inputValue = this.inputValue;
      if (inputValue) {
        this.dynamicTags.push({
          tagName: inputValue
        });
      }
      this.inputVisible = false;
      this.inputValue = '';
    },
    addTags() {  //将新建框内的标签上传
      if(this.dynamicTags.length === 0) {  //不能为空
        return this.$message({ 
          message: '不能为空',
          type: 'error'
        });
      }
      if(this.$store.state.user === 'visitor') {  //如果是游客则禁止操作
        return this.$message({  
          message: '游客身份禁止操作',
          type: 'error'
        });
      }
      this.$confirm('确定新建这些标签？', '提示', {  //提示框
        cancelButtonText: '取消',
        confirmButtonText: '确定',
        type: 'warning'
      })
        .then(() => {
          this.$http.post('tagsList', this.dynamicTags).then(() => {
          this.$message({ 
            message: '新建标签成功',
            type: 'success'
          });
          this.dynamicTags = []
          this.getTags() //更新已有标签
        })
        })
        .catch(() => {
          this.$message({
            message: '已取消',
            type: 'info'
          });          
        });
    },
    removeAddTags() {  //清空
      this.dynamicTags = []
    },

    selectDeleteTag(tag, index) {  //拿到想要删除/修改的元素
      this.deleteTag = tag
      // this.editTag = tag
      this.$nextTick(() => {  //必须要在this.$nextTick里面操作dom
        this.$refs.aaa.$el.style.backgroundColor = `${tagColor(index)}`
        // this.$refs.bbb.$el.style.backgroundColor = `${tagColor(index)}`
      })
    },
    removeTag(tag) {  //删除标签
      if(!Object.keys(tag).length) {  //不能为空
        return this.$message({ 
          message: '不能为空',
          type: 'error'
        });
      }
      if(this.$store.state.user === 'visitor') {  //如果是游客则禁止操作
        return this.$message({  
          message: '游客身份禁止操作',
          type: 'error'
        });
      }
      this.$confirm('确定删除标签？', '提示', {  //提示框
        cancelButtonText: '取消',
        confirmButtonText: '确定',
        type: 'warning'
      })
        .then(() => {
          this.$http.delete(`/tagsList/${tag._id}`).then(() => {
            this.$message({ 
              message: '删除标签成功',
              type: 'success'
            });
            this.getTags()
            this.deleteTag = {}
          })
        })
        .catch(() => {
          this.$message({
            message: '已取消',
            type: 'info'
          });          
        });
    },
    removeDeleteTag() {  //清空
      this.deleteTag = {}
    },
  },
  created() {
    this.getTags()
  }
}
</script>

<style scoped>
  .item {
    margin-bottom: 30px;
  }
  .title {
    float: left;
    line-height: 50px;
    color: #606266;
    font-size: 14px;
    width: 80px;
    text-align: right;
  }
  .tags-container {
    font-size: 14px;
    line-height: 50px;
    padding-left: 100px;
    background-color: #fff;
  }
  .tags-container::after {  /* 清除浮动并且使得tags-container能显示 */
    display: block;
    clear: both;
    content: '';
  }
  .tag {
    color: white;
    margin-right: 10px;
    cursor: pointer;
  }

  .add-tag {
    margin-right: 15px;
  }
  .el-button {
    margin-top: 10px;
  }
  .input-new-tag {  /* 输入框 */
    width: 90px;
    vertical-align: bottom;
  }
</style>