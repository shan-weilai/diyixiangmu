<template>
  <div>
      <!-- 菜单  -->
      <el-button type="primary" @click="tantian"> 添加 </el-button>

      <!-- 表格组件 -->
      <v-list :list="list" @init="init" @edit="edit($event)"></v-list>
      <!-- 弹框组件 -->
      <v-add :info="info" @init="init" :list="list" ref="add"></v-add>
  </div>
</template>

<script>
import vList from "./components/list"
import vAdd from "./components/add"
import {tianjialist} from "../../utils/http"
export default {
  components:{
    vList,
    vAdd
  },
  data(){
    return {
      //弹框一开始的状态，是隐藏的
     info:{
        isshow:false,//用json格式传递数据，可以保证子变父变，父边子变，
        isadd:true
     },
     //初始化列表数据
     list:[],
    }
  },
  methods:{
        //点击添加按钮，出现弹窗
    tantian(){
      this.info.isshow=true;
      //是添加
      this.info.isadd=true
    },
     // 获取tianjialist
    init(){
      tianjialist().then(res=>{
       if(res.data.code==200){
         this.list=res.data.list
       }
      })
    },
    //编辑触发
    edit(id){
      //弹框出现
      this.info.isshow=true;

      //是编辑
      this.info.isadd=false

      //触发add的getOne()
      this.$refs.add.getOne(id)
    }
  },
  mounted(){
    this.init()
  }
}

</script>

<style>

</style>