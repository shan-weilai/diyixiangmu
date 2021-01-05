<template>
  <div class="login">
    <div class="con">
      <h3 class="center"> 登录 </h3>
      <div class="ipt">
        <el-input v-model="user.name" placeholder="请输入账号"   clearable></el-input>

         </div>

      <div class="ipt">
        <el-input v-model="user.pass" placeholder="请输入密码"   clearable  show-password></el-input>

         </div>

         <div class="center">
           <el-button type="primary" @click="login"> 登录 </el-button>
         </div>

    </div>
  </div>
</template>

<script>
export default {
  data(){
    return {
      user:{
        name:"",
        pass:""
      }
    }
  },
  	methods:{
    ...mapActions({
      changeUser:"changeUser"
    }),
    //登录
    login(){
      reqLogin(this.user).then(res=>{
        if(res.data.code===200){
          //如果登录成功了，将用户的信息存入store
          this.changeUser(res.data.list)
          //跳转页面
          this.$router.push("/")
        }
      })
    }
  }

}
</script>

<style scoped>
.login{
  widows: 100vw;
  height: 100vh;
  background: linear-gradient(to right,#553544,#433a52,#303d60);
}

.con{
  width: 400px;
  background: #fff;
  padding: 20px;
  position: fixed;
  left: 50%;
  top: 50%;
  transform: translate(-50%,-50%);
  border-radius: 20px;
}

.ipt{
      margin: 10px;
}
.center{
  text-align: center;
}
</style>