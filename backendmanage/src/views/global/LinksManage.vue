<template>
  <div id="links-manage">
    <div class="table-container">
      <el-table :data="links">
        <el-table-column prop="name" label="链接名" width="280">
        </el-table-column>
        <el-table-column prop="url" label="链接地址"  width="310">
        </el-table-column>
        <el-table-column label="操作">
          <!-- scope.row是当前行的数据信息，id是它在数据库中的id --> 
          <template slot-scope="scope"> 
              <el-button
                size="mini"
                type="danger"
                @click="removeLink(scope.$index)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-button type="primary" @click="submitLinks">提交</el-button>
    </div>
    <div class="add-container">
      <p>新增链接</p>
      <el-input class="name" v-model="addLink.name" placeholder="请输入链接名"></el-input>
      <el-input class="address" v-model="addLink.url" placeholder="请输入链接地址"></el-input>
      <el-button @click="addOneLink">新增</el-button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'LinksManage',
  data() {
    return {
      links: [],
      addLink: {
        name: '',
        url: ''
      }
    }
  },
  methods: {
    getLinks() {
      this.$http.get('friendshiplinks').then(res => {
        this.links = res.data
      })
    },
    addOneLink() {  //新增
      if(this.addLink.name === '') {
        return this.$message({
          message: '链接名不能为空',
          type: 'error'
        });
      }else if(this.addLink.url === '') {
        return this.$message({
          message: '链接地址不能为空',
          type: 'error'
        });
      }else {
        this.links.push(this.addLink)
        this.addLink = {}
      }
      
    },
    removeLink(linkIndex) {  //删除
      this.links.splice(linkIndex, 1)
    },
    submitLinks() {  //提交
      if(this.$store.state.user === 'visitor') {  //如果是游客则禁止操作
        return this.$message({  
          message: '游客身份禁止操作',
          type: 'error'
        });
      }
      this.$confirm('是否确定提交？', '提示', {  //提示框
        cancelButtonText: '取消',
        confirmButtonText: '确定',
        type: 'warning'
      })
        .then(() => {
          this.$http.post('friendshiplinks', this.links).then(()=> {
            this.getLinks()  //确保在收到回复后刷新
            this.$message({
              type: 'success',
              message: '已提交'
            });
          })
             
        })
        .catch(() => {
          this.$message({
            type: 'info',
            message: '已取消'
          });          
        });
    }
  },
  created() {
    this.getLinks()
  }
}
</script>

<style scoped>
  #links-manage {
    display: flex;
  }
  .table-container {
    flex: 1.5;
    margin-right: 10px;
  }
  .table-container .el-button{
    margin-top: 10px;
    float: right;
  }
  .table-container::after {
    content: '';
    clear: both;
    overflow: hidden;
  }
  .add-container {
    flex: 1;
  }
  .add-container .el-button {
    float: right;
    margin-top: 10px;
    background-color: rgb(236, 236, 70);
  }
  .add-container::after {
    content: '';
    clear: both;
    overflow: hidden;
  }
  .name {
    width: 70%;
    margin: 10px 0;
  }
</style>