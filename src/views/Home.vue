<template>
    <div>
        <mt-header fixed title="我的日记">
            <router-link to="/diary/weather" slot="right" id="rightwea">
                <img :src='require(`../assets/pic/realwea/${wea_img}.png`)' width="30px" height="30px">
                <span style="position: relative;top:-6px;left:2px;">{{tem}}°</span><br />
                <span style="font-size: 13px;margin-right:8px;">{{city}}</span>&nbsp;
                <span style="font-size: 13px;">{{wea}}</span>
            </router-link>
                    
        </mt-header>
        <div class="homeMain">
            <van-grid clickable icon-size="36px" :column-num="2">
                <van-grid-item icon="edit" text="记一记" to="/diary/weather" />
                <van-grid-item icon="notes-o" text="日记本" to="/diary/diaryBook" />
            </van-grid>
            <div class="record">
                <div class="cal">
                    <span id="calDate" style="font-size:28px">{{this.$moment().format('DD')}}</span>
                </div>
                <div class="recordMain" style="position:absolute;top:0">
                    <span><img src="../assets/pic/上.png" style="width:12px;height:12px" />
                        本月连续记录:&nbsp{{recordmonth}}&nbsp天</span><br />
                    <span><img src="../assets/pic/上.png" style="width:12px;height:12px" />
                        本周连续记录:&nbsp{{recordweek}}&nbsp天</span><br />
                    <span><img src="../assets/pic/上.png" style="width:12px;height:12px" />
                        共记录心情:&nbsp{{recordmood}}&nbsp条</span>
                </div>
            </div>
            <div class="viewo" v-show="showMood">
                <span style="font-weight: bold;font-size:26px;margin-left: 16px;">
                    {{this.$moment().format('MM')>=10?this.$moment().format('MM'):this.$moment().format('M')}}&nbsp</span>月日记心情分布
                <van-icon :name="icon" @click="showSun" size="22px" style="left:180px;top:3px" />
                <oview></oview>
            </div>
            <div class="viewo" v-show="!showMood">
                <span style="font-weight: bold;font-size:26px;margin-left: 16px;">
                    {{this.$moment().format('MM')>=10?this.$moment().format('MM'):this.$moment().format('M')}}&nbsp</span>月日记天气分布
                <van-icon :name="icon2" @click="notshowSun" size="22px" style="left:180px;top:3px" />
                <sun></sun>
            </div>
        </div>
        <div style="height:6em"></div>
    </div>
</template>
<script>
    import oview from '@/otherViews/oview.vue'
    import sun from '@/otherViews/sun.vue'
    import axios from 'axios'
    export default {
        name: 'Home',
        components: {
            oview,
            sun
        },
        data() {
            return {
                month: 5,
                recordmonth: 10,
                recordweek: 6,
                recordmood: 16,
                icon: 'arrow',
                icon2: 'arrow-left',
                showMood: true,
                wea: '',
                wea_img: '',
                tem: '',
                city: '',
                wea_img: ' '
            }
        },
        methods: {
            showSun: async function () {
                console.log('sunsun');
                this.showMood = false;
            },
            notshowSun: async function () {
                console.log('moodmood')
                this.showMood = true;
            },
            getWeather: async function () {
                axios({
                    method: 'get',
                    url: 'https://www.tianqiapi.com/free/day?appid=75698768&appsecret=7LyHELsc'
                }).then((response) => {
                    // 这里是处理正确的回调
                    console.log(response);
                    this.wea = response.data.wea;
                    this.tem = response.data.tem;
                    this.wea_img = response.data.wea_img;
                    this.city = response.data.city;
                    localStorage.setItem('wea', response.data.wea);
                }, function (response) {
                    // 这里是处理错误的回调
                    console.log("错误信息：" + response)
                });
            }
        },
        created: function () {
            this.getWeather();
        },
        beforeRouteLeave(to, from, next) {
            to.meta.keepAlive = false;
            next();
        }
    };
</script>
<style>
    body {
        background: #F9F9F9;
    }
</style>
<style scoped>
    @import '../style/home.css';
</style>