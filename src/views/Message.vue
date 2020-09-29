<template>
    <div style="background:#ffffff">
        <mt-header fixed title="消息中心">
            <router-link to slot="left">
                    <mt-button icon="back" @click="toDelActive"></mt-button>
            </router-link>
        </mt-header>
        <div class="message" style="position: relative;top:56px;">
            <van-tabs type="card" v-model="active" @click="onClick" sticky>
                <van-tab title="系统消息">
                    <van-swipe-cell v-for="item in list" @click="jump(item.id)">
                        <van-cell :title="item.msgcontent" :label="$moment(item.time).format('YYYY-MM-DD HH:mm:ss')">
                        
                        <template #icon>
                            <div v-if="item.badge==1" class="dot"></div>
                            <svg class="iconcolor" aria-hidden="true" style="width:28px;height:28px;margin-left:2px;margin-right:10px">
                                <use xlink:href="#icon-icon-test"></use>
                            </svg>
                        </template>
                        
                    </van-cell>
                        <template #right>
                            <van-button square text="删除" @click="todel(item.id)"/>
                        </template>
                    </van-swipe-cell>
                </van-tab>
                <van-tab title="评论">评论我</van-tab>
                <van-tab title="点赞">点赞我</van-tab>
            </van-tabs>
        </div>
        <div style="height:2em"></div>
    </div>
</template>
<script>
export default {
    inject:['reload'],
    name:'Message',
    data(){
        return{
            active:'',
            time:this.$moment().format('YYYY-MM-DD HH:mm:ss'),
            list:[]
        }
    },
    methods:{
        jump:async function(id){
            let params={id:id}
            let res = await this.$api.user.delDot(params);
            this.$router.push('/user/moodpush')
        },
        onClick(){
            localStorage.setItem('tabActive',this.active);
        },
        toDelActive(){
            localStorage.removeItem('tabActive');
            this.$router.go(-1);
        },
        todel:async function(id){
            let params={id:id}
            let res = await this.$api.user.delMsg(params);
            if(res.code==1){
                this.$toast({
                    message:'删除成功',
                    duration:500
                    })
                var that=this;
                setTimeout(function () {
                    that.reload();
                }, 510)
            }
        },
        getList:async function(){
            let params={
                            user_id:JSON.parse(localStorage.getItem('userInfo')).user_id,
                            active:0
                        }
            let res = await this.$api.user.getAllMsg(params);
            console.log(res.data);
            this.list=res.data;
        }
    },
    created:async function(){
        if(!localStorage.getItem('tabActive')){
                this.active=0;
        }
        else if(localStorage.getItem('tabActive')!=null){
            const tab=JSON.parse(localStorage.getItem('tabActive'));
            this.active=tab;
        }
        this.getList(); 
    }
}
</script>
<style>
.dot{
    background: red;
    width:6px;
    height:6px;
    border-radius:6px;
    position: relative;
    left:33px;
    z-index:1001;
    float:left;
}
.van-tabs__nav--card{
    border:1px solid #b0e6d1;
    border-radius:20px;
    /* border-right:2px solid lightcoral; */
}
.van-tabs__nav--card .van-tab.van-tab--active{
    background-color: #b0e6d1;
    border-radius:20px;
}
.van-tabs__nav--card .van-tab{
    color:#b0e6d1;
    border-right:0px;
}
.message .van-button{
    background:#b0e6d1;
    border:1px solid #b0e6d1;
    color:#ffffff;
    font-size:15px;
    letter-spacing: 3px;
    height:64px;
}
</style>