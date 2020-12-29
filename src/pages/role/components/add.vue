<template>
  <div>
      <!-- 弹框 -->

      <el-dialog :title="info.isadd?'添加角色':'编辑角色'" :visible.sync="info.isshow" 
      @closed="quxiao">
          {{user}}
         <el-form :model="user">
           <el-form-item label="角色名称" label-width="100px">
             <el-input v-model="user.rolename" autocomplete="off">  </el-input>
            </el-form-item>


           <el-form-item label="角色权限" label-width="100px">
              <el-tree  :data="menuList" show-checkbox  node-key="id"
              ref="tree"
               :props="{  children: 'children', label: 'title' }" >
              </el-tree>
            </el-form-item>





             <el-form-item label="状态" label-width="100px">
               <el-switch v-model="user.status" :active-value="1" :inactive-value="2" >
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
import {reqroleAdd,reqMenuDetail, reqMenuUpdate,tianjialist,reqroleDetail,reqroleUpdate} from "../../../utils/http"
import {successalert} from "../../../utils/alert"

export default {
  props:["info","list"],
    data(){
        return {
             
       //树形控件的数据
          menuList:[],
   
           user:{
              rolename:"",
              menus:"",
              status:1,
           },
           
        }
    },

    mounted(){
        //已进入页面就要拿到菜单页的数据
       tianjialist().then(res=>{
          if(res.data.code==200){
            this.menuList=res.data.list
         
          }
        })
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
                rolename:"",
                menus:"",
                status:1 
                  };
             //树形控件要清除数据
             this.$refs.tree.setCheckedKeys([])     
      },
    //添加
      add(){

        this.user.menus=JSON.stringify(this.$refs.tree.getCheckedKeys())

       reqroleAdd(this.user).then(res=>{
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
     reqroleDetail({id:id}).then(res=>{
        if(res.data.code==200){
          this.user=res.data.list
          //补id
          this.user.id=id;
          //给树形控件赋值
          this.$refs.tree.setCheckedKeys(JSON.parse(this.user.menus))
        }
      })
    },
    //修改
    update(){
       this.user.menus=JSON.stringify(this.$refs.tree.getCheckedKeys())
     reqroleUpdate(this.user).then(res=>{
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