<template>
    <div style="background: #fff;height:630px">
        <mt-header fixed title="密码锁设置">
            <router-link slot="left">
                <i class ="iconfont icon-fanhui2" @click="$router.go(-1)" style="font-size:20px"></i>
            </router-link>
        </mt-header>
        <div v-show="first" style="position: relative;top:36px;">
            <van-cell center title="密码锁" style="font-size:16px">
                <template #right-icon>
                        <van-switch @change="changeSwitch" v-model="checked" size="24px" active-color="lightgreen"/>    
                </template>
            </van-cell>
            <van-cell center title="更改密码锁" is-link @click="toChange" style="font-size:16px"/>
        </div>
        <div v-show="!first&&second" style="position: relative;top:36px;">
            <van-password-input
            :value="value"
            info="设置为 4 位数字的密码"
            :length="4"
            :focused="showKeyboard"
            @focus="showKeyboard = true"
        />
        <van-number-keyboard
            :show="showKeyboard"
            @input="onInput"
            @delete="onDelete"
            @blur="showKeyboard = false"
        />
        </div>
    </div>
</template>
<script>
export default{
    name:'diarypassword',
    data(){
        return{
            checked:false,
            first:true,
            second:false,
            value: '',
            showKeyboard: false,
        }
    },
    methods:{
        toChange:async function(){
            this.first=false;
            this.second=true;
        },
        changeSwitch:async function(){
            if(this.checked==true){
                // let params={user_id:JSON.parse(localStorage.getItem('userInfo')).user_id}
                // const res=await this.$api.user.findpwd(params);
                const pwd=JSON.parse(localStorage.getItem('userInfo')).diarypwd;
                if(!pwd){
                    this.first=false;
                    this.second=true;
                    this.showKeyboard=true;
                    
                }
            }
            
        },
        onInput:async function(key) {
            this.value = (this.value + key).slice(0, 4);
            if(this.value.length==4){
                console.log(this.value)
                    //设置密码
                    let params={
                        "user_id":JSON.parse(localStorage.getItem('userInfo')).user_id,
                        "pwd":this.value
                    };
                    const res=await this.$api.user.setpwd(params);
                    if(res.code==1){
                        this.$toast('设置成功');
                    }
            }
            },
        onDelete() {
        this.value = this.value.slice(0, this.value.length - 1);
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