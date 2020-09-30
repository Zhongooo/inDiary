<template>
    <div>
        <mt-header title="我发布的" fixed>
            <router-link to slot="left">
                <i class="iconfont icon-fanhui2" style="font-size:20px" @click="jump"></i>
            </router-link>
                    
        </mt-header>
        <div class="treeContent" style="position: relative;top:36px;">

            <div class="contentout w" v-for="item in list">
                <span class="treeTitle">{{item.treetitle}}</span><br />
                <div class="clearfix">
                    <div :style="item.tree_pictures[0]==null?style2:style1" @click="getDetail(item.id)">
                        <img src="../assets/pic/good.jpg" class="avatar">
                        <span class="treename color">我</span><br />
                        <span class="maincontent van-multi-ellipsis--l2">{{item.treecontent}}</span>
                    </div>
                    <div v-if="item.tree_pictures[0]!=null" class="checkpic">
                        <img :src='item.tree_pictures[0]!=null?require(`../../../../koaS/koaPass/public/tree/${item.tree_pictures[0].path}`):null'
                            width="80rem" height="80rem" />
                    </div>
                </div>
                <div :class="item.tree_pictures[0]==null?like:like2" class="lastcontent w">
                    <span class="contentOne">
                        <van-icon name="good-job-o" size="1.5rem" />
                        <span class="color iconfontSize">{{item.thumbs}}</span>
                    </span>
                    <span class="contentTwo">
                        <van-icon name="comment-o" size="1.5rem" />
                        <span class="color iconfontSize">666</span>
                    </span>

                </div>
                <van-divider />

            </div>


        </div>
        <div style="height:5em"></div>
    </div>
</template>
<script>
    export default {
        name: 'Tree',
        data() {
            return {
                value: '',
                pic: '1',
                style1: 'float: left;width:70%;',
                style2: '',
                like: 'margin-top:10px;',
                like2: 'position: relative;top:-30px;left:3px;',
                list: [],
                arr: []
            }
        },
        methods: {
            jump() {
                this.$router.go(-1)
            },
            onSearch(val) {
                this.$toast(val);
            },
            focus() {
                this.$toast('yihhh');
            },
            getList: async function () {
                const params = { user_id: JSON.parse(localStorage.getItem('userInfo')).user_id }
                const res = await this.$api.user.getUserTree(params);
                this.list = res.list;
                console.log(this.list);
            },
            getDetail: async function (id) {
                this.$router.push(`/tree/treecontent/${id}`);
            }
        },
        created() {
            this.getList();
        }
    };
</script>
<style scoped>
    @import '../style/treeviews/index.css';
</style>