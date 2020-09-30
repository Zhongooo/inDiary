<template>
    <div class="anniversary">
        <mt-header fixed title="纪念日">
            <router-link to="/user" slot="left">
                <i class="iconfont icon-fanhui2" style="font-size:20px"></i>
            </router-link>
                    
        </mt-header>
        <div class="anniContent" v-for="item in list">
            <div class="outout">
                <div class="anniversaryPic">
                    <img :src="require(`../assets/pic/anniversary/${item.icon}.png`)" class="anniversaryImg">
                </div>
                <div class="middlewords">
                    <span class="annicontent">{{item.content}}</span><br />
                    <span class="svgicon">
                        <svg class="iconcolor iconsvg" aria-hidden="true">
                            <use xlink:href="#icon-rili1"></use>
                        </svg>
                        <span style="color:#666">{{$moment(item.time).format('YYYY-MM-DD')}}</span>
                    </span>
                </div>
                <div class="sumDay">
                    <span class="sumDayfont">已经</span><br />
                    <div class="time">
                        <span
                            style="font-size:1rem;">{{$moment().diff($moment(item.time), 'day')}}</span>&nbsp;<span>天</span>
                    </div>
                </div>
            </div>
        </div>

        <div class="addnew" @click="add">
            <img src="../assets/pic/anniversary/add2.png" class="addimg">
            <span class="addwords">添加纪念日</span>
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