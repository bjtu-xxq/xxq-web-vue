<template>
  <div>
    <base-header></base-header>
    <hr/>
    <div>
      用户名:<input type="text" v-model="loginInfoVo.username" placeholder="请输入用户名" />
      <br/>
      密码：<input type="password" v-model="loginInfoVo.password" placeholder="请输入密码" />
      <br/>
      <button v-on:click="login">登录</button>
      <br/>
      登录验证情况：<textarea cols="30" rows="10" v-model="responseResult"></textarea>
    </div>
    <hr/>
    <base-footer></base-footer>
  </div>
</template>

<script>
import baseHeader from '@/components/common/BaseHeader.vue'
import baseFooter from '@/components/common/BaseFooter.vue'
export default {
  name: "UserLogin",
  // baseHeader、baseFooter组件给申明到components里面然后在template里面使用
  components: { baseHeader, baseFooter },
  data () {
    return {
      loginInfoVo: { username: '', password: '' },
      responseResult: []
    }
  },
  methods: {
    login () {
      this.$axios
        .post('/login', {
          username: this.loginInfoVo.username,
          password: this.loginInfoVo.password
        })
        .then(successResponse => {
          this.responseResult = JSON.stringify(successResponse.data)
          if (successResponse.data.code === 200) {
            this.$router.replace({path: '/index'})
          }
        })
        .catch(failResponse => {})
    }
  }
}
</script>

<style scoped>

</style>
