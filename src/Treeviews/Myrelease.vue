<template>
    <div>
        <mt-header title="我发布的" fixed>
            <router-link to slot="left">
                <i class="iconfont icon-fanhui2" style="font-size:20px" @click="jump"></i>
            </router-link>
                    
        </mt-header>
        <div class="treeContent" style="position: relative;top:36px;">
            <div class="maincontent">
                <div class="contentout" v-for="item in list">
                    <span class="treeTitle" style="font-size:16px;">{{item.treetitle}}</span><br />
                    <div :style="item.tree_pictures[0]==null?style2:style1" @click="getDetail(item.id)">
                        <img src="../assets/pic/good.jpg" width="32px" height="32px" style="border-radius: 20px;">
                        <span class="treename">我</span><br />
                        <span class="van-multi-ellipsis--l2 content12">{{item.treecontent}}</span>
                    </div>
                    <div v-if="item.tree_pictures[0]!=null" class="checkpic">
                        <img :src='item.tree_pictures[0]!=null?require(`../../../../koaS/koaPass/public/tree/${item.tree_pictures[0].path}`):null'
                            width="80px" height="80px" />
                    </div>
                    <div :class="item.tree_pictures[0]==null?like:like2">
                        <van-icon name="good-job-o" /><span style="color:#666;">{{item.thumbs}}</span>
                        <van-icon name="comment-o" style="margin-left:20px;" /><span style="color:#666;">666</span>
                    </div>
                    <van-divider />
                </div>
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
                like: 'position:relative;margin-top:10px;',
                like2: 'position: absolute;top:-30px;left:3px;',
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
    .treeContent {
        position: relative;
        top: -30px;
    }

    .maincontent {
        position: relative;
        width: 100%;
        margin-top: 8px;
        border-radius: 10px;
        background: #fff;
    }

    .treename {
        color: #666;
        font-size: 14px;
        position: relative;
        top: -8px;
        left: 6px;
    }

    .contentout {
        position: relative;
        left: 13px;
        width: 94%;
        top: 10px;
    }

    .content12 {
        color: #828282;
        font-size: 13px;
        letter-spacing: 2px;
        margin-top: 1px;
    }

    .checkpic {
        float: left;
        width: 30%;
        position: relative;
        right: -20px
    }
</style>