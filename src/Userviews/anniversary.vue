<template>
    <div style="background: whitesmoke;height:630px">
        <mt-header fixed title="纪念日">
            <router-link to="/user" slot="left">
                <i class="iconfont icon-fanhui2" style="font-size:20px"></i>
            </router-link>
                    
        </mt-header>
        <div style="position: relative;top:46px;background:#fff" v-for="item in list">
            <div id="outout">
                <div id="anniversaryPic">
                    <img :src="require(`../assets/pic/anniversary/${item.icon}.png`)" id="anniversaryImg">
                </div>
                <div id="middlewords">
                    <span style="font-size:18px;letter-spacing: 2px;">{{item.content}}</span><br />
                    <span style="position: relative;top:8px;">
                        <svg class="iconcolor" aria-hidden="true" class="svg">
                            <use xlink:href="#icon-rili1"></use>
                        </svg>
                        <span style="color:#828282">{{$moment(item.time).format('YYYY-MM-DD')}}</span>
                    </span>
                </div>
                <div id="sumDay">
                    <span class="sumDayfont">已经</span><br />
                    <div class="time"><span
                            style="font-size:23px;">{{$moment().diff($moment(item.time), 'day')}}</span>&nbsp;<span>天</span>
                    </div>
                </div>
                <div class="van-hairline--bottom" style="position: relative;top:80px;width:90%;left:5%;"></div>
            </div>
        </div>

        <div id="addnew" @click="add">
            <img src="../assets/pic/anniversary/add2.png" style="width:50px;height:50px;left:20px;position: relative;">
            <span id="addwords">添加纪念日</span>
        </div>

    </div>
</template>
<script>
    export default {
        name: 'anniversary',
        data() {
            return {
                list: ''
            }
        },
        methods: {
            add: async function () {
                console.log('jump!');
                this.$router.replace('/user/addanniversary')
            }
        },
        created: async function () {
            let params = { user_id: JSON.parse(localStorage.getItem('userInfo')).user_id }
            const res = await this.$api.user.getAnniversary(params);
            if (res) {
                this.list = res.list;
            }
        }
    }
</script>
<style scoped>
    @import '../style/userviews/anniversary.css';
</style>