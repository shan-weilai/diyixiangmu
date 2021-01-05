import Vue from 'vue'
import Router from 'vue-router'
Vue.use(Router)

import store from "../store"
function checkEnter(path,next){
  if(store.state.userInfo.menus_url.includes(path)){
    next()
  }else{
    next("/")
  }
}


  export let indexerjiluyou=[
  {
    path:"banner",
    component:()=>import("../pages/banner/banner.vue"),
    name:"轮播图管理"
  },
  {
    path:"goods",
    component:()=>import("../pages/goods/goods.vue"),
    name:"商品管理"
  },
  {
    path:"manage",
    component:()=>import("../pages/manage/manage.vue"),
    name:"管理员管理"
  },
  {
    path:"member",
    component:()=>import("../pages/member/member.vue"),
    name:"会员管理"
  },
  {
    path:"menu",
    component:()=>import("../pages/menu/menu.vue"),
    name:"菜单管理"
  },
  {
    path:"role",
    component:()=>import("../pages/role/role.vue"),
    name:"角色管理"
  },
  {
    path:"seckill",
    component:()=>import("../pages/seckill/seckill.vue"),
    name:"活动秒杀"
  },
  {
    path:"cate",
    component:()=>import("../pages/cate/cate.vue"),
    name:"商品分类"
  },
  {
    path:"specs",
    component:()=>import("../pages/specs/specs.vue"),
    name:"商品规格"
  }
   ]

let router = new Router({
  routes: [
   {
     path:"/login",
     component:()=>import ("../pages/login/login.vue")   //懒加载
   },
   {
     path:"/",
     component:()=> import ('../pages/index/index.vue'),  //本来是要配置/index,结果是将/index和重定向结合在一起写了
     //二级路由规则
     children:[
       {
         path:"",
         component:()=>import("../pages/home/home.vue")
         //home是首页，同时也把home定义为二级路由重定向
       }].concat(indexerjiluyou)   //数组的拼接
   }
  ]
})
//登录拦截
// router.beforeEach((to,from,next)=>{
//   //如果去到是登录 next
//   if(to.path==="/login"){
//     next()
//     return
//   }
//   //不是登录，判断是否登录，登录了，就next
//   if(store.state.userInfo.id){
//     next()
//     return;
//   }
//   //否则 next("/login")
//   next("/login")
// })

export default router