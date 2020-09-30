<template>
    <div>
        <mt-header fixed title="设置">
            <router-link to="/user" slot="left">
                <i class="iconfont icon-fanhui" style="font-size:0.8rem"></i>
            </router-link>
                    
        </mt-header>
        <div style="position: relative;top:50px;">
            <van-cell center title="心情推送" class="fontsizeIcon">
                <template #right-icon>
                    <van-switch v-model="checked" size="1rem" active-color="lightgreen" />
                </template>
            </van-cell>
            <van-cell center title="消息通知" class="fontsizeIcon">
                <template #right-icon>
                    <van-switch v-model="msgchecked" size="1rem" active-color="lightgreen" />
                </template>
            </van-cell>
            <van-cell title="关于软件" is-link class="fontsizeIcon" />
            <van-cell title="爱的鼓励" is-link class="fontsizeIcon" />
            <van-cell title="退出登录" @click="logout" class="fontsizeIcon logout" />
        </div>
    </div>
</template>
<script>
    export default {
        name: 'setting',
        data() {
            return {
                checked: true,
                msgchecked: false
            }
        },
        methods: {
            logout: async function () {
                this.$messagebox.confirm("ヾ(￣▽￣)Bye~Bye~？")
                    .then(action => {
                        localStorage.removeItem('token');
                        localStorage.removeItem('userInfo');
                        this.$router.push('/login');
                    }).catch(err => {
                        console.log('点击取消')
                    })
            },
        }
    }
</script>
<style scoped>
    .mint-header {
        font-size: 16px;
        color: black;
        background: #fff;
    }

    .fontsizeIcon {
        font-size: 0.7rem
    }

    .logout {
        font-size: 0.7rem;
        text-align: center;
        margin-top: 2rem;
    }
</style>
<style>
    .mint-msgbox-confirm {
        color: lightsteelblue;
        width: 50%;
    }
</style>