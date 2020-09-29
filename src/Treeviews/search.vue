<template>
    <div>
        <form action="/">
            <van-search v-model="value" placeholder="大家都在搜:狗血爱情故事" @search="onSearch" @focus="focus" @cancel="onCancel"
                show-action clearable autofocus background="#b0e6d1" shape="round" />
        </form>
        <div class="contentout w" v-for="(item,index) in arr">
            <span class="treeTitle">{{item.treetitle}}</span><br />
            <div :style="item.tree_pictures[0]==null?style2:style1" @click="getDetail(item.id)">
                <img src="../assets/pic/good.jpg" class="avatar">
                <span class="treename color">匿名网友</span><br />
                <span class="maincontent van-multi-ellipsis--l2">{{item.treecontent}}</span>
            </div>
            <div v-if="item.tree_pictures[0]!=null" class="planb">
                <img :src='item.tree_pictures[0]!=null?require(`../../../../koaS/koaPass/public/tree/${item.tree_pictures[0].path}`):null'
                    class="contentImg" />
            </div>
            <div class="lastcontent w">
                <span class="contentOne">
                    <i :class="icon2" :style="userThumbs.includes(item.id)?color:''" ref="clickthumbs"
                        @click="Tothumbs(index,item.id)">
                    </i>
                    <span class="color">{{item.thumbs}}</span>
                </span>
                <span class="contentTwo">
                    <i class="iconfont icon-shouye1"></i>
                    <span class="color">{{item.commentNum}}</span>
                </span>
            </div>
            <van-divider />
        </div>
    </div>
</template>
<script>
    export default {
        name: 'search',
        data() {
            return {
                value: '',
                style1: 'float: left;width:70%;',
                style2: '',
                list: [],
                arr: [],
                userThumbs: [],
                id: JSON.parse(localStorage.getItem('userInfo')).user_id,
                icon2: 'iconfont icon-icon7',
                icon1: 'iconfont icon-icon_dianzan-mian',
                color: 'color:#b0e6d1'
            }
        },
        methods: {
            Tothumbs: async function (index, tree_id) {
                console.log(index);
                if (this.$refs.clickthumbs[index].style.color == '') {
                    this.$refs.clickthumbs[index].style.color = '#b0e6d1';
                    this.arr[index].thumbs++;
                    const params = {
                        tree_id: tree_id,
                        user_id: this.id,
                        handle: 'add'
                    }
                    await this.$api.user.Thumbs(params);
                }
                else if (this.$refs.clickthumbs[index].style.color == 'rgb(176, 230, 209)') {
                    this.$refs.clickthumbs[index].style.color = '';
                    this.arr[index].thumbs--;
                    const params = {
                        tree_id: tree_id,
                        user_id: this.id,
                        handle: 'decrease'
                    }
                    await this.$api.user.Thumbs(params);
                }
                console.log(this.$refs.clickthumbs[index].style.color)
                // this.$refs.btn[id].style.background="#b0e6d1";
            },
            onSearch(val) {
                this.arr = this.list.filter((item, index) =>
                    item.treetitle.includes(this.value) || item.treecontent.includes(this.value))
            },
            focus() {

            },
            onCancel() {
                this.$router.go(-1);
            },
            getList: async function () {
                const res = await this.$api.user.getTreeList();
                this.list = res.list;
                console.log(this.list);
            },
            getThumbsUser: async function () {
                const params = { user_id: this.id };
                const res = await this.$api.user.getThumbsUser(params);
                for (var i = 0; i < res.list.length; i++) {
                    this.userThumbs.push(res.list[i].tree_id)
                }
                console.log(JSON.stringify(res.list) + 'thumbs:' + this.userThumbs)
            },
            getDetail: async function (id) {
                this.$router.push(`/tree/treecontent/${id}`);
            }
        },
        created() {
            this.getList();
            this.getThumbsUser();
        },
        beforeRouteLeave(to, from, next) {
            if (to.name == 'Tree') {
                this.$store.commit('noKeepAlive')
            }
            next()
        }
    }
</script>
<style scoped>
    @import '../style/treeviews/index.css'
</style>