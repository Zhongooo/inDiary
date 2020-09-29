<template>
    <div>
        <mt-header fixed title="时间轴">
            <router-link to slot="right">
                <i class ="iconfont icon-fenxiang" @click="showShare=true"></i>
            </router-link>
        </mt-header>
        <van-swipe class="my-swipe" :autoplay="3000" indicator-color="white">
            <van-swipe-item>广告位1</van-swipe-item>
            <van-swipe-item>广告位2</van-swipe-item>
            <van-swipe-item>广告位3</van-swipe-item>
            <van-swipe-item>广告位4</van-swipe-item>
        </van-swipe>
        <div id="line">
            <template >
                <timeline>    
                <timeline-title bg-color="#b0e6d1"><span style="font-size:18px;font-weight: bold;color:#b0e6d1">{{$moment().format('YYYY-MM-DD')}}&nbsp{{wea}}</span></timeline-title>
                <div v-for="item in list">
                    <timeline-item  line-color="#b0e6d1" :hollow="true"><span style="font-weight: bold;">{{$moment(item.time).format('YYYY-MM-DD')}}</span>&nbsp{{item.mood}}</timeline-item>
                 </div>
                </timeline>
            </template>
        </div>
        <van-share-sheet v-model="showShare" :options="options" title="立即分享给好友"/>
        <div style="height:2em"></div>
    </div>
</template>
<script>
import { Timeline, TimelineItem, TimelineTitle } from 'vue-cute-timeline'
export default {
    components: {
    Timeline,
    TimelineItem,
    TimelineTitle,
    },
    data(){
        return{
            wea:localStorage.getItem('wea'),
            list:[],
            showShare:false,
            options: [
            {
            name: '微信',
            icon: 'wechat',
            },
            {
            name: '微博',
            icon: 'weibo',
            },
            {
            name: 'QQ',
            icon: 'qq',
            },
        ],
        }
    },
    methods:{
        getTimeline:async function(){
         const user_id=JSON.parse(localStorage.getItem('userInfo')).user_id;
           let params={
               user_id:user_id,
               wea:localStorage.getItem('wea'),
               drafts:1 //区分草稿箱
           }
           let res = await this.$api.user.getTimeline(params);
           if(res.code==1){
             console.log(res.list);
             this.list=res.list
           }
        }
    },
    created:async function(){
        this.getTimeline();
    }
}
</script>
<style scoped>
.mint-header{
    font-size:16px;
    color:black;
    background:white;
}
#line{
    position: relative;
    color:#3a3939;
    background: #fff;
    height:100%;
}
#line a {
    color: #bf6dcf;
    font-weight: bold;
    text-decoration: none;
}
.my-swipe .van-swipe-item {
    color: #fff;
    font-size: 20px;
    line-height: 150px;
    text-align: center;
    background-color: #b0e6d1;
  }
</style>