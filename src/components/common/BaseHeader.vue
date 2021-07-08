<template>

  <div id="container" style="width:2000px" >
    <div>
      页面首部
    </div>
    <div id="header" style="background-color:#67C23A;">
      <h1 style="margin-bottom:0;font-size: 2em;color: #CCFF33;border-radius:25px;">图书推荐系统</h1></div>
    <div id="menu" style="background-color:#909399;font-size:20px;color: #CCFF33;">
     <br>
  <el-menu>
    <el-menu-item index="1">图书类别展示</el-menu-item>
    <el-menu-item index="2">新书上架</el-menu-item>
    <el-menu-item index="3" >登录</el-menu-item>
    <el-menu-item index="4">注册</el-menu-item>
    <el-menu-item index="5" >个性化推荐</el-menu-item>
    <el-menu-item index="6">个性化聚类</el-menu-item>
    <el-menu-item index="5" >图书推荐</el-menu-item>
    <el-menu-item index="6">图书top</el-menu-item>
  </el-menu>

</div>

  </div>
</template>

<script>
export default {
  name: "BaseHeader"
}
</script>

<style scoped>

</style>
