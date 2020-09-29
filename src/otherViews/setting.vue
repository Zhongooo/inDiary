<template>
    <div>
        <mt-header fixed title="设置">
            <router-link to="/user" slot="left">
                <i class ="iconfont icon-fanhui" style="font-size:20px"></i>
            </router-link>
        </mt-header>
        <div style="position: relative;top:50px;">
            <van-cell center title="心情推送" style="font-size:16px">
                    <template #right-icon>
                            <van-switch v-model="checked" size="24px" active-color="lightgreen"/>    
                    </template>
            </van-cell>
            <van-cell center title="消息通知" style="font-size:16px">
                    <template #right-icon>
                            <van-switch v-model="msgchecked" size="24px" active-color="lightgreen"/>    
                    </template>
            </van-cell>
            <van-cell title="关于软件" is-link/>
            <van-cell title="爱的鼓励" is-link/>
            <van-cell title="退出登录" @click="logout" style="font-size:17px;text-align: center;margin-top:20px"/>
        </div>
    </div>
</template>
<script>
export default {
    name: 'setting',
    data(){
        return{
            checked:true,
            msgchecked:false
        }
    },
    methods:{
        logout:async function(){
            this.$messagebox.confirm("ヾ(￣▽￣)Bye~Bye~？")
            .then(action => {
            localStorage.removeItem('token');
            localStorage.removeItem('userInfo');
                this.$router.push('/login');
            }).catch(err=>{
                console.log('点击取消')
            })
    },
    }
}
</script>
<style scoped>
    .mint-header{
        font-size:16px;
        color:black;
        background:#fff;
    }
</style>
<style>
.mint-msgbox-confirm {
        color:lightsteelblue;
        width: 50%;
    }
</style>