<template>
  <el-container style="height: 590px; border: 1px solid #eee">
    <el-header style="text-align: left; font-size: 12px; height: 15%">

      <h1 class="main_title">饮茶先管理系统</h1>
    </el-header>

    <el-container>
      <el-aside style="background-color: rgb(238, 241, 246); width: 200px; height: 100%">
        <el-menu
          :default-active="$route.path"
          class="el-menu-vertical-demo"
          style="margin-left: 0%"
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
              <el-menu-item index="/home1">用户列表</el-menu-item>
              <el-menu-item index="/businessList">商家列表</el-menu-item>
              <el-menu-item index="/storeList">店铺列表</el-menu-item>
            </el-menu-item-group>
          </el-submenu>

          <el-menu-item index="/ApplyCheck">
            <i class="el-icon-s-check"></i>
            <span slot="title">申请审核</span>
          </el-menu-item>
        </el-menu>
      </el-aside>

      <el-main>
        <el-tabs type="border-card" style="width: 100%; height: 99%">
          <el-tab-pane label="待审批">
            <div>
              <el-table
                :data="waitPass"
                style="width: 100%"
                height="250">
                <el-table-column
                  prop="name"
                  label="用户昵称"
                  show-overflow-tooltip>
                  <template slot-scope="scope">{{ scope.row.name }}</template>
                </el-table-column>

                <el-table-column
                  prop="phone"
                  label="联系方式"
                  show-overflow-tooltip>
                  <template slot-scope="scope">{{ scope.row.phone }}</template>
                </el-table-column>

                <el-table-column
                  prop="price"
                  label="地址"
                  show-overflow-tooltip>
                  <template slot-scope="scope">{{ scope.row.address }}</template>
                </el-table-column>

                <el-table-column
                  prop="operation">
                  <template slot-scope="scope">
                    <el-button size="small" type="primary" plain @click="businessInfoDialog = true">详情</el-button>
                    <el-button size="small" type="success" pls1>通过</el-button>
                    <el-button size="small" type="danger" plain @click="handleDelete(scope.$index, scope.row)">拒绝</el-button>
                  </template>
                </el-table-column>
              </el-table>

              <div>
                <el-dialog title="申请详情" :visible.sync="businessInfoDialog">
            <el-card>
                    <div>
                      <el-form :label-position="labelPosition" label-width="80px" :model="businessInfo">
                        <el-form-item label="用户昵称">
                          <el-input v-model="businessInfo.name" autocomplete="off" style="width: 450px"></el-input>
                        </el-form-item>

                        <el-form-item label="联系方式">
                          <el-input v-model="businessInfo.phone" autocomplete="off" style="width: 450px"></el-input>
                        </el-form-item>

                        <el-form-item label="通讯地址">
                          <el-input v-model="businessInfo.address" autocomplete="off" style="width: 450px"></el-input>
                        </el-form-item>

                        <el-form-item label="店铺名称">
                          <el-input v-model="businessInfo.storeName" autocomplete="off" style="width: 450px"></el-input>
                        </el-form-item>

                        <el-form-item label="个人简介">
                          <el-input type="textarea" :rows="5" v-model="businessInfo.introduction"></el-input>
                        </el-form-item>
                      </el-form>

                      <div slot="footer" class="dialog-footer">
                        <el-button type="primary" style="width: 30%" @click="businessInfoDialog = false">确 定</el-button>
                        <el-button style="width: 30%; margin-left: 20%" @click="businessInfoDialog = false">关 闭</el-button>
                      </div>
                    </div>
                  </el-card>
                </el-dialog>
              </div>
            </div>
          </el-tab-pane>
        </el-tabs>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
  export default {
    name: "ApplyCheck",

    data() {
      return {
        businessInfoDialog: false,
        labelPosition: 'left',

        businessInfo: [
          {
            name: '哈尔的书屋',
            score: '3.5',
            phone: '18810760681',
            postcode: '136121',
            address: '吉林省',
          }
        ],

        waitPass: [
          {
            name: '哈尔的书屋',
            phone: '18810760681',
            address: '吉林省',
          }
        ]
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

      handleDelete(index, row) {
        console.log(index, row);
      },
    }

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
