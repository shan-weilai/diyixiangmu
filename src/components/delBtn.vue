<template>
   <el-button type="danger" @click="del" > 删除 </el-button>

</template>

<script>
export default {
    methods:{
        del(){
             this.$confirm("你确定要删除吗?", "提示", {
        confirmButtonText: "删除",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          //点击删除按钮之后的确定，获取要删除的对象
          this.$emit("confirm")
         
        })
        .catch(() => {});
        }
    }
}
</script>

<style>

</style>