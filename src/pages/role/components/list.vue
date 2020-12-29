<template>
  <div>
      <el-table
    :data="list" style="width: 100%;margin-bottom: 20px;"
    row-key="id"  border   
    :tree-props="{children: 'children'}">

    <el-table-column   prop="id"  label="角色编号" sortable  width="180">
    </el-table-column>

    <el-table-column  prop="rolename"  label="角色名称"  sortable width="180">
    </el-table-column>


    <el-table-column     label="状态">
      <template slot-scope="scope">
        <el-button type="primary" v-if="scope.row.status===1">启用 </el-button>     
        <el-button type="info" v-else>禁用 </el-button>     
      </template>
    </el-table-column>

    <el-table-column  label="操作">
        <template slot-scope="scope">
        <el-button type="primary" @click="edit(scope.row.id)">编辑 </el-button>     
    
    <!-- 组件方式设置删除按钮 -->
    <del-btn @confirm="del(scope.row.id)"></del-btn>
         </template>  
     </el-table-column>
    
  </el-table>
  </div>
</template>

<script>
import {caidanshanchu, reqroleDel} from '../../../utils/http'
import {successalert} from '../../../utils/alert'
export default {
    props:["list"],
  methods:{
      //删除按钮
        del(id) {
   reqroleDel({id:id}).then(res=>{
     if(res.data.code == 200){
       successalert(res.data.msg);
       this.$emit("init")
     }
   })
    },

    //点了编辑按钮
    edit(id){
      //通知父组件有人点了编辑按钮
      this.$emit("edit",id)  
    }
  }
   

}
</script>

<style>

</style>