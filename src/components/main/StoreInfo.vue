<template>
  <div>
    <div>
      <el-menu :default-active="$route.path" class="el-menu-demo" mode="horizontal" @select="handleSelect" router>

        <el-menu-item index="/myshop" @click="storeManage()">店铺管理</el-menu-item>
        <el-menu-item @click="storeInfoSetting()">店铺信息</el-menu-item>
        <el-menu-item @click="assistantNoPass()">申请通知</el-menu-item>
        <el-submenu index="5">
          <template slot="title">我的店铺</template>

        </el-submenu>
      </el-menu>



    </div>
    <div style="margin-top: 2px">
      <el-tabs v-model="activeName" @tab-click="handleClick" type="border-card">
        <el-tab-pane label="基本信息" name="first">
          <div>

            <el-form-item label="店铺编号">
              <el-input v-model="storeInfo.id" style="width: 600px; margin-right: 45%" disabled></el-input>
            </el-form-item>

            <el-form :label-position="labelPosition" label-width="80px" :model="storeInfo">
              <el-form-item label="店铺名称">
                <el-input v-model="storeInfo.name" style="width: 600px; margin-right: 45%"></el-input>
              </el-form-item>

              <el-form-item label="联系方式">
                <el-input v-model="storeInfo.phone" style="width: 600px; margin-right: 45%"></el-input>
              </el-form-item>

              <el-form-item label="店铺地址">
                <el-input v-model="storeInfo.address" style="width: 600px; margin-right: 45%"></el-input>
              </el-form-item>

              <el-form-item label="店铺简介">
                <el-input v-model="storeInfo.introduction" type="textarea" :rows="5" style="width: 600px; margin-right: 45%"></el-input>
              </el-form-item>

              <el-form-item>
                <el-button type="success" plain style="width: 200px; margin-right: 10%" @click="infoUpdate()">确定修改</el-button>
              </el-form-item>
            </el-form>
          </div>
        </el-tab-pane>
      </el-tabs>
    </div>
  </div>

</template>

<script>
  export default {
    name: "StoreInfo",
    inject: ['reload'],

    data() {
      return {
        input: '',
        activeName: 'first',
        labelPosition: 'right',
        addStoreDialog: false,
        storeInfo: {},

        storePassword: {
          oldPassword: '',
          newPassword: '',
        },
        storeApply: {
          storeName: '1',
          introduction: '1',
        },
      }
    },

    methods: {
      handleSelect(key, keyPath) {
        console.log(key, keyPath);
      },

      handleClick(tab, event) {
        console.log(tab, event);
      },

      showMain() {
        this.$axios
          .post('/book/renwensheke', {
            id: this.$session.get("key"),
          })
          .then(successResponse => {
            if (successResponse.data.code === 200) {
              var data = successResponse.data.data;
              this.$router.push({path: '/main', query: {mainList: data}});
            }
          })
          .catch(failResponse => {
            alert("失败！");
          })
      },

      shopCart() {
        this.$axios
          .post('/cart/all', {
            id: this.$session.get("key"),
          })
          .then(successResponse => {
            if (successResponse.data.code === 200) {
              var data = successResponse.data.data;
              this.$router.push({path: '/shopCart', query: {cartList: data}});
            }else {
              alert(successResponse.data.message);
            }
          })
          .catch(failResponse => {
            alert('失败！');
          })
      },

      orderManage() {
        this.$axios  // 获取未支付的订单
          .post('/order/userweizhifu', {
            userId: this.$session.get("key"), // 当前用户
          })
          .then(successResponse => {
            if (successResponse.data.code === 200) {
              var data = successResponse.data.data;
              this.$router.push({path: '/order', query: {unPayList: data}});
            }else {
              alert(successResponse.data.message);
            }
          })
          .catch(failResponse => {
            alert("失败！");
          })
      },

      personalInfoSetting() {
        this.$axios
          .post('/entity', {
            id: this.$session.get("key"),
          })
          .then(successResponse => {
            if (successResponse.data.code === 200) {
              var data = successResponse.data.data;
              this.$router.push({path: '/personalSetting', query: {personalInfo: data}});
            }else {
              alert(successResponse.data.message);
            }
          })
          .catch(failResponse => {
            alert('失败！');
          })
      },

      storeManage() {
        this.$axios
          .post('/store/allbooks', {
            phone: this.$session.get("key"),
          })
          .then(successResponse => {
            if (successResponse.data.code === 200) {
              if(successResponse.data.message === "普通用户") {
                alert('无权限！');
              }else {
                var data = successResponse.data.data;
                this.$router.push({path: '/store', query: {booksList: data}});
              }
            }else {
              alert(successResponse.data.message);
            }
          })
          .catch(failResponse => {
            alert('失败！');
          })
      },

      storeInfoSetting() {
        this.$axios
          .post('/store/info', {
            phone: this.$session.get("key"),
          })
          .then(successResponse => {
            if (successResponse.data.code === 200) {
              if((successResponse.data.message === "普通用户")) {
                alert('无权限！');
              }else {
                var data = successResponse.data.data;
                this.$router.push({path: '/storeInfo', query: {storeInfo: data}});
              }
            }else {
              alert("查看失败，请重试！");
            }
          })
          .catch(failResponse => {
            alert('失败！');
          })
      },

      assistantNoPass() {
        this.$axios  // 获取待审核的助理列表
          .post('/store/all_assistant_application', {
            phone: this.$session.get("key"), // 当前用户
          })
          .then(successResponse => {
            if (successResponse.data.code === 200) {
              if((successResponse.data.message === "普通用户") || (successResponse.data.message === "商家助理")) {
                alert('无权限！');
              }else {
                alert(successResponse.data.message);
                var data = successResponse.data.data;
                this.$router.push({path: '/assistantApply', query: {notPass: data}});
              }
            }else {
              alert(successResponse.data.message);
            }
          })
          .catch(failResponse => {
            alert("失败！");
          })
      },

      infoUpdate() {
        // this.$axios
        //   .post('/store/update', {
        //     phone: this.storeInfo.phone,
        //     id: this.storeInfo.id,
        //     name: this.storeInfo.name,
        //     address: this.storeInfo.address,
        //     introduction: this.storeInfo.introduction,
        //   })
        //   .then(successResponse => {
        //     if (successResponse.data.code === 200) {
        //       alert("修改成功！");
        //       var data = successResponse.data.data;
              this.$router.push({path: '/myshop'});
              //, query: {storeInfo: data}
      //       }
      //       else{
      //         alert(successResponse.data.message);
      //       }
      //     })
      //     .catch(failResponse => {
      //       alert('失败！');
      //     })
       },
    },

    mounted() {
      this.storeInfo = this.$route.query.storeInfo;

    }
  }
</script>

<style scoped>

</style>
