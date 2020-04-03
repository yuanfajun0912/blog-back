<template>
  <div id="timeline">
    <el-timeline>
      <!-- 新建timeline -->
      <el-timeline-item>
        <el-card>
          <el-input
            style="width: 35%; height: 35px"
            type="textarea"
            autosize
            placeholder="请输入标题"
            v-model="addThing.title">
          </el-input>
          <el-date-picker
            style="height: 34px; margin-left: 10px"
            v-model="addThing.time"
            type="date"
            size="small"
            value-format="yyyy-MM-dd"
            placeholder="选择日期">
          </el-date-picker>
          <el-input
            style="width: 60%; margin-top: 10px"
            type="textarea"
            :rows="2"
            placeholder="请输入内容"
            v-model="addThing.body">
          </el-input>
          <div class="btn-container">
            <el-button
              size="medium"
              type="primary"
              @click="add">新建事件</el-button>
            <el-button
              size="medium"
              @click="cancel">取消</el-button>
          </div>
        </el-card>
      </el-timeline-item>
      <!-- 已有timeline -->
      <el-timeline-item v-for="(item, index) in things" :key="index">
        <el-card>
          <!-- 信息区域 -->
          <div class="info-container" v-if="isShow(index)">
            <h4>{{item.title}}  ({{item.time}})</h4>
            <p>{{item.body}}</p>
          </div>
          <!-- 处于编辑状态的item的编辑区域 -->
          <div class="input-container" v-else>
            <el-input
              style="width: 35%; height: 35px"
              type="textarea"
              autosize
              placeholder="请输入标题"
              v-model="editThing.title">
            </el-input>
            <el-date-picker
              style="height: 34px; margin-left: 10px"
              v-model="editThing.time"
              type="date"
              size="small"
              value-format="yyyy-MM-dd"
              placeholder="选择日期">
            </el-date-picker>
            <el-input
              style="width: 60%; margin-top: 10px"
              type="textarea"
              :rows="2"
              placeholder="请输入内容"
              v-model="editThing.body">
            </el-input>
          </div>
          <!-- 操作区域 -->
          <div class="btn-container">
            <el-button
              v-if="isShow(index)"
              size="medium"
              @click="edit(item, index)">编辑</el-button>
            <!-- 处于编辑状态的item的保存按钮 -->
            <el-button
              v-else
              size="medium"
              type="primary"
              @click="saveEdit(item._id)">保存编辑</el-button>
            <el-button
              v-if="isShow(index)"
              size="medium"
              type="danger"
              @click="remove(item._id)">删除</el-button>
            <!-- 处于编辑状态的item的取消编辑按钮 -->
            <el-button
              v-else
              size="medium"
              @click="cancelEdit">取消编辑</el-button>
          </div>
        </el-card>
      </el-timeline-item>
    </el-timeline>
  </div>
</template>

<script>
export default {
  name: 'Timeline',
  data() {
    return {
      things: [],  //时间线
      addThing: {  //新增的事件
        title: '',
        time: '',
        body: ''
      },
      editThing: {  //修改的事件
        title: '',
        time: '',
        body: ''
      },
      currentIndex: -1  //处于编辑状态的item的index
    }
  },
  watch: {
    //监听currentIndex,避免上一个item编辑的editThing影响了下一个
    'this.currentIndex': function() {  
      this.editThing = {
        title: '',
        time: '',
        body: ''
      }
    }
  },
  methods: {
    getThings() {  //获取数据
      this.$http.get('timeline').then(res => {
        this.things = res.data
      })
    },
    add() {  //新建
      if(this.$store.state.user === 'visitor') {  //如果是游客则禁止操作
        return this.$message({  
          message: '游客身份禁止操作',
          type: 'error'
        });
      }
      this.$confirm('是否确定添加事件', '提示', {  //提示框
        cancelButtonText: '取消',
        confirmButtonText: '确定',
        type: 'warning'
      })
        .then(() => {
          this.$http.post('timeline', this.addThing).then(() => {
          this.$message({ 
            message: '成功添加一个事件',
            type: 'success'
          });
          this.getThings()  //重新请求数据
          this.cancel()  //将输入数据清空
        })
        })
        .catch(() => {
          this.$message({
            type: 'info',
            message: '已取消新建'
          });          
        });
    },
    cancel() {  //取消
      this.addThing = {
        title: '',
        time: '',
        body: ''
      }
    },
    isShow(index) {  //事件信息区域是否显示
      if(index === this.currentIndex) {
        return false
      }else {
        return true
      }
    },
    edit(item, index) {  //进入编辑状态
      this.currentIndex = index
      this.editThing = {  
        title: item.title,
        time: item.time,
        body: item.body
      }
    },
    saveEdit(id) {  //保存编辑并上传
      if(this.$store.state.user === 'visitor') {  //如果是游客则禁止操作
        return this.$message({  
          message: '游客身份禁止操作',
          type: 'error'
        });
      }
      this.$confirm('是否保存更改', '提示', {  //提示框
        cancelButtonText: '取消',
        confirmButtonText: '确定',
        type: 'warning'
      })
        .then(() => {
          this.$http.put(`timeline/${id}`, this.editThing).then(() => {
          this.$message({ 
            message: '成功更改一个事件',
            type: 'success'
          });
          this.currentIndex = -1
          this.getThings()  //重新请求数据
        })
        })
        .catch(() => {
          this.$message({
            type: 'info',
            message: '已取消保存更改'
          });          
        });
    },
    cancelEdit() {  //退出编辑状态
      this.currentIndex = -1
      this.editThing = {  
        title: '',
        time: '',
        body: ''
      }
    },
    remove(id) {  //删除
      if(this.$store.state.user === 'visitor') {  //如果是游客则禁止操作
        return this.$message({  
          message: '游客身份禁止操作',
          type: 'error'
        });
      }
      this.$confirm('确定删除该事件', '提示', {  //提示框
        cancelButtonText: '取消',
        confirmButtonText: '确定',
        type: 'warning'
      })
        .then(() => {
          this.$http.delete(`timeline/${id}`).then(() => {
            this.getThings()  //放到delete请求的then方法里，                   
          })                  //在收到回应后再发送get请求，确保get获取的数据是修改后的
          this.$message({
            type: 'success',
            message: '已成功删除'
          })
        })
        .catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });          
        });
    }
  },
  created() {
    this.getThings()
  }
}
</script>

<style scoped>
  .el-card {
    position: relative;
    width: 90%;
  }
  .info-container {
    width: 70%;
  }
  h4 {
    font-size: 15.5px;
    color: rgb(117, 2, 2);
  }
  p {
    margin-top: 10px;
    font-size: 13.5px;
  }
  .btn-container {
    position: absolute;
    right: 0;
    bottom: 0
  }
</style>