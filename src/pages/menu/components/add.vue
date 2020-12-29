<template>
  <div>
      <!-- 弹框 -->

      <el-dialog :title="info.isadd?'添加菜单':'编辑菜单'" :visible.sync="info.isshow" 
      @closed="quxiao">
          {{user}}
         <el-form :model="user">
           <el-form-item label="菜单名称" label-width="100px">
             <el-input v-model="user.title" autocomplete="off">  </el-input>
            </el-form-item>

           
        <el-form-item label="上级菜单" label-width="100px">
          <el-select v-model="user.pid" @change="changePid">
            <el-option :value="0" label="顶级菜单"></el-option>
            <!-- 需要一段数据 -->
            <el-option v-for="item in list" :key="item.id" :value="item.id" :label="item.title"></el-option>
          </el-select>
        </el-form-item>



            <el-form-item label="菜单类型" label-width="100px">
                <el-radio v-model="user.type" :label="1" disabled>目录 </el-radio>
                <el-radio v-model="user.type" :label="2" disabled>菜单 </el-radio>
            </el-form-item>

            <el-form-item label="菜单图标" label-width="100px"
             v-if="user.type==1">
                <el-select v-model="user.icon" >
               <el-option v-for="item in icons" :key="item" :value="item"> 
                        <i :class="item">  </i>      
                 </el-option>
                </el-select>
            </el-form-item>

            <el-form-item label="菜单地址" label-width="100px" v-else>
                <el-select v-model="user.url" >
               <el-option v-for="item in indexerjiluyou" :key="item.path" :value="'/'+item.path" :label="item.name+'-/' + item.path"> 
                            
               </el-option>
                </el-select>
            </el-form-item> 

             <el-form-item label="状态" label-width="100px">
               <el-switch v-model="user.status" :active-value="1" :inactive-value="2"  
                    >
                    </el-switch>
            </el-form-item> 

              </el-form>
                 
              <div slot="footer" class="dialog-footer">
                <el-button @click="quxiao">取 消</el-button>
                <el-button type="primary" @click="add" v-if="info.isadd">添加</el-button>
                <el-button type="primary" @click="update" v-else >修改</el-button>
              </div>
            </el-dialog>
              </div>
</template>

<script>
import {indexerjiluyou} from "../../../router"
import {reqmenuAdd,reqMenuDetail, reqMenuUpdate} from "../../../utils/http"
import {successalert} from "../../../utils/alert"
export default {
  props:["info","list"],
    data(){
        return {
           user:{
              pid:0,
              title:"",
              icon:"",
              type:1,
              url:"",
              status:1 
           },
           icons:[
             "el-icon-setting",
             "el-icon-goods",
             "el-icon-s-order",
             "el-icon-s-comment",
             "el-icon-s-ticket",
             "el-icon-s-shop"
           ],
           indexerjiluyou
        }
    },
    methods:{
      quxiao(){
         //编辑清空数据
      if(!this.info.isadd){
        this.empty()
      }
        this.info.isshow=false
      },
       //清空原先的user值
      empty(){
          this.user={ //使有数据的user变成最开始的没数据时user
              pid:0,
              title:"",
              icon:"",
              type:1,
              url:"",
              status:1
          }
      },
    //添加
      add(){
        reqmenuAdd(this.user).then(res=>{
          // console.log(this.user)
          if(res.data.code==200){
            //成功弹框
            successalert(res.data.msg)
            // 弹框消失
            this.quxiao()
            //清空user
            this.empty()
            // 列表刷新
            this.$emit("init")
          }
        })       
      },
    //修改了顶级菜单
      changePid(){
        if(this.user.pid==0){
          this.user.type=1
        }else{
          this.user.type=2
        }
      },
      //获取详情
    getOne(id){
      reqMenuDetail({id:id}).then(res=>{
        if(res.data.code==200){
          this.user=res.data.list
          //补id
          this.user.id=id;
        }
      })
    },
    //修改
    update(){
      reqMenuUpdate(this.user).then(res=>{
        if(res.data.code==200){
          //弹成功
          successalert(res.data.msg)
          //弹框消失
          this.quxiao()
          //数据清空
          this.empty()
          //刷新list
          this.$emit("init")
        }
      })
    }

    }

}
</script>

<style>

</style>