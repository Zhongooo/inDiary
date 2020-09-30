<template>
    <div>
        <mt-header fixed>
            <router-link to="/" slot="left">
                <i class="iconfont icon-fanhui2" style="font-size:20px"></i>
            </router-link>
                    
        </mt-header>
        <div class="allweather w">
            <span class="ask">朋友，<br />今天的天气好吗？</span>
            <div v-for="item in list" class="weathersite">
                <div ref="btn" :style="style" @click="show(item.id,item.name)">
                    <img :src="item.pic" class="weatherImg">
                </div>
            </div>
            <van-button @click="jumpNext" class="moodbtn" color="black" plain round>选好天气啦</van-button>
        </div>
    </div>
</template>
<script>
    export default {
        name: 'weather',
        data() {
            return {
                list: [
                    { id: 0, pic: require('../assets/pic/weather/qing.png'), name: '晴' },
                    { id: 1, pic: require('../assets/pic/weather/yun.png'), name: '多云' },
                    { id: 2, pic: require('../assets/pic/weather/yin.png'), name: '阴' },
                    { id: 3, pic: require('../assets/pic/weather/yu.png'), name: '雨' },
                    { id: 4, pic: require('../assets/pic/weather/lei.png'), name: '雷' },
                    { id: 5, pic: require('../assets/pic/weather/shachen.png'), name: '沙尘' },
                    { id: 6, pic: require('../assets/pic/weather/wu.png'), name: '雾' },
                    { id: 7, pic: require('../assets/pic/weather/xue.png'), name: '雪' },
                    { id: 8, pic: require('../assets/pic/weather/bingbao.png'), name: '冰雹' },
                ],
                style: 'float:left;width:80px;height:80px;margin:17px 17px 1px 17px;border-radius:10px',
                checked: ''
            }
        },
        methods: {
            show(id, name) {
                console.log('name:' + name);
                for (var i = 0; i < this.list.length; i++) {
                    this.$refs.btn[i].style.background = ''
                }
                this.$refs.btn[id].style.background = "#b0e6d1";
                this.checked = name;
                console.log('checked:' + this.checked)
            },
            jumpNext() {
                if (this.checked != '') {
                    this.$router.replace(`/diary/mood/${this.checked}`)
                } else {
                    this.$toast('要选天气才能进行下一步哦')
                }
            }
        },
        beforeRouteLeave(to, from, next) {
            if (to.name !== 'mood') {
                this.$store.commit('noKeepAlive')
            }
            next()
        }
    }
</script>
<style scoped>
    @import '../style/diaryViews/index.css';

    .mint-header {
        font-size: 16px;
        color: black;
        background: #fff;
    }
</style>