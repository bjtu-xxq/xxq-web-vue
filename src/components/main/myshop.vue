<template>
  <div>
    <div>
      <el-menu :default-active="$route.path" class="el-menu-demo" mode="horizontal" @select="handleSelect" router>

        <el-menu-item index="/myshop" @click="storeManage()">店铺管理</el-menu-item>
        <el-menu-item @click="openstoreInfo()">店铺信息</el-menu-item>
<!--        storeInfoSetting()-->
        <el-menu-item  @click="addStoreDialog = true">店铺申请</el-menu-item>
      </el-menu>
    </div>
    <div style="margin-top: 2px">
      <el-tabs v-model="activeName" type="border-card" @tab-click="handleClick()">
        <el-tab-pane label="图书管理" name="first">

            <div>
              <el-table :data="booksList" style="width: 100%" height="70%">
                <el-table-column  label="商品" width="100">
                  <template slot-scope="scope"><img :src="scope.row.imageUrl" class="cover"></template>
                </el-table-column>
                <el-table-column  label="名称" width="400">
                  <template slot-scope="scope">{{ scope.row.name }}</template>
                </el-table-column>

                <el-table-column label="类别" width="120">
                  <template slot-scope="scope">{{ scope.row.cname }}</template>
                </el-table-column>

                <el-table-column  label="作者" width="120">
                  <template slot-scope="scope">{{ scope.row.author }}</template>
                </el-table-column>

                <el-table-column label="单价" show-overflow-tooltip>
                  <template slot-scope="scope">{{ scope.row.price }}</template>
                </el-table-column>
                <el-table-column prop="operation"><template slot-scope="scope">
                    <el-button size="medium" type="primary" plain @click="moreInfo(scope.row.bookId)">详情</el-button>
                    <el-button style="margin-left: 10%" size="medium" type="danger" plain @click="deleteBook(scope.row.bookId)">下架</el-button>
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
                        <el-form-item label="书籍单价">
                          <el-input v-model="bookInfo.price" autocomplete="off" style="width: 450px"></el-input>
                        </el-form-item>
                        <el-form-item label="书籍类别">
                          <el-select v-model="bookInfo.category" style="width: 450px">
                            <el-option
                              v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
                            </el-option>
                          </el-select>
                        </el-form-item>
                      </el-form>
                      <div slot="footer" class="dialog-footer">
                        <el-button type="primary" style="width: 30%" @click="updateBook(bookInfo.bookId)">修 改</el-button>
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
                <img :src="scope.row.imageUrl" class="cover">
              </template>
            </el-table-column>

            <el-table-column prop="name"  label="商品名" width="300">
              <template slot-scope="scope">{{ scope.row.bookName }}</template>
            </el-table-column>

            <el-table-column prop="price" label="单价" width="80">
              <template slot-scope="scope">{{ scope.row.price }}</template>
            </el-table-column>

            <el-table-column prop="user" label="用户" width="200">
              <template slot-scope="scope">{{ scope.row.userId }}</template>
            </el-table-column>

            <el-table-column prop="number" label="数量" show-overflow-tooltip>
              <template slot-scope="scope">
                <el-input-number v-model="num" size="small" :min="1" :disabled="true">{{scope.row.orderMount }}</el-input-number>
              </template>
            </el-table-column>

            <el-table-column prop="total" label="金额" width="120">
              <template slot-scope="scope">{{ scope.row.orderMount * scope.row.price  }}</template>
            </el-table-column>

            <el-table-column
              prop="operation">
              <template slot-scope="scope">
                <el-button size="medium" type="primary" plain @click="orderMoreInfo(scope.row.orderId)">详情</el-button>
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
          <el-form-item label="手机号码" >
            <el-input v-model="storeApply.phone" autocomplete="off" style="width: 500px"></el-input>
          </el-form-item>
          <el-form-item label="店铺地址" >
            <el-input v-model="storeApply.position" autocomplete="off" style="width: 500px"></el-input>
          </el-form-item>
          <el-form-item label="店铺简介" >
            <el-input v-model="storeApply.introduction" type="textarea" :rows="5" autocomplete="off" style="width: 500px"></el-input>
          </el-form-item>
        </el-form>
        <div>
          <el-button style="width: 100px" type="primary" @click="addstore(storeApply)">申 请</el-button>
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
            </el-form>
            <div slot="footer" class="dialog-footer">
              <el-button type="primary" style="width: 30%" @click="save()">确 定</el-button>
              <el-button style="width: 30%; margin-left: 20%" @click="newBookDialog = false">取 消</el-button>
            </div>
          </div>
        </el-card>
      </el-dialog>
    </div>
      <div>
        <el-dialog title="店铺详情":visible.sync="storeInfoDialog">
          <el-card>
            <div>
              <el-form :label-position="labelPosition" label-width="80px" :model="storeInfo">
                <el-form-item label="店铺名称">
                  <el-input v-model="storeInfo.name" style="width: 600px; margin-right: 45%"></el-input>
                </el-form-item>

                <el-form-item label="联系方式">
                  <el-input v-model="storeInfo.phone" style="width: 600px; margin-right: 45%"></el-input>
                </el-form-item>

                <el-form-item label="店铺地址">
                  <el-input v-model="storeInfo.position" style="width: 600px; margin-right: 45%"></el-input>
                </el-form-item>

                <el-form-item label="店铺简介">
                  <el-input v-model="storeInfo.introduction" type="textarea" :rows="5" style="width: 600px; margin-right: 45%"></el-input>
                </el-form-item>

                <el-form-item>
                  <el-button type="success" plain style="width: 200px; margin-right: 10%" @click="infoUpdate()">确定修改</el-button>
                </el-form-item>
              </el-form>
            </div>
          </el-card>
        </el-dialog>
      </div>
    <div>
            <el-dialog title="订单详情" :visible.sync="orderDialog">
              <el-card>
                <div>
                  <el-form :label-position="labelPosition" label-width="80px" :model="orderInfo">
                    <el-form-item label="书籍名称">
                      <el-input v-model="orderInfo.bookName" autocomplete="off" style="width: 450px" disabled></el-input>
                    </el-form-item>

                    <el-form-item label="书籍单价">
                      <el-input v-model="orderInfo.price" autocomplete="off" style="width: 450px" disabled></el-input>
                    </el-form-item>

                    <el-form-item label="购买数量">
                      <el-input v-model="orderInfo.orderMount" autocomplete="off" style="width: 450px" disabled></el-input>
                    </el-form-item>

                    <el-form-item label="金额总计">
                      <el-input v-model="orderInfo.price" autocomplete="off" style="width: 450px" disabled></el-input>
                    </el-form-item>

                    <el-form-item label="用户昵称">
                      <el-input v-model="orderInfo.userId" autocomplete="off" style="width: 450px" disabled></el-input>
                    </el-form-item>
                    <el-form-item label="订单时间">
                      <el-input v-model="orderInfo.finished" autocomplete="off" style="width: 450px" disabled></el-input>
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
  </div>
</template>

<script>

import bookInfo from './bookInfo'
import axios from "axios";

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
      storeId: '',
      addStoreDialog: false,
      newBookDialog: false,
      bookDialog: false,
      orderDialog: false,
      storeInfoDialog: false,
      booksList: [],

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
      storeInfo: [],
      options: [
        {
          value: '1',
          label: '哲学宗教类'
        },

        {
          value: '2',
          label: '科学类',
        },

        {
          value: '3',
          label: '政治法律类'
        },

        {
          value: '4',
          label: '军事类'
        },

        {
          value: '5',
          label: '文化教育体育类'
        },

        {
          value: '6',
          label: '历史类'
        },

        {
          value: '7',
          label: '医学卫生类'
        },

        {
          value: '8',
          label: '数学类'
        },
        {
          value: '9',
          label: '物理类'
        },
        {
          value: '10',
          label: '计算机类'
        },
        {
          value: '11',
          label: '小说类'
        },
        {
          value: '12',
          label: '漫画类'
        }

        ],
    }
  },

  methods: {
    handleSelect(key, keyPath) {
      console.log(key, keyPath);
    },
    creat(){
      this.storeManage();

    },

    addstore(e){
      axios.post('/api/store/',{
            name:e.storeName,
            phone:e.phone,
            position:e.address,
        introduction:e.introduction
      }).then(res =>{
        console.log(e)
        console.log(res.data)
        if(res.data.status=='success'){
          console.log(res.data)
          this.$message({showClose:false,message:'申请成功',type: 'success', center: true});
          this.addStoreDialog = false
        }
        else{
          this.$message({showClose:false,message:res.data.msg,type: 'error', center: true});
          this.addStoreDialog = false
        }
      })
    },
  handleClick(tab, event) {
      if(this.activeName === 'first') {
        this.storeManage();
      }else {
       axios.get('/api/order/store/list')
          .then(successResponse => {
            console.log(successResponse.data)
            if(successResponse.data.status=='success'){

              this.$message({showClose:false ,message:'打开成功',type:'success',center:true});
              var data = successResponse.data.result.list;
              this.orderList = data;
            }
          })
      }
    },
    handleDelete(index, row) {
      console.log(index, row);
    },
    openstoreInfo(){
      axios.get('/api/store/manager/').then(res =>{
        console.log(res.data)
        this.storeInfo=res.data.result
        this.storeInfoDialog= true
        if (res.data.status=='success'){
          this.storeId=res.data.result.storeId;
        }
      })
    },
    infoUpdate() {
        axios.put('/api/store', {
          phone: this.storeInfo.phone,
          storeId:  this.storeId,
          name: this.storeInfo.name,
          position: this.storeInfo.position,
          introduction: this.storeInfo.introduction,
        }).then(successResponse => {
            console.log(successResponse.data)
            if (successResponse.data.status=== 'success') {
              alert("修改成功！");
              this.addStoreDialog=false;
              var data = successResponse.data.data;
              this.$router.push({path: '/myshop'});
              //, query: {storeInfo: data}
            }
            else{
              this.$message({showClose:false,message:successResponse.data.msg,type:'error',center:true});
            }
            this.addStoreDialog=false;
          })
          .catch(failResponse => {
          })

    },
    save(){
      axios.post('/api/book/',{
        name:this.newBookInfo.name,
        author:this.newBookInfo.author,
        cateId:this.newBookInfo.category,
        price:this.newBookInfo.price,
      }).then(res=>{
        console.log(this.newBookInfo)
        console.log(res.data)
        if(res.data.status=='error')
        {
          this.$message({showClose: false, message: res.data.msg, type: 'error', center: true});
        }
        else{
          this.$message({showClose: false, message: "添加成功", type: 'success', center: true});
        }
        // let bookinfo=res.data.result.list
      })
      this.newBookDialog = false
  },
    personalInfoSetting() {
      axios.post('/entity', {
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
        })
    },
    storeManage() {
      axios.get('/api/book/store/list/').then(successResponse => {
          console.log(successResponse.data.result.list)
            let data = successResponse.data.result.list;
          //this.bookInfo=data;
        this.reload();
           this.$router.push({path: '/myshop', query: {booksList: data}});
        }).catch(failResponse => {})
    },
     moreInfo(id) { // 书籍详情
       axios.get('/api/book/'+id, {
          bookId: id, // 查询书籍
        })
        .then(successResponse => {
          console.log(successResponse.data)
            this.bookInfo = successResponse.data.result;
           this.bookDialog = true;
        })
     },
    updateBook(id) {
    axios.put('/api/book/info/'+id, {
          bookId: id,
          name: this.bookInfo.name,
          author: this.bookInfo.author,
          price: this.bookInfo.price,
          cname:this.newBookInfo.category,
        })
        .then(successResponse => {
          console.log( successResponse.data)
            var data = successResponse.data.result;
            this.$router.push({path: '/myshop', query: {booksList: data}});
            this.bookDialog = false;
          })

    },

    deleteBook(id) {// 删除书籍编号
      axios.delete('/api/book/'+id, {
        bookId: id})
        .then(successResponse => {
          console.log(successResponse.data.result)
            var data = successResponse.data.result;
           // this.reload();
            this.$router.push({path: '/myshop', query: {booksList: data}});
        })
    },

    orderMoreInfo(id) {// 订单详情
      console.log(id)
      axios.get('/api/order/'+id, {
        orderId: id})
        .then(successResponse => {console.log(successResponse.data)
          this.orderInfo = successResponse.data.result;
             this.orderDialog = true;
        })
        .catch(failResponse => {
        })
    },

  },

  mounted() {
    this.booksList = this.$route.query.booksList;
  }
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
