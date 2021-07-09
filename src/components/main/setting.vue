
<template>
  <div class="personalCenter">
    <el-container>
      <el-header>个人中心</el-header>
      <el-container>
        <el-main>
          <el-col :span="4">
            <div class="sub-title"></div>
            <div class="demo-basic--circle">
              <div class="img">
                <el-avatar
                  :size="100"
                  :src="circleUrl"
                  align="center"
                ></el-avatar>
              </div>
              <div class="block">

              </div>
            </div>
          </el-col>
          <el-input
            v-model="input1"
            type="text"
            placeholder="用户ID"
            maxlength="6"
            show-word-limit
          ></el-input>
          <el-input
            v-model="input2"
            type="text"
            placeholder="用户昵称"
            show-word-limit
          ></el-input>
          <el-input
            v-model="input3"
            type="text"
            placeholder="用户昵称"
            show-word-limit
          ></el-input>
          <el-input
            v-model="input4"
            placeholder="请输入密码"
            show-password
          ></el-input>
          <el-input
            v-model="input5"
            type="text"
            placeholder="用户姓名"
            show-word-limit
          ></el-input>
          <el-input
            v-model="input6"
            type="text"
            placeholder="用户权限"
            maxlength="2"
            show-word-limit
          ></el-input>
          <el-input v-model="input7" placeholder="邮箱">

          </el-input>
          <el-input
            v-model="input8"
            type="text"
            placeholder="手机号码"
            maxlength="20"
            show-word-limit
          ></el-input>
          <el-input
            v-model="input9"
            type="text"
            placeholder="固定电话"
            maxlength="20"
            show-word-limit
          ></el-input>
          <el-button-group style="float: right; padding: 3px 0" type="text">
            <el-button class="logBtn" type="primary" size="medium" @click="messsave()">保存</el-button>
          </el-button-group>

          <el-container>

          </el-container>
        </el-main>
      </el-container>

    </el-container>

  </div>
</template>
<script>
export default {
  name: 'PersonalCenter',
  data() {
    return {
      text: '',
      input1: '',
      input2: '',
      input3: '',
      input4: '',
      input5: '',
      input6: '',
      input7: '',
      input8: '',
      input9: '',
      circleUrl:
        '../../../static/m.jpg',
      sizeList: ['large'],

    }
  },
  methods: {
    handleEdit(index, row) {
      console.log(index, row)
    },
    handleDelete(index, row) {
      console.log(index, row)
    },
    messsave(){
      console.log('登录成功')
      this.$message({
        showClose: true,
        message: '修改成功！',
        type: 'success',
        center: true
      })
      this.$router.push({
        path: '/home'
      })
    }
  },
}
</script>
<style>
.el-header {
  line-height: 60px;
  text-align: center;
  background-color: #b3c0d1;
}
.el-aside {
  line-height: 44px;
  text-align: center;
  background-color: #d3dce6;
}
/*.el-main {*/
/*  line-height: 36px;*/
/*  text-align: center;*/
/*  background-color: #e9eef3;*/
/*}*/

.demo-basic--circle {
  align: 'center';
  margin-top: 30px;
  margin-left: 800px;
}
.block {
  margin-left: 25px;
  font-weight: bold;
}
.text {
  font-size: 14px;
}
.item {
  margin-bottom: 18px;
}
.clearfix:before,
.clearfix:after {
  display: table;
  content: '';
}
.clearfix:after {
  clear: both;
}

.box-card {
  width: 1368px;
  border-radius: 30px;
}
</style>

