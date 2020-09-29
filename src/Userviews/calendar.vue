<template>
    <div style="background: #fff;height:630px">
        <mt-header fixed title="日历">
            <router-link to slot="left">
                <i class="iconfont icon-fanhui2" @click="$router.go(-1)" style="font-size:20px"></i>
            </router-link>
                    
        </mt-header>
        <i class="iconfont icon-fanhui"></i>
        <Calendar ref="Calendar" :markDate=arr @choseDay="clickDay" @changeMonth="changeDate"></Calendar>
        <div class="calColor" v-show="calcolor" style="background-color:lightsalmon;">今日</div>
        <div class="calColor" v-show="calcolor" style="background-color:lightseagreen;">记录日期</div>
        <div class="calColor" v-show="calcolor" style="background-color:lightblue;">点击某日</div>

        <div style="position:relative;top:10px">
            <div id="diarylist" v-for="item in list" :key="item.id" @click="jump(item.id)">
                <div id="listLeft">
                    <span style="color:#707070;font-size:15px">{{$moment(item.time).format('MM-DD dddd')}}
                        &nbsp{{item.weather}}</span><br />
                    <span id="titles">{{item.title}}</span>
                    <div class="van-hairline--bottom" style="position:relative;top:38px;width:30px"></div>
                    <span id="moods">{{item.mood}}</span>
                </div>
                <div id="photos">
                    <img :src='require(`../../../../koaS/koaPass/public/diaryimg/${item.picture}`)' width="120px"
                        height="120px">
                </div>
            </div>
        </div>
    </div>
</template>
<script>
    import Calendar from 'vue-calendar-component';
    export default {
        name: 'calendar',
        components: {
            Calendar
        },
        data() {
            return {
                user_id: '',
                arr: [],
                list: '',
                calcolor: true
            }
        },
        methods: {
            jump(id) {
                this.$router.push(`/diary/diaryDetail/${id}`)
            },
            clickDay: async function (data) {
                this.calcolor = false;
                this.$toast('选中了' + data);
                console.log(this.$moment(data).format('YYYY-MM-DD')); //选中某天

                let params = {
                    user_id: this.user_id,
                    time: this.$moment(data).format('YYYY-MM-DD'),
                    drafts: 1 //区分草稿箱
                }
                let res = await this.$api.user.getDiaryList(params);
                console.log(res.list);
                this.list = res.list;
            },
            changeDate(data) {
                console.log(data); //左右点击切换月份
            },
            getdiary: async function () {
                this.user_id = JSON.parse(localStorage.getItem('userInfo')).user_id;
                let params = {
                    user_id: this.user_id,
                    drafts: 1 //区分草稿箱
                }
                let res = await this.$api.user.getDiaryList(params);
                console.log(res.list);
                for (var i = 0; i < res.list.length; i++) {
                    this.arr.push(this.$moment(res.list[i].time).format('YYYY-MM-DD'))
                }
                console.log('arr:' + this.arr)
            }
        },
        created: async function () {
            this.getdiary();
        }
    }
</script>
<style scoped>
    @import '../style/userviews/calendar.css';
</style>
<style>
    .wh_content_all[data-v-2ebcbc83] {
        font-family: -apple-system, BlinkMacSystemFont, PingFang SC, Helvetica Neue, STHeiti, Microsoft Yahei, Tahoma, Simsun, sans-serif;
        background-color: #87ceb0;
        width: 100%;
        overflow: hidden;
        padding-bottom: 8px;
    }

    .wh_content_item>.wh_isMark[data-v-2ebcbc83] {
        border-radius: 100px;
        background: lightseagreen;
    }

    .wh_content_item .wh_isToday[data-v-2ebcbc83] {
        background-color: lightcoral;
    }

    .wh_content_item .wh_chose_day[data-v-2ebcbc83] {
        background-color: lightblue;
    }
</style>