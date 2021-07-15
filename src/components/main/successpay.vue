<template>
  <div>
    <div class="pay">
      <div class="viewBox">
        <div class="title">
          <div class="slogan">成功交易</div>
          <el-button class="submit" type="danger" @click="toMain">完成</el-button>
        </div>
        <el-divider></el-divider>

        <el-row type="flex" align="middle">

          <el-col :span="20">
            <el-steps :active="4" finish-status="success" simple>
              <el-step title="购物车" icon="el-icon-s-goods" @click="toCart()"></el-step>
              <el-step title="下单" icon="el-icon-s-claim"></el-step>
              <el-step title="付款" icon="el-icon-s-finance"></el-step>
              <el-step title="成功交易" icon="el-icon-success"></el-step>
            </el-steps>
          </el-col>
        </el-row>

        <el-divider></el-divider>


      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  inject: ['reload'],
  data () {
    return {
      input: '',
      userInfo: [],
      postage: 0,
      cart: [],
      count: 0,
      totalPrice: 0,
      editVisible: false
    }
  },
  created () {
    var address = 'settleUserInfo'
    // eslint-disable-next-line camelcase
    var user_ID = this.$cookies.get('user_ID')
    let count = 0
    let totalPrice = 0

    this.cart = this.$route.query.cart

    for (let i = 0; i < this.cart.length; i++) {
      count += parseFloat(this.cart[i].count)
      totalPrice += parseFloat(this.cart[i].unit_Price * this.cart[i].count)
    }
    this.count = count
    this.totalPrice = totalPrice

    axios.post(address, user_ID).then(res => {
      this.userInfo = res.data // 获取数据
      console.log('success')
      console.log(this.userInfo)
    })
  },
  methods: {
    goBack () {
      this.$router.go(-1)
    },
    toCart () {
      this.$router.push({
        path: '/shopping/cart'
      })
    },
    // 编辑操作
    toMain(){

      this.$router.push({
        path: '/home'
      })
    },
    handleEdit () {
      this.editVisible = true
    },
    modify (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          console.log('修改成功！')
          this.$message({
            showClose: true,
            message: '修改成功！',
            type: 'success',
            center: true
          })
          this.editVisible = false
        } else {
          console.log('error!')
          return false
        }
      })
    },
    toPay (e) {
      // if (!this.cart[0]) {
      //   this.$message({
      //     showClose: true,
      //     message: '无订单信息！',
      //     type: 'warning',
      //     center: true
      //   })
      // } else {
      this.$router.push({
        path: '/shopping/pay',
        query: {
          User_name: e.ID,
          User_tel: e.Phone,
          User_address: e.Address,
          cart: this.cart
        }
      })
      //}
    }
  }
}
</script>

<style>

.pay {
  width: 80%;
  margin: 0 auto;
  /* background-color: #f5f5f5; */
}

.pay .viewBox {
  width: 80%;
  margin: 0 auto;
}

.pay .viewBox .title {
  height: 100px;
  display: flex;
  align-items: center;
}

.pay .viewBox .title .slogan {
  width: 90%;
  height: 100px;
  line-height: 100px;
  font-size: 24px;
  color: #303133;
  float: left;
}

.pay .viewBox .title .submit {
  width: 150px;
  height: 50px;
  border-radius: 0;
  font-size: 16px;
}

.pay .viewBox .back {
  width: 100px;
  border-radius: 0;
}

.pay .viewBox .commodity {
  width: 80%;
  margin: 0 auto;
  text-align: center;
  margin-bottom: 10px;
}

.pay .viewBox .commodity .cTitle {
  height: 60px;
  line-height: 40px;
  font-weight: bold;
}

.pay .viewBox .commodity .bookImg {
  width: 60px;
}

.pay .viewBox .orderInfo {
  height: 180px;
  display: flex;
  align-items: center;
}

.pay.viewBox .orderInfo .left {
  width: 90%;
  height: 180px;
  line-height: 180px;
  font-size: 18px;
  color: #606266;
}

.pay .viewBox .orderInfo .left .infoTitle {
  width: 90%;
  height: 30px;
  line-height: 30px;
  font-size: 22px;
  color: #303133;
  margin-bottom: 30px;
}

.pay .viewBox .orderInfo .left .info {
  width: 90%;
  height: 40px;
  line-height: 40px;
  font-size: 17px;
  color: #606266;
}

.pay .viewBox .orderInfo .modify {
  width: 100px;
  height: 40px;
  border-radius: 0;
  font-size: 16px;
}

.pay .viewBox .settleFooter {
  width: 100%;
  display: flex;
}

.pay .viewBox .payFooter .leftImg {
  width: 80%;
  /* float: left; */
}

.pay .viewBox .payFooter .settleImg {
  width: 150px;
  float: left;
}

.pay .viewBox .payFooter .total {
  width: 20%;
  height: 150px;
  align-items: center;
}

.pay .viewBox .payFooter .total .postage {
  margin-bottom: 10px;
  float: right;
}

.pay .viewBox .payFooter .total .payPrice {
  margin-top: 30px;
  font-size: 20px;
  color: #4f6e9d;
  float: right;
}

</style>
