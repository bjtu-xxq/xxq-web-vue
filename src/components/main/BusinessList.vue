<template>
  <el-container style="height: 590px; border: 1px solid #eee">
    <el-header style="text-align: left; font-size: 12px; height: 15%">
      <h1 class="main_title">饮茶先后台管理系统</h1>
    </el-header>
    <el-container>
      <el-aside style="background-color: rgb(238, 241, 246); width: 200px; height: 100%">
        <el-menu
          :default-active="$route.path"
          class="el-menu-vertical-demo"
          style="margin-left: 0"
          @select="handleSelect"
          @open="handleOpen"
          @close="handleClose"
          router>
          <el-submenu index="1">
            <template slot="title">
              <i class= "el-icon-s-management"></i>
              <span>系统管理</span>
            </template>
            <el-menu-item-group>
<!--              <el-menu-item @click="userFunction()">用户列表</el-menu-item>-->
<!--              <el-menu-item index="/BusinessList" @click="businessFunction()">商家列表</el-menu-item>-->
<!--              <el-menu-item @click="storeFunction()">店铺列表</el-menu-item>-->
              <el-menu-item index="/home1">用户列表</el-menu-item>
              <el-menu-item index="/businessList">商家列表</el-menu-item>
              <el-menu-item index="/storeList">店铺列表</el-menu-item>
            </el-menu-item-group>
          </el-submenu>
          <el-menu-item index="/ApplyCheck">
            <i class="el-icon-s-check"></i>
            <span slot="title">图标</span>
          </el-menu-item>
        </el-menu>
      </el-aside>
      <el-main>
        <el-card class="box-card" style="width: 100%; height: 99%">
          <el-table :data="businessInfo" style="width: 100%" height="100%">
            <el-table-column prop="name" label="昵称" show-overflow-tooltip>
              <template slot-scope="scope">{{ scope.row.name }}</template>
            </el-table-column>

            <el-table-column prop="state" label="状态" width="50px">
              <template slot-scope="scope">{{ scope.row.state }}</template>
            </el-table-column>

            <el-table-column prop="phone" label="手机号" show-overflow-tooltip>
              <template slot-scope="scope">{{ scope.row.phone }}</template>
            </el-table-column>

            <el-table-column prop="storeName" label="店铺名" show-overflow-tooltip>
              <template slot-scope="scope">{{ scope.row.storeName }}</template>
            </el-table-column>

            <el-table-column prop="address" label="地址"
              show-overflow-tooltip>
              <template slot-scope="scope">{{ scope.row.address }}</template>
            </el-table-column>

            <el-table-column
              prop="operation">
              <template slot-scope="scope">
                <el-button size="small" type="danger" plain @click="deleteBusiness(scope.row.phone)">注销</el-button>
              </template>
            </el-table-column>
          </el-table>
        </el-card>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
import axios from "axios";
  export default {
    name: "BusinessList",
    inject: ['reload'],

    data() {
      return {
        businessInfo: [
          {
            name:  '卢本伟',
            state: '失联',
            phone: '37000000',
            storeName:'我没有开挂',
            address: '卢本伟广场'
          }
        ],
      }
    },

    methods: {

      handleSelect(key, keyPath) {
        console.log(key, keyPath);
      },

      handleOpen(key, keyPath) {
        console.log(key, keyPath);
      },

      handleClose(key, keyPath) {
        console.log(key, keyPath);
      },

      userFunction() {
        axios.post('/user/all') // 请求用户列表
          .then(successResponse => {
            if (successResponse.data.code === 200) {
              var data = successResponse.data.data;
              this.$router.push({path: '/adminMain', query: {userList: data}});
            }else {
              alert(successResponse.data.message);
            }
          })
          .catch(failResponse => {

          })
      },

      businessFunction() {
        this.$axios
          .post('/business/all') // 请求商家列表
          .then(successResponse => {
            if (successResponse.data.code === 200) {
              var data = successResponse.data.data;
              this.businessInfo = data;
            }else {
              alert(successResponse.data.message);
            }
          })
          .catch(failResponse => {

          })
      },

      storeFunction() {
        this.$axios
          .post('/store/all') // 请求店铺列表
          .then(successResponse => {
            if (successResponse.data.code === 200) {
              var data = successResponse.data.data;
              this.$router.push({path: '/storeList', query: {storeList: data}});
            }else {
              alert(successResponse.data.message);
            }
          })
          .catch(failResponse => {
          })
      },
      checkFunction() {
        this.$axios
          .post('/business/applied') // 请求申请列表
          .then(successResponse => {
            if (successResponse.data.code === 200) {
              var data = successResponse.data.data;
              this.$router.push({path: '/applyCheck', query: {applyList: data}});
            }else {
              alert(successResponse.data.message);
            }
          })
          .catch(failResponse => {

          })
      },

      deleteBusiness(phone) {
        alert(phone)
        this.$axios
          .post('/store/'+id, {
            phone: phone,
          })
          .then(successResponse => {
            if (successResponse.data.code === 200) {
              alert(successResponse.data.message);
              var data = successResponse.data.data
              this.reload()
              this.$router.push({path: '/businessList', query: {businessList: data}});
            }else {
              alert(successResponse.data.message);
            }
          })
          .catch(failResponse => {

          })
      }
    },

    mounted: function () {
      this.businessInfo = this.$route.query.businessList
    },
  }
</script>

<style scoped>
  .el-header {
    background-color: #B3C0D1;
    color: #333;
    line-height: 60px;
  }

  .el-aside {
    color: #333;
  }

  .main_title {
    color: #505458;
  }

  .text {
    font-size: 14px;
  }

  .item {
    padding: 18px 0;
  }

  .box-card {
    width: 480px;
  }
</style>
