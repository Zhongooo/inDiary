<template>
  <div id="login">
  <mt-header fixed>
      <router-link to="/" slot="left">
          <mt-button icon="back"></mt-button>
      </router-link>
      <router-link to="/register" slot="right">
          <mt-button>没有账号？</mt-button>
      </router-link>
      </mt-header>
    <img :src="logo" id="logo" style="width:140px;height:120px;margin-top:50px;margin-left:126px"></img>
    <div id="loginMain">
    <form action="" id="loginform">
      <mt-field placeholder="请输入用户名" v-model="user_id" >
        <i class ="iconfont icon-geren"></i>
      </mt-field>
      <mt-field placeholder="请输入密码" :type="pwdType" v-model="password" @on-change="password">
        <img :src="src" width="30px" height="30px" @click="changeType()">
      </mt-field>
      <router-link to>
      <van-button id="loginBtn" @click="submit" style="top:20px;width:100px" color="black" plain round >登录</van-button>
      </router-link>
    </form>
  </div>
  </div>
</template>
<script>
export default {
  name: 'login',
  data(){
    return{
      user_id:'',
      password:'',
      link:'/',
      pwdType:"password",
      logo:require("../assets/pic/LOGIN.png"),
      src:require("../assets/pic/close.png")
    }
  },
  methods:{
      changeType(){
        this.pwdType=this.pwdType==='password'?'text':'password';
        this.src=this.src===require("../assets/pic/close.png")?require("../assets/pic/open.png"):require("../assets/pic/close.png");
      },
       submit:async function(){
        try{
          let params = {
          "user_id": this.user_id,
          "password": this.password
        }
        let res = await this.$api.user.userinfo(params)
        console.log(res.code)
        if(!res){
          console.log('获取不到信息')
        }
        if(res.code==-1){
          this.$toast({
                message:'该用户不存在，快去注册',
                duration:1000
          })
          console.log('该用户不存在，快去注册')
        }
        if(res.code==0){
          this.$toast({
                message:'密码错误',
                duration:1000
          })
          console.log('密码错误')
        }
        if(res.code == 1)
        {
          localStorage.setItem('token',res.token)
          const userInfo=JSON.stringify(res.userInfo);
          localStorage.setItem('userInfo',userInfo)
          const rolerole=JSON.parse(localStorage.getItem('userInfo'));
          if(localStorage.getItem('token')){
          this.$router.push('/user')
        }
        }
        }catch (e) {
        console.log(e)
      }
      },
     jump:async function(){
      const Usertoken=localStorage.getItem('token');
      if(Usertoken){
        this.link='/user'
      }else{
        this.link='/'
      }
     }
  },
  created:async function(){
      this.jump()
  },
}
</script>
<style scoped>
@import '../style/login.css';
.mint-header{
    background-color: #fff0;
    background-color:rgba(0,0,0,0); 
    color:black;
}
</style>