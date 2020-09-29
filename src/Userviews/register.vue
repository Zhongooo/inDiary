<template>
    <div id="register">
        <mt-header fixed>
            <router-link to="/login" slot="left">
                <mt-button icon="back"></mt-button>
            </router-link>
        </mt-header>
        <img :src="logo" id="logo"></img>
        <div id="registerMain">
            <van-field v-model="phone" clearable left-icon="phone-o" placeholder="请输入手机号码" />
            <van-field v-model="sms" center clearable left-icon="smile-comment-o" placeholder="请输入验证码">
                <template #button>
                    <van-button v-show="Verification" @click="sendmsg" size="small" type="default">发送验证码</van-button>
                    <van-button v-show="!Verification" size="small" type="default"><span>{{timer}}</span>s后重新获取
                    </van-button>
                </template>
            </van-field>
            <van-field v-model="password" clearable type="password" left-icon="eye-o"
                placeholder="请设置登录密码（6-16位数字字母组合）" />
            <router-link to>
                <van-button id="registerBtn" @click="submit" style="top:20px;width:100px;height:40px;" color="black"
                    plain round>注册</van-button>
            </router-link>
        </div>

    </div>
</template>
<script>
    export default {
        name: 'register',
        data() {
            return {
                phone: '',
                sms: '',
                smscode: '',
                password: '',
                logo: require("../assets/pic/register.png"),
                Verification: true,
                timer: '30'
            }
        },
        methods: {
            sendmsg: async function () {
                if (this.phone == '') {
                    this.$toast('请先输入手机号码');
                }
                else {
                    this.Verification = false;
                    let auth_timer = setInterval(() => {  //定时器设置每秒递减
                        this.timer--;        //递减时间
                        if (this.timer <= 0) {
                            this.Verification = true;    //60s时间结束还原v-show状态并清除定时器
                            clearInterval(auth_timer);
                            this.timer = '30'
                        }
                    }, 1000);
                    let params = {
                        phone: this.phone
                    }
                    let res = await this.$api.user.toSendmsg(params)
                    console.log('codecode:' + res.msg)
                    if (res.code == '1') {
                        this.smscode = res.msg
                    } else {
                        this.$toast('验证码获取失败');
                    }
                }
            },
            submit: async function () {
                if (this.phone == '' || this.smscode == '' || this.password == '') {
                    this.$toast('不能为空');
                } else if (this.smscode != this.sms) {
                    this.$toast('验证码错误');
                } else {
                    let params = {
                        "phone": this.phone,
                        "password": this.password
                    }
                    let res = await this.$api.user.register(params)
                    if (res.code == 0) {
                        this.$toast(res.msg);
                    } else if (res.code == 1) {
                        this.$toast({
                            message: res.msg,
                            iconClass: 'iconfont icon-success',
                            duration: 2000
                        })
                        var that = this;
                        setTimeout(function () {
                            that.$router.push('/login')
                        }, 2100)
                    }
                }
            }
        }
    };
</script>
<style scoped>
    @import '../style/otherviews/register.css';

    .mint-header {
        background-color: #fff0;
        background-color: rgba(0, 0, 0, 0);
        color: black;
    }

    #logo {
        width: 200px;
        height: 120px;
        margin-top: 50px;
        margin-left: 126px
    }
</style>