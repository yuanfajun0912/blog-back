<template>
  <div>
    <el-form ref="about" 
             :model="about"
             label-width="80px"
             @submit.native.prevent="editAbout">
      <el-form-item label="昵称" style="width: 40%">
        <el-input v-model="about.nickName" placeholder="请填写昵称" clearable></el-input>
      </el-form-item>
      <el-form-item label="格言" style="width: 80%">
        <el-input v-model="about.motto" placeholder="请填写格言" clearable></el-input>
      </el-form-item>
      <el-form-item label="头像" style="width: 80%">
        <el-input v-model="about.avatar" placeholder="请填写头像的外部链接" clearable></el-input>
        <el-avatar :src="about.avatar" fit="cover" :size="100" style="margin-top: 20px">
        </el-avatar>
      </el-form-item>
      <el-form-item label="联系方式" style="width: 85%" v-if="about.contactWays">
          github: <el-input v-model="about.contactWays[0]" placeholder="请填写链接" clearable></el-input>
          csdn: <el-input v-model="about.contactWays[1]" placeholder="请填写链接" clearable></el-input>
          邮箱: <el-input v-model="about.contactWays[2]" placeholder="请填写邮箱" clearable></el-input>
          微信: <el-input v-model="about.contactWays[3]" placeholder="请填写微信" clearable></el-input>
      </el-form-item>
      <el-form-item class="formButton" style="text-align: right">
        <el-button type="primary" native-type="submit" class="submitBtn">保存设置</el-button>
      </el-form-item>
      <!-- markdown文本编辑器 -->
      <mavon-editor 
        v-model="about.value"
        fontSize="18px"
        @save="getHtml"
      ></mavon-editor>
    </el-form>
  </div>
</template>

<script>
export default {
  name: 'AboutManage',
  data() {
    return {
      // about: {
      //   avatar: '',  //头像
      //   nickName: '',  //昵称
      //   motto: '',  //格言
      //   contactWays: [],  //联系方式
      //   body: '',  //简介（html）
      //   value: '',  //输入的内容
      // }
      about: {},
      value: '', //markdown编辑器的value
    }
  },
  methods: {
    getAbout() {
      this.$http.get('/about').then(res => {
        this.about = res.data[0]
      })
    },
    editAbout() {
      if(this.$store.state.user === 'visitor') {  //如果是游客则禁止操作
        return this.$message({  
          message: '游客身份禁止操作',
          type: 'error'
        });
      }
      this.$confirm('是否确定保存设置？', '提示', {  //提示框
        cancelButtonText: '取消',
        confirmButtonText: '确定',
        type: 'warning'
      })
        .then(() => {
          this.$http.post('/about', this.about).then(() => {
            this.$message({ 
              message: '保存设置成功',
              type: 'success'
            });
          })
        })
        .catch(() => {
          this.$message({
            type: 'info',
            message: '已取消'
          });          
        });
    },
    getHtml(value, render) {  //点击markdown编辑器的保存按钮
      this.$confirm('此操作将替换掉原有的文本内容，是否继续？', '提示', {  //提示框
        cancelButtonText: '取消',
        confirmButtonText: '确定',
        type: 'warning'
      }).then(() => {
        this.about.body = render
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
    this.getAbout()
  }
}
</script>

<style scoped>
</style>