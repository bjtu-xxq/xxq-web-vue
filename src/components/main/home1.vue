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
          style="margin-left: 0%"
          @select="handleSelect"
          @open="handleOpen"
          @close="handleClose"
          router>
          <el-submenu index="1">
            <template slot="title"><i class= "el-icon-s-management"></i><span>系统管理</span></template>
            <el-menu-item-group>
              <el-menu-item index="/home1">用户列表</el-menu-item>
              <el-menu-item index="/businessList">商家列表</el-menu-item>
              <el-menu-item index="/storeList">店铺列表</el-menu-item>
            </el-menu-item-group>
          </el-submenu>
          <el-menu-item index="/applyCheck">
            <i class="el-icon-s-check"></i>
            <span slot="title">图表</span>
          </el-menu-item>
        </el-menu>
      </el-aside>

      <el-main>
        <div>
        <el-card class="box-card" style="width: 100%; height: 99%">
          <el-table :data="userInfo" style="width: 100%" height="250">
            <el-table-column prop="name" label="昵称" show-overflow-tooltip>
              <template slot-scope="scope">{{ scope.row.name }}</template>
            </el-table-column>

            <el-table-column prop="identity" label="身份" width="100">
              <template slot-scope="scope">{{ scope.row.identity }}</template>
            </el-table-column>

            <el-table-column prop="phone" label="手机号" width="200">
              <template slot-scope="scope">{{ scope.row.phone }}</template>
            </el-table-column>

            <el-table-column prop="postcode" label="邮编" width="120">
              <template slot-scope="scope">{{ scope.row.postcode }}</template>
            </el-table-column>

            <el-table-column prop="address" label="地址" show-overflow-tooltip>
              <template slot-scope="scope">{{ scope.row.address }}</template>
            </el-table-column>

            <el-table-column
              prop="operation">
              <template slot-scope="scope">
                <el-button size="small" type="danger" plain @click="">注销</el-button>
                <el-button size="small" type="primary" plain @click="userquanxianDialog = true">权限</el-button>
              </template>
            </el-table-column>
          </el-table>
          <div>
            <el-dialog title="权限详情" :visible.sync="userquanxianDialog">
              <el-card>
                <div>
                  <el-form :label-position="labelPosition" label-width="80px" :model="userquanxianDialog">
                    <div class="selected"><br>　　<select v-model="selected">
                      　　<option>--请选择--</option>
                      　　<option v-for="name in optList">{{name}}</option>
                      　　</select><br></div>
                  </el-form>
                  <div slot="footer" class="dialog-footer">
                    <el-button type="primary" style="width: 30%" @click="userquanxianDialog = false">确 定</el-button>
                    <el-button style="width: 30%; margin-left: 20%" @click="userquanxianDialog = false">关 闭</el-button>
                  </div>
                </div>
              </el-card>
            </el-dialog>
          </div>

        </el-card>
        </div>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
export default {
  name: "AdminMain",

  data() {
    return {
      userquanxianDialog: false,
      labelPosition: 'left',

      userInfo: [
        {
          name: '滴滴滴',
          identity: '普通用户',
          phone: '18810760681',
          postcode: '136121',
          address: '吉林省',
        }
      ],
      optList: ['管理员','用户','云店铺管理员'],
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
    }
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
.selected{
  color: #fff;
  background-color: rgba(1,1,1,0.5);
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
