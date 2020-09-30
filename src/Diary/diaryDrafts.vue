<template>
    <div>
        <mt-header fixed title="草稿箱">
            <router-link to slot="left">
                <i class="iconfont icon-fanhui2" @click="$router.go(-1)" style="font-size:20px"></i>
            </router-link>
                    
        </mt-header>
        <div class="drafts">
            <div v-for="item in arr" class="dlist">
                <div class="dcontent">
                    <span @click="jump(item.id)">{{item.title}}</span>
                    <van-button type="default" @click="resubmit(item.id)" size="small"
                        style="position: absolute;left:12rem;">重发</van-button><br />
                    <span
                        style="color:#828282;font-size:0.6rem;">{{$moment(item.time).format('MM-DD HH:mm')}}</span><br />
                    <div @click="jump(item.id)">
                        <img :src='require(`../../../../koaS/koaPass/public/diaryimg/${item.picture}`)' class="dimg">
                    </div>
                    <div v-html="item.content" @click="jump(item.id)" class="itemcontent van-multi-ellipsis--l2">
                        {{item.content}}</div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
    export default {
        inject: ['reload'],
        name: 'diaryDrafts',
        data() {
            return {
                arr: []
            }
        },
        methods: {
            jump(id) {
                this.$router.replace(`/diary/diaryDetail/${id}`)
            },
            getDiaryList: async function () {
                const user_id = JSON.parse(localStorage.getItem('userInfo')).user_id;
                let params = {
                    user_id: user_id,
                    drafts: 0 //区分草稿箱
                }
                let res = await this.$api.user.getDiaryList(params);
                if (res.code == 1) {
                    console.log(res.list);
                    this.arr = res.list
                }
            },
            resubmit: async function (id) {
                this.$messagebox.confirm("要保存到日记本中吗")
                    .then(action => {
                        let params = {
                            id: id,
                            drafts: 1
                        }
                        let res = this.$api.user.resubmitDiary(params);
                        console.log(res)
                        if (res) {
                            this.reload();
                            this.$toast('成功！可在日记本中查看！');
                        }
                    }).catch(err => {
                        this.$toast('取消')
                    })

            }
        },
        created() {
            this.getDiaryList();
        }
    }
</script>
<style scoped>
    @import '../style/diaryViews/index.css';
</style>