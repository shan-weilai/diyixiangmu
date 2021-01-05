<template>
  <div>
     
     <el-container class="index">
      <el-aside width="200px">

        <!-- 侧边栏 -->
         <el-menu default-active="2" 
           class="el-menu-vertical-demo" 
          background-color=" #20222A" 
           text-color="#fff"  
           active-text-color="#ffd04b"
           :unique-opened="true"
           router
           >


       <el-menu-item index="/">
        <i class="el-icon-menu"></i>
        <span slot="title">首页</span>
      </el-menu-item>


        <el-submenu index="1">
           <template slot="title">
            <i class="el-icon-location"></i>
            <span>系统设置</span>
           </template>
        <el-menu-item-group>
          <el-menu-item index="/menu">菜单管理</el-menu-item>
          <el-menu-item index="/role">角色管理</el-menu-item>
          <el-menu-item index="/manage">管理员管理</el-menu-item>
        </el-menu-item-group>
        </el-submenu> 

         <el-submenu index="3">
           <template slot="title">
            <i class="el-icon-location"></i>
            <span>商城管理</span>
           </template>
        <el-menu-item-group>
          <el-menu-item index="/cate">商品分类</el-menu-item>
          <el-menu-item index="/specs">商品规格</el-menu-item>
          <el-menu-item index="/goods">商品管理</el-menu-item>
          <el-menu-item index="/member">会员管理</el-menu-item>
          <el-menu-item index="/banner">轮播图管理</el-menu-item>
          <el-menu-item index="/seckill">秒杀活动</el-menu-item>
        </el-menu-item-group>
        </el-submenu> 
      </el-menu>
      </el-aside>
      <el-container>
        <el-header>Header</el-header>
        <el-main>
          <!-- 内容部分 -->
            <!-- 面包屑 -->
         <el-breadcrumb separator="/">
          <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
          <!-- 里面的内容是要实时变化的，所以用了{{$route.name}},并且要在路由哪里配上name,才可以正常使用 -->
          <el-breadcrumb-item> {{$route.name}} </el-breadcrumb-item>
        </el-breadcrumb>
          <!-- 这部分内容不确定，所以要用到其他的组件 -->
          <!-- 二级路由入口 -->
          <router-view class="con"> </router-view>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
export default {
    methods: {
    ...mapActions({
      changeUser: "changeUser"
    }),
    //退出登录
    logout(){
      this.changeUser({})
      this.$router.replace("/login")
    }
  },
}
</script>

<style scoped>
.index{
  height: 100vh;
}
.el-aside{
   background: #20222A;
}
.el-header{
   background: #83c0D1;
}
.con{
  padding-top: 20px;
}

</style>