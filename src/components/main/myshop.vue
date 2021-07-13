<template>
  <div>
    <div>
      <el-menu :default-active="$route.path" class="el-menu-demo" mode="horizontal" @select="handleSelect" router>

        <el-menu-item index="/myshop" @click="storeManage()">店铺管理</el-menu-item>
        <el-menu-item @click="storeInfoSetting()">店铺信息</el-menu-item>
        <el-menu-item  @click="addStoreDialog = true">店铺申请</el-menu-item>
        <el-menu-item @click="assistantNoPass()">申请通知</el-menu-item>

        <el-submenu index="5">
          <template slot="title">我的店铺</template>
        </el-submenu>
      </el-menu>
    </div>
    <div style="margin-top: 2px">
      <el-tabs v-model="activeName" type="border-card" @tab-click="handleClick()">
        <el-tab-pane label="图书管理" name="first">

            <div>
              <el-table :data="booksList" style="width: 100%" height="70%">
                <el-table-column prop="picture" label="商品" width="100">
                  <template slot-scope="scope">
                    <img :src="scope.row.picture" class="cover">
                  </template>
                </el-table-column>

                <el-table-column prop="name" width="400">
                  <template slot-scope="scope">{{ scope.row.name }}</template>
                </el-table-column>

                <el-table-column prop="category" label="类别" width="120">
                  <template slot-scope="scope">{{ scope.row.category }}</template>
                </el-table-column>

                <el-table-column prop="author" label="作者" width="120">
                  <template slot-scope="scope">{{ scope.row.author }}</template>
                </el-table-column>

                <el-table-column prop="number" label="单价" show-overflow-tooltip>
                  <template slot-scope="scope">{{ scope.row.price }}</template>
                </el-table-column>

                <el-table-column
                  prop="operation">
                  <template slot-scope="scope">
                    <el-button size="medium" type="primary" plain @click="moreInfo(scope.row.id)">详情</el-button>
                    <el-button style="margin-left: 10%" size="medium" type="danger" plain @click="deleteBook(scope.row.id,scope.row.storeId)">下架</el-button>
                  </template>
                </el-table-column>
              </el-table>

              <div>
                <el-dialog title="书籍详情" :visible.sync="bookDialog" :model="bookInfo">
                  <el-card>
                    <div>
                      <el-form :label-position="labelPosition" label-width="80px">
                        <el-form-item label="书籍名称">
                          <el-input v-model="bookInfo.name" autocomplete="off" style="width: 450px"></el-input>
                        </el-form-item>

                        <el-form-item label="作者姓名">
                          <el-input v-model="bookInfo.author" autocomplete="off" style="width: 450px"></el-input>
                        </el-form-item>

                        <el-form-item label="出版社名">
                          <el-input v-model="bookInfo.publishingHouse" autocomplete="off" style="width: 450px"></el-input>
                        </el-form-item>

                        <el-form-item label="出版日期">
                          <el-date-picker
                            value-format="yyyy-MM-dd"
                            v-model="bookInfo.publishingDate"
                            type="date"
                            style="width: 450px">
                          </el-date-picker>
                        </el-form-item>

                        <el-form-item label="书籍单价">
                          <el-input v-model="bookInfo.price" autocomplete="off" style="width: 450px"></el-input>
                        </el-form-item>

                        <el-form-item label="书籍类别">
                          <el-select v-model="bookInfo.category" style="width: 450px">
                            <el-option
                              v-for="item in options"
                              :key="item.value"
                              :label="item.label"
                              :value="item.value">
                            </el-option>
                          </el-select>
                        </el-form-item>

                        <el-form-item label="书籍简介">
                          <el-input v-model="bookInfo.introduction" autocomplete="off" type="textarea" :rows="6" style="width: 450px"></el-input>
                        </el-form-item>
                      </el-form>

                      <div slot="footer" class="dialog-footer">
                        <el-button type="primary" style="width: 30%" @click="updateBook(bookInfo.id)">修 改</el-button>
                        <el-button style="width: 30%; margin-left: 20%" @click="bookDialog = false">取 消</el-button>
                      </div>
                    </div>
                  </el-card>
                </el-dialog>
              </div>
            </div>
          <el-button size="medium" type="primary" plain @click="newBookDialog = true">上架图书</el-button>
        </el-tab-pane>

        <el-tab-pane label="用户订单" name="second">
          <el-table :data="orderList" style="width: 100%" height="250">
            <el-table-column prop="picture" label="商品" width="120">
              <template slot-scope="scope">
                <img :src="orderList.picPath" class="cover">
              </template>
            </el-table-column>

            <el-table-column
              prop="name"
              width="300">
              <template slot-scope="scope">{{ orderList.name }}</template>
            </el-table-column>

            <el-table-column prop="price" label="单价" width="80">
              <template slot-scope="scope">{{ orderList.price }}</template>
            </el-table-column>

            <el-table-column prop="user" label="用户" width="200">
              <template slot-scope="scope">{{ orderList.username }}</template>
            </el-table-column>

            <el-table-column prop="number" label="数量" show-overflow-tooltip>
              <template slot-scope="scope">
                <el-input-number v-model="num" size="small" :min="1" :disabled="true">{{orderList.number }}</el-input-number>
              </template>
            </el-table-column>

            <el-table-column prop="total" label="金额" width="120">
              <template slot-scope="scope">{{ orderList.totalPrice }}</template>
            </el-table-column>

            <el-table-column
              prop="operation">
              <template slot-scope="scope">
                <el-button size="medium" type="primary" plain @click="orderMoreInfo(orderList.id)">详情</el-button>
                    </template>
            </el-table-column>
          </el-table>
        </el-tab-pane>

<!--        <el-tab-pane label="上架图书" @click="newBookDialog = true"  name="third" >-->
<!--        -->
<!--        </el-tab-pane>-->


      </el-tabs>
    </div>

    <div>
      <el-dialog title="店铺申请" :visible.sync="addStoreDialog">
        <el-form :model="storeApply">
          <el-form-item label="店铺名称" >
            <el-input v-model="storeApply.storeName" autocomplete="off" style="width: 500px"></el-input>
          </el-form-item>

          <el-form-item label="店铺简介" >
            <el-input v-model="storeApply.introduction" type="textarea" :rows="5" autocomplete="off" style="width: 500px"></el-input>
          </el-form-item>
        </el-form>
        <div>
          <el-button style="width: 100px" type="primary" @click="addStoreDialog = false">申 请</el-button>
          <el-button style="width: 100px; margin-left: 20%" @click="addStoreDialog = false">取 消</el-button>
        </div>
      </el-dialog>
    </div>

    <div>
      <el-dialog title="新书上架" :visible.sync="newBookDialog">
        <el-card>
          <div>
            <el-form :label-position="labelPosition" label-width="80px" :model="newBookInfo">
              <el-form-item label="书籍图片">
                <div>
                  <el-upload action="#" list-type="picture-card" :auto-upload="false">
                    <i slot="default" class="el-icon-plus"></i>
                    <div slot="file" slot-scope="{file}">
                      <img class="el-upload-list__item-thumbnail cover" style="width: 100%;" :src="file.url" alt="">
                    </div>
                  </el-upload>
                </div>
              </el-form-item>

              <el-form-item label="书籍名称">
                <el-input v-model="newBookInfo.name" autocomplete="off" style="width: 450px" placeholder="请输入书籍名称"></el-input>
              </el-form-item>

              <el-form-item label="作者姓名">
                <el-input v-model="newBookInfo.author" autocomplete="off" style="width: 450px" placeholder="请输入作者姓名"></el-input>
              </el-form-item>

              <el-form-item label="出版社名">
                <el-input v-model="newBookInfo.publishHouse" autocomplete="off" style="width: 450px" placeholder="请输入出版社名"></el-input>
              </el-form-item>

              <el-form-item label="出版日期">
                <el-date-picker
                  v-model="newBookInfo.publishDate"
                  type="date"
                  style="width: 450px"
                  placeholder="请选择出版日期日期">
                </el-date-picker>
              </el-form-item>

              <el-form-item label="书籍单价">
                <el-input v-model="newBookInfo.price" autocomplete="off" style="width: 450px" placeholder="请输入书籍单价"></el-input>
              </el-form-item>

              <el-form-item label="书籍类别">
                <el-select v-model="newBookInfo.category" style="width: 450px" placeholder="请选择书籍类别">
                  <el-option
                    v-for="item in options"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                  </el-option>
                </el-select>
              </el-form-item>

              <el-form-item label="书籍简介">
                <el-input v-model="newBookInfo.introduction" autocomplete="off" type="textarea" :rows="6" style="width: 450px" placeholder="请输入书籍简介"></el-input>
              </el-form-item>
            </el-form>

            <div slot="footer" class="dialog-footer">
              <el-button type="primary" style="width: 30%" @click="newBookDialog = false">确 定</el-button>
              <el-button style="width: 30%; margin-left: 20%" @click="newBookDialog = false">取 消</el-button>
            </div>
          </div>
        </el-card>
      </el-dialog>
    </div>

    <div>
      <el-dialog title="订单详情" :visible.sync="orderDialog">
        <el-card>
          <div>
            <el-dialog title="订单详情" :visible.sync="orderDialog">
              <el-card>
                <div>
                  <el-form :label-position="labelPosition" label-width="80px" :model="orderInfo">
                    <el-form-item label="书籍名称">
                      <el-input v-model="orderInfo.name" autocomplete="off" style="width: 450px" disabled></el-input>
                    </el-form-item>

                    <el-form-item label="书籍单价">
                      <el-input v-model="orderInfo.price" autocomplete="off" style="width: 450px" disabled></el-input>
                    </el-form-item>

                    <el-form-item label="购买数量">
                      <el-input v-model="orderInfo.number" autocomplete="off" style="width: 450px" disabled></el-input>
                    </el-form-item>

                    <el-form-item label="金额总计">
                      <el-input v-model="orderInfo.totalPrice" autocomplete="off" style="width: 450px" disabled></el-input>
                    </el-form-item>

                    <el-form-item label="用户昵称">
                      <el-input v-model="orderInfo.username" autocomplete="off" style="width: 450px" disabled></el-input>
                    </el-form-item>

                    <el-form-item label="用户地址">
                      <el-input v-model="orderInfo.address" autocomplete="off" style="width: 450px" disabled></el-input>
                    </el-form-item>

                    <el-form-item label="用户电话">
                      <el-input v-model="orderInfo.id" autocomplete="off" style="width: 450px" disabled></el-input>
                    </el-form-item>

                    <el-form-item label="订单时间">
                      <el-input v-model="orderInfo.placeDate" autocomplete="off" style="width: 450px" disabled></el-input>
                    </el-form-item>
                  </el-form>

                  <div slot="footer" class="dialog-footer">
                    <el-button type="primary" style="width: 30%" @click="orderDialog = false">确 定</el-button>
                    <el-button style="width: 30%; margin-left: 20%" @click="orderDialog = false">关 闭</el-button>
                  </div>
                </div>
              </el-card>
            </el-dialog>
          </div>
        </el-card>
      </el-dialog>
    </div>
  </div>
</template>

<script>
export default {
  name: "Store",
  inject: ['reload'],

  data() {
    return {
      input: '',
      activeName: 'first',
      num: 1,
      value: '',
      labelPosition: 'left',
      dialogImageUrl: '',

      addStoreDialog: false,
      newBookDialog: false,
      bookDialog: false,
      orderDialog: false,

      booksList: [
        {  picture:'1',
        name:'1',
        category:'1',
        author:'1',
        price:'1',}],

      bookInfo: {
        id: '',
        name: '三体',
        author: '刘慈欣',
        storeId: '',
        publishingHouse: '出版社',
        publishingDate: '2019-05-05',
        price: '￥60',
        category: '文学小说',
        introduction: '三体',
      },

      storeApply: {
        storeName: '1',
        introduction: '1',
      },

      newBookInfo: {
        name: '2',
        author: '2',
        storeId: '2',
        publishHouse: '2',
        publishDate: '2',
        category: '2',
        introduction: '2',
      },

      orderList: [
        {
          picture: '3',
          name: '3',
          price: '3',
          username: '3',
          number: '3',
          totalPrice: '3',
          state: '3'
        }
      ],

      orderInfo: {
        order: {
          id: '4',
          bookId: '4',
          userId: '4',
          number: '4',
          totalPrice: '4',
          placeDate: '4',
          state: '4',
        },

        user: {
          id: '5',
          username: '5',
          password: '5',
          address: '5',
          role: '5',
        },

        book: {
          id: '6',
          storeId: '6',
          name: '6',
          author: '6',
          publishingHouse: '6',
          price: '6',
          category: '6',
          introduction: '6',
          picPath: '6',
        },

        store: {
          id: '7',
          name: '7',
          phone: '7',
          address: '7',
          introduction: '7'
        }
      },

      options: [
        {
          value: '文学小说',
          label: '文学小说'
        },

        {
          value: '人文社科',
          label: '人文社科',
        },

        {
          value: '经管励志',
          label: '经管励志'
        },

        {
          value: '少儿童书',
          label: '少儿童书'
        },

        {
          value: '教辅考试',
          label: '教辅考试'
        },

        {
          value: '科学技术',
          label: '科学技术'
        },

        {
          value: '生活娱乐',
          label: '生活娱乐'
        },

        {
          value: '艺术珍享',
          label: '艺术珍享'
        }],
    }
  },

  methods: {
    handleSelect(key, keyPath) {
      console.log(key, keyPath);
    },

    // handleClick(tab, event) {
    //   if(this.activeName === 'first') {
    //     this.storeManage();
    //   }else {
    //     alert("结果加载中，请稍候...");
    //     this.$axios  // 获取已支付和已发货的订单
    //       .post('/order/'+this.$cookies.id,this.$cookies)
    //       .then(successResponse => {
    //         if (successResponse.data.code === 200) {
    //           var data = successResponse.data.data;
    //           this.orderList = data;
    //         }else {
    //           alert(successResponse.data.message);
    //         }
    //       })
    //       .catch(failResponse => {
    //         alert("失败！");
    //       })
    //   }
    // },
    //
    // handleDelete(index, row) {
    //   console.log(index, row);
    // },
    //
    // orderManage() {
    //   this.$axios  // 获取未支付的订单
    //     .post('/order/userweizhifu', {
    //       userId: this.$session.get("key"), // 当前用户
    //     })
    //     .then(successResponse => {
    //       if (successResponse.data.code === 200) {
    //         var data = successResponse.data.data;
    //         this.$router.push({path: '/order', query: {unPayList: data}});
    //       }else {
    //         alert(successResponse.data.message);
    //       }
    //     })
    //     .catch(failResponse => {
    //       alert("失败！");
    //     })
    // },
    //
    // personalInfoSetting() {
    //   this.$axios
    //     .post('/entity', {
    //       id: this.$session.get("key"),
    //     })
    //     .then(successResponse => {
    //       if (successResponse.data.code === 200) {
    //         var data = successResponse.data.data;
    //         this.$router.push({path: '/personalSetting', query: {personalInfo: data}});
    //       }else {
    //         alert(successResponse.data.message);
    //       }
    //     })
    //     .catch(failResponse => {
    //       alert('失败！');
    //     })
    // },
    //
    // storeManage() {
    //   this.$axios  // 获取图书
    //     .post('/store/allbooks', {
    //       phone: this.$session.get("key"), // 当前用户
    //     })
    //     .then(successResponse => {
    //       if (successResponse.data.code === 200) {
    //         alert(successResponse.data.message);
    //         var data = successResponse.data.data;
    //         this.reload();
    //        this.$router.push({path: '/store', query: {booksList: data}});
    //       }else {
    //         alert(successResponse.data.message);
    //       }
    //     })
    //     .catch(failResponse => {
    //       alert("失败！");
    //     })
    // },
    //
    // storeInfoSetting() {
    //   this.$axios
    //     .post('/store/info', {
    //       phone: this.$session.get("key"),
    //     })
    //     .then(successResponse => {
    //       if (successResponse.data.code === 200) {
    //         if((successResponse.data.message === "普通用户")) {
    //           alert('无权限！');
    //         }else {
    //           var data = successResponse.data.data;
    //           this.$router.push({path: '/StoreInfo'});
    //           //, query: {storeInfo: data}
    //         }
    //       }else {
    //         alert("查看失败，请重试！");
    //       }
    //     })
    //     .catch(failResponse => {
    //       alert('失败！');
    //     })
    // },
    //
    // assistantNoPass() {
    //   this.$axios  // 获取待审核的助理列表
    //     .post('/store/all_assistant_application', {
    //       phone: this.$session.get("key"), // 当前用户
    //     })
    //     .then(successResponse => {
    //       if (successResponse.data.code === 200) {
    //         if((successResponse.data.message === "普通用户") || (successResponse.data.message === "商家助理")) {
    //           alert('无权限！');
    //         }else {
    //           var data = successResponse.data.data;
    //           this.$router.push({path: '/assistantApply', query: {notPass: data}});
    //         }
    //       }else {
    //         alert(successResponse.data.message);
    //       }
    //     })
    //     .catch(failResponse => {
    //       alert("失败！");
    //     })
    // },
    //
     moreInfo(id) {
    //   this.$axios // 书籍详情
    //     .post('/book/info', {
    //       id: id, // 查询书籍
    //     })
    //     .then(successResponse => {
    //       if (successResponse.data.code === 200) {
    //         this.bookInfo = successResponse.data.data;
           this.bookDialog = true;
    //       }else {
    //         alert(successResponse.data.message);
    //       }
    //     })
    //     .catch(failResponse => {
    //       alert("失败！");
    //     })
     },
    //
    // updateBook(id) {
    //   this.$axios
    //     .post('book/update', {
    //       id: id,
    //       name: this.bookInfo.name,
    //       author: this.bookInfo.author,
    //       publishingHouse: this.bookInfo.publishingHouse,
    //       publishingDate: this.bookInfo.publishingDate,
    //       price: this.bookInfo.price,
    //       category: this.bookInfo.category,
    //       introduction: this.bookInfo.introduction,
    //     })
    //     .then(successResponse => {
    //       if (successResponse.data.code === 200) {
    //         alert(successResponse.data.message);
    //         var data = successResponse.data.data;
    //         this.reload();
    //         this.$router.push({path: '/myshop'});//, query: {booksList: data}
    //         this.bookDialog = false;
    //       }
    //     })
    //     .catch(failResponse => {
    //       alert('失败！');
    //     })
    // },
    //
    // deleteBook(id) {
    //   this.$axios
    //     .post('/book/delete', {
    //       id: id, // 删除书籍编号
    //     })
    //     .then(successResponse => {
    //       if (successResponse.data.code === 200) {
    //         alert(successResponse.data.message);
    //         var data = successResponse.data.data;
    //         this.reload();
    //         this.$router.push({path: '/store', query: {booksList: data}});
    //       }else {
    //         alert(successResponse.data.message);
    //       }
    //     })
    //     .catch(failResponse => {
    //       alert("失败！");
    //     })
    // },
    //
    orderMoreInfo(id) {
      // this.$axios // 订单详情
      //   .post('order/info', {
      //     phone: this.$session.get("key"), // 当前用户
      //     id: id, // 查询订单编号
      //   })
      //   .then(successResponse => {
      //     if (successResponse.data.code === 200) {
      //       this.orderInfo = successResponse.data.data;
             this.orderDialog = true;
      //     }else {
      //       alert(successResponse.data.message);
      //     }
      //   })
      //   .catch(failResponse => {
      //     alert("失败！");
      //   })
    }
    //
    // sendBook(id) {
    //   this.$axios
    //     .post('/order/send', {
    //       id: id, // 订单编号
    //     })
    //     .then(successResponse => {
    //       if (successResponse.data.code === 200) {
    //         alert(successResponse.data.message); // 已发货
    //         var data = successResponse.data.data; // 重新加载订单
    //         this.reload();
    //         this.orderList = data;
    //       }
    //     })
    //     .catch(failResponse => {
    //       alert('失败！');
    //     })
    // }
  },

  // mounted() {
  //   this.booksList = this.$route.query.booksList;
  // }
}
</script>

<style scoped>
.cover {
  width: 100px;
  height: 150px;
  margin-top: 2px;
  overflow: hidden;
  cursor: pointer;
}
</style>
