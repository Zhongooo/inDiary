<template>
    <div>
        <mt-header fixed title="心情推送">
            <router-link to="/user" slot="left">
                <i class="iconfont icon-fanhui2" style="font-size:20px"></i>
            </router-link>
                    
        </mt-header>
        <div v-for="item in arr" @click="tojump(item.pushcontent.id,item.id)"
            style="position: relative;top:40px;background:whitesmoke;height:350px">
            <span id="moodtime">{{$moment(item.time).format('YYYY-MM-DD HH:mm:ss')}}</span>
            <div id="pushcontent">
                <span class="push">{{item.pushcontent.cover_title}}</span><br />
                <img id="moodimg"
                    :src='require(`../../../../koaS/koaPass/public/diaryimg/${item.pushcontent.cover_img}`)'>
                <div class="content">
                    <span style="font-size:14px;color:#828282;">{{item.pushcontent.cover_content}}
                    </span>
                </div>
                <van-cell style="position: relative;top:10px;" title="戳我变开心" is-link to="/user/moodpushContent" />
            </div>
        </div>
    </div>
</template>
<script>
    export default {
        name: 'moodPush',
        data() {
            return {
                list: [],
                arr: []
            }
        },
        methods: {
            getAllmoodpush: async function () {
                let params = {
                    user_id: JSON.parse(localStorage.getItem('userInfo')).user_id
                }
                let res = await this.$api.user.getAllmoodpush(params);
                console.log(res.data);
                this.list = res.data;
                for (var i = 0; i < this.list.length; i++) {
                    if (this.list[i].radio == this.list[i].pushcontent.radio) {
                        this.arr.push(this.list[i]);
                    }
                    console.log('arr:' + this.arr[0])
                }
            },
            tojump: async function (id, moodid) {
                this.$router.push(`/user/moodpushContent/${id}/${moodid}`)
            },
        },
        created: async function () {
            this.getAllmoodpush();
        },
    }
</script>
<style scoped>
    #moodimg {
        width: 96%;
        height: 160px;
        position: relative;
        left: 8px;
        top: 10px;
    }

    #pushcontent {
        width: 90%;
        height: 280px;
        background: #fff;
        position: absolute;
        left: 5%;
        top: 40px;
        border-radius: 6px;
    }

    #moodtime {
        color: #666;
        position: relative;
        left: 30%;
        top: 10px;
    }

    .content {
        position: relative;
        left: 8px;
        width: 95%;
        top: 10px;
    }

    .push {
        position: relative;
        left: 8px;
        font-size: 17px;
        top: 6px;
    }
</style>