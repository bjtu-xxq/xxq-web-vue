
<template>
  <div class="personalCenter">
    <el-container>

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
          <el-input v-model="input1" type="text" placeholder="用户ID" maxlength="6" show-word-limit></el-input>
          <el-input v-model="input2" type="text" placeholder="用户名" show-word-limit></el-input>
          <el-input v-model="input3" type="text" placeholder="用户昵称" show-word-limit></el-input>
<!--          <el-input v-model="input4" placeholder="请输入密码" show-password></el-input>-->
          <el-input v-model="input5" type="text" placeholder="邮箱" show-word-limit></el-input>
          <el-input v-model="input6" type="text" placeholder="手机号" maxlength="10" show-word-limit></el-input>
          <el-input v-model="input7" placeholder="年龄">

          </el-input>
          <el-input v-model="input8" type="text" placeholder="国家" maxlength="20" show-word-limit></el-input>
          <el-input v-model="input9" type="text" placeholder="详细地址" maxlength="20" show-word-limit></el-input>
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
      text: '',//id
      input1: '',//用户名
      input2: '',//昵称
      input3: '',//登陆密码
      input4: '',//邮箱
      input5: '',//手机号
      input6: '',//年龄
      input7: '',//国家
      input8: '',///详细地址
      input9: '',//权限
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
  margin-top: -30px;
  margin-left: 600px;
}
.block {
  margin-left: 25px;
  font-weight: bold;
}

</style>

