<template>
  <div id="login">
    <form action="" method="post" class="loginBox" @keyup.enter="login"> <!-- 点击回车也可以登录 -->
      <div>管理员登录</div>
      <label for="name">
        用户名：<input type="text" id="name" autocomplete="off" v-model="name">
      </label><br>
      <label for="password">
        密码：<input type="password" id="password" autocomplete="off" v-model="password">
        <!-- 密码错误显示的小图标 <i class="el-icon-warning-outline" v-show="isShow"></i> -->
      </label><br>
      <input type="button" class="submit" value="登录" @click="login">
      <input type="button" class="resert" value="重置" @click="resert">
    </form>
  </div>
</template>

<script>
export default {
  name: 'Login',
  data() {
    return {
      name: '',
      password: '',
      isShow: false,
    }
  },
  methods: {
    resert() { 
      // document.getElementById('name').value = ''
      // document.getElementById('password').value = ''
      this.name = ''
      this.password = ''
    },
    login() {
      if(!this.name) {  //防止用户名为空
        return this.$message({
          message: '请填写用户名！',
          type: 'warning'
        })
      }
      if(!this.password) {  //防止密码为空
        return this.$message({
          message: '请填写密码！',
          type: 'warning'
        })
      }
      let userData = {
        userName: this.name,
        password: this.password
      }
      this.$http.post('/login', JSON.stringify(userData), {
        headers: {'Content-Type':'application/json'}  //设置请求头，发送的数据是json格式
      })
        .then(res => res.data)
        .then(data => {
          if(data.status === 201) {  //用户不存在
            return this.$message({
              message: '用户不存在',
              type: 'error'
            })
          }
          if(data.status === 202) {  //密码错误
            return this.$message({
              message: '密码错误',
              type: 'error'
            })
          }
          localStorage.setItem('token', data.token)  //将token保存在localStorage
          // localStorage.removeItem('token')
          this.$router.push('/articles')  //跳转页面
        })
    }
  }
}
</script>

<style scoped>
  #login {
    width: 100%;
    height: 100%;
    background: url(../assets/loginbg.jpg);
    background-size: cover;
    font-family: Cambria, Cochin, Georgia, Times, 'Times New Roman', serif;
  }
  .loginBox {
    color: white;
    width: 400px;
    height: 210px;
    font-size: 20px;
    border-radius: 15px;
    background-color: rgba(5, 5, 5, 0.4);
    text-align: center;
    padding: 20px;
    /* 自适应垂直居中 */ 
    margin: auto;
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
  }
  .loginBox>div {
    font-size: 25px;
  }
  .loginBox>label:nth-of-type(1) { /* 选中两个label */
    display: block;
    margin-top: 20px;
  }
  .loginBox #name {
    width: 200px;
    height: 20px;
    font-size: 20px;
    color: white;
    background-color: rgba(5, 5, 5, 0);
    border: none;
    border-bottom: 1px solid white;
    outline: none;  /*去掉默认的点击轮廓 */
    line-height: 20px;
  }
  .loginBox #name:focus {  /* 聚焦时 */
    border-bottom: 1px solid rgb(112, 137, 214);
  }
  .loginBox #password {
    width: 200px;
    height: 20px;
    font-size: 20px;
    margin-left: 19px;
    color: white;
    background-color: rgba(5, 5, 5, 0);
    border: none;
    border-bottom: 1px solid white;
    outline: none;  /*去掉默认的点击轮廓 */
  }
  .loginBox #password:focus {
    border-bottom: 1px solid rgb(112, 137, 214);
  }
  /* .loginBox .el-icon-warning-outline {
    background-color: rgb(250, 65, 65);
    border-radius: 100px;
    position: absolute;
  } */
  .loginBox .submit {
    font-family: Cambria, Cochin, Georgia, Times, 'Times New Roman', serif;
    background-color: #fff;
    border: none;
    border-radius: 10px;
    font-size: 15px;
    width: 60px;
    height: 40px;
    cursor: pointer; /* 鼠标样式变小手 */
    outline: none;
    /* 移动 */
    position: relative;
    top: 35px;
    right: 50px;
  }
  .loginBox .submit:hover {
    background-color: rgb(158, 173, 219);
  }
  .loginBox .resert {
    font-family: Cambria, Cochin, Georgia, Times, 'Times New Roman', serif;
    background-color: #fff;
    border: none;
    border-radius: 10px;
    font-size: 15px;
    width: 60px;
    height: 40px;
    cursor: pointer; /* 鼠标样式变小手 */
    outline: none;
    /* 移动 */
    position: relative;
    top: 35px;
    left: 50px;
  }
  .loginBox .resert:hover {
    background-color: rgb(158, 173, 219);
  }
</style>