<template>
    <div>
        <div class="pageHeader">
            <el-page-header @back="goBack" content="书籍详情"></el-page-header>
        </div>
        <div v-loading="loading" class="bookInfo">
            <el-card class="box-card leftInfo">
                <img style="height: 310px;" :src="this.bookInfo.imageUrl">
                <div style="display: flex; margin-top: 20px; align-items: center;">
                    <div style="color: #606266;">推荐程度：</div>
                    <el-rate style="margin-top: 4px;" v-model="bookInfo.score" :colors="colors" disabled></el-rate>
                </div>
            </el-card>
            <div class="rightInfo" style="position: relative;">
                <div class="bookName">{{ bookInfo.name }}</div>
                <div class="authorName">{{ bookInfo.author }} / {{ bookInfo.press}}</div>
                <div style="display: flex; margin-top: 50px; align-items: center;">
                    <div style="color: #606266;">售价：</div>
                    <div class="bookPrice">¥ {{ bookInfo.price }}</div>
                </div>
                <div style="display: flex; margin-top: 50px; align-items: flex-end;">
                    <div style="color: #606266;">库存数量：</div>
                    <div>{{ bookInfo.storeMount }}</div>
                </div>
                <div style="position: absolute; bottom: 0;">
                    <div style="display: flex; align-items: center;">
                        <div style="color: #606266;">数量：</div>
                        <el-input-number v-model="num" @change="handleChange" :min="1" :max="bookInfo.storeMount"></el-input-number>
                    </div>
                    <div style="display: flex; margin-top: 40px;">
                        <el-button class="buyButton1" @click="addToCart(bookInfo)">加入购物车</el-button>
<!--                      -->
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import axios from 'axios'
export default {

  data () {
    return {
      loading: true,
      bookInfo: [],
      cart: [[]],
      num: 1
    }
  },
  created () {
    this.getInfo()
  },
  methods: {
    getInfo () {
      axios.get('/api/book/'+this.$route.query.ID).then(res => {
        this.bookInfo =res.data.result
        console.log('success')
        console.log(this.bookInfo)
      })
      this.loading = false
    },
    handleChange (value) {
      console.log(value)
    },
    goBack () {
      this.$router.go(-1)
    },

    addToCart (e) {
      // eslint-disable-next-line eqeqeq
      if (this.$cookies.get('status') == 'logined') {
        axios.post('/api/order/', {
          userId: this.$cookies.get('userId'),
          storeId: e.storeId,//书籍ID
          bookId: e.bookId,
          imageUrl: e.imageUrl,
          bookName: e.name,
          price: e.price,
          orderMount: this.num
        }).then(res => {
          console.log('success')
          console.log({
            userId: this.$cookies.get('userId'),
            storeId: e.storeId,//书籍ID
            bookId: e.bookId,
            imageUrl: e.imageUrl,
            bookName: e.name,
            price: e.price,
            orderMount: this.num
          })
          this.$message({
            type: 'success',
            message: '成功加入购物车！'
          })
        })
      } else {
        this.$confirm('您尚未登录！', 'smallFrog', {
          confirmButtonText: '去登陆',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$router.push({
            path: '/login'
          })
        })
      }
    },
    setCart (e) {
      this.cart[0]['userID'] = this.$cookies.get('userId')
      this.cart[0]['bookID'] = this.bookInfo.bookId
      this.cart[0]['bookName'] = this.bookInfo.name
      this.cart[0]['imageUrl'] = this.bookInfo.imageUrl
      this.cart[0]['price'] = this.bookInfo.price
      this.cart[0]['orderMount'] = this.num
    },
    toSettle (e) {
      // eslint-disable-next-line eqeqeq
      if (this.$cookies.get('status') == 'logined') {
        this.setCart(e);
        console.log(this.cart);
        this.$router.push({path: '/shopping/settle', query: {cart: this.cart}})
        console.log(this.cart);
      } else {
        this.$confirm('您尚未登录！', 'smallFrog', {
          confirmButtonText: '去登陆',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$router.push({
            path: '/login'
          })
        })
      }
    }
  }
}
</script>

<style>
    .bookInfo {
        justify-content: center;
        margin-top: 50px;
        margin-bottom: 80px;
        display: flex;
    }

    .leftInfo {
        margin-left: 0;
        height: 400px;
    }

    .rightInfo {
        width: 400px;
        height: 400px;
        margin-left: 150px;
        padding-left: 30px;
    }

    .bookName {
        font-size: 23px;
        font-weight: 600;
    }

    .authorName {
        margin-top: 20px;
        color: #909399;
    }

    .bookPrice {
        color: #c00000;
        font-size: 23px;
        font-weight: 600;
    }

    .buyButton1 {
        width: 150px;
        background-color: #4F6E9D;
        color: #FFFFFF;
        outline: none;
        border-color: #4F6E9D;
        border-radius: 0;
    }

    .buyButton1:focus,
    .buyButton1:hover {
        background-color: #7e9dca;
        border-color: #7e9dca;
        color: #FFFFFF;
        outline: none;
    }

    .buyButton2 {
        width: 150px;
        outline: none;
        border-radius: 0;
        color: #4f6e9d;
    }

    .buyButton2:focus,
    .buyButton2:hover {
        background-color: #7e9dca;
        border-color: #7e9dca;
        color: #FFFFFF;
        outline: none;
    }
</style>
