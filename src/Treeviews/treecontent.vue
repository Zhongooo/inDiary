<template>
    <div class="treecontent" style="background:#fff;height:100%">
        <mt-header fixed>
            <router-link to slot="left">
                <i class="iconfont icon-fanhui2" style="font-size:20px" @click="jump"></i>
            </router-link>
                    
        </mt-header>
        <div style="position: relative;top:40px;left:16px;width:92%;" @click="tabshow">
            <div><span style="font-size:17px;letter-spacing:2px;">{{list.treetitle}}</span></div>
            <div style="float:left">
                <img src="../assets/pic/good.jpg" id="mypic">
            </div>
            <div style="position: relative;left:10px;margin-top:3px;color:#828282;font-size:15px;width:310px;">
                <span>{{id==list.user_id?'我':'匿名网友唐僧哥'}}</span><span v-show="id==list.user_id">
                    <van-tag plain style="margin-left:10px">本人</van-tag>
                </span><br />
                <span>{{$moment(list.time).format('YYYY-MM-DD')}}</span>
            </div>
            <div id="treemain">
                <span>{{list.treecontent}}</span><br />
                <img v-for="item in list.tree_pictures"
                    :src="require(`../../../../koaS/koaPass/public/tree/${item.path}`)"
                    style="width:105px;height:105px;margin-top:10px;margin-right:6px;">
            </div>
        </div>
        <div style="width:395px;height:5px;background: rgb(231, 231, 231);position: relative;top:56px;"></div>
        <van-tabs v-model="active" color="#b0e6d1" line-width="30px" sticky :offset-top="30"
            style="position: relative;top:60px">
            <van-tab title="回复">
                <span @click="tabshow" v-if="showalert"
                    style="color:#828282;font-size:14px;letter-spacing: 2px;position:relative;left:142px;top:20px;">暂无回复</span>
                <div class="contentout" v-for="(item,index) in commentList" @click="tabshow">
                    <img :src="require(`../../../../koaS/koaPass/public/images/${item.user.headpic}`)" width="32px"
                        height="32px" style="border-radius: 20px;">
                    <span class="treename">{{item.user.user_name}}</span>
                    <br />
                    <span id="comment">{{item.content}}</span>
                    <div class="likelike">
                        <span
                            style="color:#828282;font-size:13px;position: relative;left:23px;">{{$moment(item.time).format('MM-DD HH:mm')}}</span>
                        <div class="rightlike">
                            <i class="iconfont icon-icon7" :style="userThumbs.includes(item.id)?color:''"
                                ref="clickthumbs" @click="Tothumbs(index,item.id)"></i><span
                                style="color:#666">{{item.thumbs==0?'赞':item.thumbs}}</span>
                        </div>
                    </div>
                </div>

            </van-tab>
            <van-tab title="点赞">
                <div class="thumbs">
                    <img src="../assets/pic/good.jpg" width="32px" height="32px" style="border-radius: 20px;">
                    <span class="thumbsname">匿名网友大牛哥</span>
                    <span class="thumbstime">1分钟前</span>
                </div>
                <div class="thumbs">
                    <img src="../assets/pic/beauty.jpg" width="32px" height="32px" style="border-radius: 20px;">
                    <span class="thumbsname">匿名网友艳子</span>
                    <span class="thumbstime">6分钟前</span>
                </div>
            </van-tab>
        </van-tabs>
        <mt-tabbar fixed v-show="active==0">
            <mt-tab-item>
                <van-field v-model="message" rows="1" autosize type="textarea" maxlength="180" placeholder="写评论..."
                    @focus="focus" @blur="blur" />
                <!-- <input type="text" id="inputcss" placeholder="写评论..."> -->
            </mt-tab-item>
            <mt-tab-item>
                <van-button v-if="!showtab" size="small" @click="submit" style="position: relative;top:6px;left:6px;">发布
                </van-button>
            </mt-tab-item>
            <mt-tab-item>
                <i v-if="showtab" class="iconfont icon-fenxiang"
                    style="font-size:30px;position:relative;left:-20px;"></i>
            </mt-tab-item>
            <mt-tab-item>

                <van-icon v-show="showtab" :name="goodname" @click="Thumbs" size="30px"
                    style="position:relative;left:-10px;" />
            </mt-tab-item>
        </mt-tabbar>
        <van-action-sheet v-model="show" :actions="actions" />
        <div style="height:8em"></div>
    </div>
</template>
<script>
    export default {
        inject: ['reload'],
        name: 'treecontent',
        data() {
            return {
                show: false,
                actions: [{ name: '投诉' }],
                active: '1',
                list: [],
                commentList: [],
                id: JSON.parse(localStorage.getItem('userInfo')).user_id,
                message: '',
                showtab: true,
                showalert: false,
                goodname: '',
                userThumbs: [],
                color: 'color:#b0e6d1'
            }
        },
        methods: {
            Tothumbs: async function (index, comment_id) {
                console.log(index);
                if (this.$refs.clickthumbs[index].style.color == '') {
                    this.$refs.clickthumbs[index].style.color = '#b0e6d1';
                    this.commentList[index].thumbs++;
                    const params = {
                        comment_id: comment_id,
                        user_id: this.id,
                        handle: 'add'
                    }
                    await this.$api.user.commentCount(params);
                }
                else if (this.$refs.clickthumbs[index].style.color == 'rgb(176, 230, 209)') {
                    this.$refs.clickthumbs[index].style.color = '';
                    this.commentList[index].thumbs--;
                    const params = {
                        comment_id: comment_id,
                        user_id: this.id,
                        handle: 'decrease'
                    }
                    await this.$api.user.commentCount(params);
                }
            },
            CommentThumbs: async function () {
                const params = { user_id: this.id };
                const res = await this.$api.user.CommentThumbs(params);
                for (var i = 0; i < res.list.length; i++) {
                    this.userThumbs.push(res.list[i].comment_id)
                }
                console.log(JSON.stringify(res.list) + 'thumbs:' + this.userThumbs)
            },
            ellipsis: async function () {
                this.show = true;
            },
            getList: async function () {
                const params = { tree_id: this.$route.params.id }
                const res = await this.$api.user.getTreeDetail(params);
                this.list = res.list;
                console.log('list:' + this.list);
            },
            submit: async function () {
                this.showtab = false;
                if (this.message != '') {
                    const params = {
                        tree_id: this.$route.params.id,
                        user_id: this.id,
                        content: this.message
                    }
                    const res = await this.$api.user.addComment(params);
                    console.log(res.code)
                    if (res.code == 1) {
                        this.reload();
                    }
                } else {
                    this.$toast('评论内容不能为空(⊙o⊙)')
                }
            },
            getComment: async function () {
                const params = { tree_id: this.$route.params.id }
                const res = await this.$api.user.getComment(params);
                if (res.list == '') {
                    this.showalert = true;
                }
                this.commentList = res.list;
                console.log('comments:' + this.commentList);
            },
            Thumbs: async function () {
                if (this.goodname == 'good-job-o') {
                    this.goodname = 'good-job';
                    const params = {
                        tree_id: this.$route.params.id,
                        user_id: this.id,
                        handle: 'add'
                    }
                    await this.$api.user.Thumbs(params);
                } else if (this.goodname == "good-job") {
                    this.goodname = 'good-job-o';
                    const params = {
                        tree_id: this.$route.params.id,
                        user_id: this.id,
                        handle: 'decrease'
                    }
                    await this.$api.user.Thumbs(params);
                }
            },
            getThumbs: async function () {
                const params = {
                    tree_id: this.$route.params.id,
                    user_id: this.id
                }
                const res = await this.$api.user.getThumbs(params);
                console.log('data:' + res.code)
                if (res.code == 1) {
                    this.goodname = 'good-job'
                } else if (res.code == -1) {
                    this.goodname = 'good-job-o'
                }
            },
            focus() {
                this.showtab = false
            },
            blur() {
                // this.showtab=true
            },
            tabshow() {
                this.showtab = true;
            },
            jump() {
                this.$router.go(-1);
            }
        },
        created() {
            this.getList();
            this.getComment();
            this.getThumbs();
            this.CommentThumbs();
        }
    }
</script>
<style scoped>
    .mint-tabbar {
        border-top: 2px solid whitesmoke;
    }

    #inputcss {
        position: relative;
        border-radius: 10px;
        height: 25px;
        width: 200px;
        top: 3px;
        left: 30px;
    }

    #mypic {
        width: 40px;
        height: 40px;
        border-radius: 20px;
    }

    #treemain {
        position: relative;
        margin-top: 8px;
        /* background: lightcoral; */
    }

    .contentout {
        position: relative;
        top: 6px;
        left: 13px;
        width: 94%;
    }

    .treename {
        color: #666;
        font-size: 14px;
        position: relative;
        top: -8px;
        left: 6px;
    }

    #comment {
        font-size: 15px;
        margin-top: 1px;
        position: relative;
        left: 26px;
        width: 90%;
        display: block
    }

    .thumbs {
        position: relative;
        top: 6px;
        left: 13px;
        width: 94%;
        margin-bottom: 10px;
    }

    .thumbsname {
        font-size: 14px;
        position: relative;
        top: -8px;
        left: 8px;
    }

    .thumbstime {
        position: relative;
        left: 20px;
        top: -9px;
        color: #828282;
        font-size: 12px;
    }

    .rightlike {
        position: relative;
        left: 300px;
        top: -26px;
    }

    .rightlike i {
        font-size: 22px;
    }

    .rightlike span {
        font-size: 14px;
    }

    #ellipsis {
        position: relative;
        margin-left: 220px;
        margin-top: -10px;
    }

    element.style {
        height: 48px;
    }
</style>
<style>
    .treecontent .van-field__control {
        display: block;
        box-sizing: border-box;
        width: 260px;
        min-width: 0;
        margin: 0;
        padding: 0;
        text-align: left;
        background-color: transparent;
        border: 1px solid whitesmoke;
        resize: none;
        border-radius: 10px;
    }
</style>