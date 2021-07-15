<template>
  <div>

    <div style="margin-top: 2px">
      <el-tabs v-model="activeName" @tab-click="handleClick" type="border-card">
        <el-tab-pane label="未支付" name="first">
          <div>
            <el-table :data="unPayList" style="width: 100%" height="100%">
              <el-table-column label="商品" width="120">
                <template slot-scope="scope"><img :src="scope.row.imageUrl" class="cover"></template>
              </el-table-column>
              <el-table-column prop="bookName" show-overflow-tooltip>
              </el-table-column>
              <el-table-column prop="bookName" label="店铺名" show-overflow-tooltip>
              </el-table-column>
              <el-table-column prop="price" label="单价" width="100">
              </el-table-column>
              <el-table-column prop="orderMount" label="数量" show-overflow-tooltip>

              </el-table-column>
              <el-table-column label="金额" width="120"><template slot-scope="scope">￥{{ scope.row.orderMount * scope.row.price }}</template></el-table-column>
              <el-table-column prop="operation">
                <template slot-scope="scope">
                  <el-button size="small" type="success" plain @click="continuePay(scope.row.orderId)">继续支付</el-button>
                  <el-button size="small" type="danger" plain @click="deleteOrder(scope.row.orderId)">取消订单</el-button>
                </template>
              </el-table-column>
            </el-table>
            <div>
              <el-dialog title="付款提示" :visible.sync="payDialog" width="20%"><span class="text">￥{{this.totalPrice}}</span>
                <span slot="footer" class="dialog-footer">
                    <el-button size="small" type="success" plain @click="pay('sure')">确认支付</el-button>
                    <el-button size="small" type="danger" plain @click="pay('giveUp')">放弃支付</el-button>
                  </span>
              </el-dialog>
            </div>
          </div>
        </el-tab-pane>

        <el-tab-pane label="已支付" name="second" v-if="payList">

            <el-table :data="payList" style="width: 100%" height="100%">
              <el-table-column  label="商品" width="120"><template slot-scope="scope"><img :src="scope.row.imageUrl" class="cover"></template></el-table-column>
              <el-table-column prop="bookName" label="商品名" ></el-table-column>
              <el-table-column prop="price" label="单价" width="100"></el-table-column>
              <el-table-column prop="orderMount" label="数量" ></el-table-column>
              <el-table-column label="金额" width="120"><template slot-scope="scope">{{ scope.row.price * scope.row.orderMount}}</template>
              </el-table-column>
            </el-table>

        </el-tab-pane>

        <el-tab-pane label="已发货" name="third">
          <div>
            <el-table :data="sendList" style="width: 100%" height="100%">
              <el-table-column label="商品" width="120"><template slot-scope="scope"><img :src="scope.row.imageUrl" class="cover"></template></el-table-column>
              <el-table-column prop="bookName"  label="商品名" width="400"></el-table-column>
              <el-table-column prop="storeId" label="店铺名" show-overflow-tooltip></el-table-column>
              <el-table-column prop="price" label="单价" width="120"></el-table-column>
              <el-table-column prop="orderMount" label="数量" show-overflow-tooltip>
                <template slot-scope="scope"><el-input-number v-model="scope.row.orderMount" size="small" :min="1" :disabled="true">{{ scope.row.orderMount }}</el-input-number></template>
              </el-table-column>
              <el-table-column label="金额" width="120">
                <template slot-scope="scope">￥{{ scope.row.orderMount * scope.row.price}}
              </template></el-table-column>
              <el-table-column prop="operation">
                <template slot-scope="scope"><el-button size="small" type="success" plain @click="sureGet(scope.row.orderId)">确认收货</el-button></template>
              </el-table-column>
            </el-table>
          </div>
        </el-tab-pane>
        <el-tab-pane label="已收货" name="fourth">
          <div>
            <el-table :data="getList" style="width: 100%" height="100%">
              <el-table-column  label="商品" width="120">
                <template slot-scope="scope"><img :src="scope.row.imageUrl" class="cover"></template>
                </el-table-column>
              <el-table-column prop="bookName"  label="商品名" width="400"></el-table-column>
              <el-table-column prop="storeId" label="店铺名" show-overflow-tooltip></el-table-column>
              <el-table-column prop="price" label="单价" width="120"></el-table-column>
              <el-table-column prop="orderMount" label="数量" show-overflow-tooltip>
              </el-table-column>
              <el-table-column prop="totalPrice" label="金额" width="120">
                <template slot-scope="scope">￥{{ scope.row.orderMount *scope.row.price }}</template>
              </el-table-column>
              <el-table-column
                prop="operation">
                <template slot-scope="scope">
                  <el-button size="small" type="primary" plain @click="clickScore(scope.row.bookId, scope.row.bookName)">书籍评分</el-button>
                  <el-dialog title="书籍评分" :visible.sync="dialogScore">
                    <el-form :model="bookScore">
                      <el-form-item label="书籍名称">
                        <el-input v-model="bookScore.bookName" autocomplete="off" style="width: 500px" disabled>{{bookScore.bookName}}</el-input>
                      </el-form-item>

                      <el-form-item label="用户评分">
                        <div class="block" style="margin-top: 10px">
                          <el-rate v-model="bookScore.score" :colors="colors">
                          </el-rate>
                        </div>
                      </el-form-item>
                    </el-form>
                    <div slot="footer" class="dialog-footer">
                      <el-button @click="dialogScore = false">取 消</el-button>
                      <el-button type="primary" @click="scoreBook()">确 定</el-button>
                    </div>
                  </el-dialog>
                </template>
              </el-table-column>
            </el-table>
          </div>
        </el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  name: "Order",
  inject: ['reload'],

  data() {
    return {
      colors: ['#99A9BF', '#F7BA2A', '#FF9900'],  // 等同于 { 2: '#99A9BF', 4: { value: '#F7BA2A', excluded: true }, 5: '#FF9900' }

      dialogScore: false,
      payDialog: false,

      id: '1',
      bookId: '1',
      totalPrice: '1',
      activeName: 'first',

      order: {
        id: '1',
        bookId: '1',
        userId: '1',
        number: '1',
        totalPrice: '1',
        placeDate: '1',
        state: '1',
      },

      user: {
        id: '2',
        username: '2',
        password: '2',
        address: '2',
        role: '2',
      },

      book: {
        id: '3',
        storeId: '3',
        name: '3',
        author: '3',
        publishingHouse: '3',
        price: '3',
        category: '3',
        introduction: '3',
        picPath: '3',
      },

      store: {},

      unPayList: [{}],

      payList: [{}],

      sendList: [{}],

      getList: [{}],

      bookScore: {}}
  },
  creat(){
    this.orderManage();
    this.reload();
  },
  methods: {

    handleClick(tab, event) {
      if(this.activeName === 'first') {
        this.orderManage();
      }else if(this.activeName === 'second') {// 获取已支付，未发货的订单
        axios.get('/api/order/user/list'+ "?status=1").then(successResponse => {
              var data = successResponse.data.result.list;
              this.payList = data;
              console.log(this.payList)
          console.log(successResponse.data)
          })
          .catch(failResponse => {
          })
      }else if(this.activeName === 'third') {
        // 获取已发货的订单
        axios.get('/api/order/user/list'+ "?status=1")
          .then(successResponse => {
            var data = successResponse.data.result.list;
              this.sendList = data;
            console.log(successResponse.data)
          }).catch(failResponse => {
          })
      }else {// 获取已收货的订单
        axios.get('/api/order/user/list'+ "?status=3")
          .then(successResponse => {
            var data = successResponse.data.result.list;
              this.getList = data;
            console.log(this.getList)
          }).catch(failResponse => {
          })
      }
    },
    orderManage() {
      var status=0
      axios.get('/api/order/user/list'+ "?status="+status).then(res =>{
        if(res.data.status=='success'){
          console.log(res.data.result.list)
          let data = res.data.result.list
          this.reload();
          this.$router.push({path: '/order', query: {unPayList: data}});
        }})
    },



    continuePay(id, totalPrice) {
      this.payDialog = true;
      this.id = id;
      this.totalPrice = totalPrice;
    },

    pay(operation) {
      if(operation === 'sure') {
        axios.post('/order/pay1', {
            id: this.id,
          })
          .then(successResponse => {

              this.payDialog = false;
              var data = successResponse.data.data;
              this.reload();
              this.$router.push({path: '/order', query: {unPayList: data}});
          })
          .catch(failResponse => {
          })
      }else if(operation === 'giveUp') {
        alert("未支付！");
        this.payDialog = false;
      }else {
        this.payDialog = false;
      }
    },

    deleteOrder(e) {
        axios.delete('/api/order/'+e).then(response => {
          console.log('删除成功')
          console.log(response)
          console.log(e)
          this.$message({
            showClose: true, message: '删除成功！', type: 'success', center: true
          });
          this.reload();
        });
      },


    sureGet(id) {
      axios.put('/api/order/finish/'+id,{orderId: id})
        .then(successResponse => {
            console.log(successResponse.data)

            if(successResponse.data.status=='success'){
              var data = successResponse.data.result.list;
              this.$router.push({path: '/order', query: {unPayList: data}});
              this.$message({showClose:false ,message:'确认收货成功', center:true,type:'success'})
              this.reload();
            }
            else {
              this.$message({showClose:false ,message:'确认收货失败', center:true,type:'error'})
              this.reload();
            }


        })
        .catch(failResponse => {
        })
    },

    clickScore(bookId, bookName) {
      this.bookId = bookId;
      this.bookScore.bookName = bookName;
      console.log(this.bookId)
      console.log(this.bookScore.bookName)
      this.dialogScore = true;
    },

    scoreBook() {
      axios.post('/api/book/rate/', {bookId: this.bookId, score: this.bookScore.score,})
        .then(successResponse => {
          if(successResponse.data.status='success'){
            alert("感谢您的评分！");
          }
          console.log(successResponse.data)
            this.dialogScore = false;
        //    var data = successResponse.data.;
         //   this.$router.push({path: '/order', query: {unPayList: data}});
            this.activeName = 'fourth';
          this.reload();
        })
        .catch(failResponse => {
          alert('失败！');
        })
    }
  },

  mounted() {
    this.unPayList = this.$route.query.unPayList;
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
