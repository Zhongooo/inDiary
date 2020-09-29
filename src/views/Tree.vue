<template>
    <div class="tree" >
       <van-sticky>
        <form action="/">
            <van-search
                v-model="value"
                placeholder="大家都在搜:狗血爱情故事"
                @search="onSearch"
                @focus="focus"
                clearable
            />
            </form>
            
            <van-icon name="edit" size="26px" @click="tojump"
            style="position:relative;top:-40px;z-index:1;left:90%"/>
            <van-icon name="envelop-o" @click="envelop" size="26px"
            style="position:relative;top:-40px;z-index:1;left:-10px"/>
            <div v-if="dot" class="dot"></div>
        </van-sticky>
        <div class="treeContent">
                <van-grid :border="false" :column-num="3">
                    <van-grid-item icon="records" text="我的发布" @click="myrelease"/>
                    <van-grid-item icon="smile-comment-o" text="我的评论" />
                    <van-grid-item icon="good-job-o" text="我的点赞" />
                </van-grid>
                    <van-tabs v-model="active" color="#b0e6d1" animated swipeable sticky :offset-top="50">
                        <van-tab title="热门">
                            <div class="maincontent">
                                    <div class="contentout"  v-for="(item,index) in hotlist">
                                        <span class="treeTitle" style="font-size:17px;">{{item.treetitle}}</span><br/>
                                            <div :style="item.tree_pictures[0]==null?style2:style1" @click="getDetail(item.id)">
                                                <img src="../assets/pic/good.jpg" width="32px" height="32px" 
                                                style="border-radius: 20px;">
                                                <span class="treename">匿名网友</span><br/>
                                                <span class="van-multi-ellipsis--l2" style="color:#828282;
                                                font-size:13px;letter-spacing:2px;margin-top:1px;">{{item.treecontent}}</span>
                                            </div>
                                            <div v-if="item.tree_pictures[0]!=null" style="float: left;width:30%;position: relative;right:-20px">
                                                <img :src='item.tree_pictures[0]!=null?require(`../../../../koaS/koaPass/public/tree/${item.tree_pictures[0].path}`):null' width="80px" height="80px"/>
                                            </div>
                                        <div>
                                            <span style="position: relative;left:40px;"><i :class="icon2" :style="userThumbs.includes(item.id)?color:''" ref="clickthumbs" @click="Tothumbs(index,item.id)"></i><span style="color:#666;position: relative;left:6px;">{{item.thumbs}}</span></span>
                                            <span style="position: relative;left:180px;"><i class="iconfont icon-shouye1 "></i><span style="color:#666;position: relative;left:6px;">{{item.commentNum}}</span></span>
                                        </div>
                                        <van-divider />
                                    </div>
                                </div>


                        </van-tab>
                        <van-tab title="问答">
                            <div class="maincontent">
                                <div class="contentout"  v-for="(item,index) in list">
                                    <span class="treeTitle" style="font-size:17px;">{{item.treetitle}}</span><br/>
                                        <div :style="item.tree_pictures[0]==null?style2:style1"  @click="getDetail(item.id)">
                                            <img src="../assets/pic/good.jpg" width="32px" height="32px" 
                                            style="border-radius: 20px;">
                                            <span class="treename">匿名网友</span><br/>
                                            <span class="van-multi-ellipsis--l2" style="color:#828282;
                                            font-size:13px;letter-spacing:2px;margin-top:1px;">{{item.treecontent}}</span>
                                        </div>
                                        <div v-if="item.tree_pictures[0]!=null" style="float: left;width:30%;position: relative;right:-20px">
                                            <img :src='item.tree_pictures[0]!=null?require(`../../../../koaS/koaPass/public/tree/${item.tree_pictures[0].path}`):null' width="80px" height="80px"/>
                                        </div>
                                    <div>
                                        <span style="position: relative;left:40px;"><i :class="icon2" :style="userThumbs.includes(item.id)?color:''" ref="clickthumbs2" @click="Tothumbs2(index,item.id)"></i><span style="color:#666;position: relative;left:6px;">{{item.thumbs}}</span></span>
                                        <span style="position: relative;left:180px;"><i class="iconfont icon-shouye1 " ></i><span style="color:#666;position: relative;left:6px;">{{item.commentNum}}</span></span>
                                    </div>
                                    <van-divider />
                                </div>
                            </div>
                        </van-tab>
                    </van-tabs>
        </div>
        <div style="height:5em"></div>
    </div>
</template>
<script>
export default {
    name: 'Tree',
    data () {
        return {
            value:'',
            active:'1',            
            pic:'1',
            style1:'float: left;width:70%;',
            style2:'',
            dot:'',
            list:[],
            hotlist:[],
            arr:[],
            userThumbs:[],
            id:JSON.parse(localStorage.getItem('userInfo')).user_id,
            icon2:'iconfont icon-icon7',
            icon1:'iconfont icon-icon_dianzan-mian',
            color:'color:#b0e6d1'
     }
    },
    methods: {
        Tothumbs:async function(index,tree_id){
            console.log(index);
            if(this.$refs.clickthumbs[index].style.color==''){
                this.$refs.clickthumbs[index].style.color='#b0e6d1';
                this.hotlist[index].thumbs++;
                const params={
                    tree_id:tree_id,
                    user_id:this.id,
                    handle:'add'
                }
                await this.$api.user.Thumbs(params);
            }
            else if(this.$refs.clickthumbs[index].style.color=='rgb(176, 230, 209)'){
                this.$refs.clickthumbs[index].style.color='';
                this.hotlist[index].thumbs--;
                const params={
                    tree_id:tree_id,
                    user_id:this.id,
                    handle:'decrease'
                }
                await this.$api.user.Thumbs(params);
            }
            console.log(this.$refs.clickthumbs[index].style.color)
            // this.$refs.btn[id].style.background="#b0e6d1";
        },
        Tothumbs2:async function(index,tree_id){
            console.log(index);
            if(this.$refs.clickthumbs2[index].style.color==''){
                this.$refs.clickthumbs2[index].style.color='#b0e6d1';
                this.hotlist[index].thumbs++;
                const params={
                    tree_id:tree_id,
                    user_id:this.id,
                    handle:'add'
                }
                await this.$api.user.Thumbs(params);
            }
            else if(this.$refs.clickthumbs2[index].style.color=='rgb(176, 230, 209)'){
                this.$refs.clickthumbs2[index].style.color='';
                this.hotlist[index].thumbs--;
                const params={
                    tree_id:tree_id,
                    user_id:this.id,
                    handle:'decrease'
                }
                await this.$api.user.Thumbs(params);
            }
            console.log(this.$refs.clickthumbs2[index].style.color)
            // this.$refs.btn[id].style.background="#b0e6d1";
        },
        onSearch(val) {
            this.$toast(val);
        },
        focus() {
            this.$router.push('/tree/search');
        },
        envelop(){
            this.$router.push('/Message');
        },
        tojump(){
            this.$router.push('/tree/release');
        },
        look(){
            this.$router.push('/tree/treecontent');
        },
        getHotList:async function(){
            const res=await this.$api.user.getHotList();
            this.hotlist=res.list;
            console.log('hotlist:'+this.hotlist);
        },
        getList:async function(){
            const res=await this.$api.user.getTreeList();
            this.list=res.list;
            console.log(this.list);
        },
        getThumbsUser:async function(){
            const params={user_id:this.id};
            const res=await this.$api.user.getThumbsUser(params);
            for(var i=0;i<res.list.length;i++){
                this.userThumbs.push(res.list[i].tree_id)
            }
            console.log(JSON.stringify(res.list)+'thumbs:'+this.userThumbs)
        },
        getDetail:async function(id){
            this.$router.push(`/tree/treecontent/${id}`);
        },
        myrelease(){
            this.$router.push('/tree/Myrelease')
        },
        findDot:async function(){
          let params={user_id:JSON.parse(localStorage.getItem('userInfo')).user_id}
          const res=await this.$api.user.findDot(params);
          if(res.code==1){
            this.dot=true
          }else if(res.code==0){
            this.dot=false
          }
        }
    },
    created(){
        this.getList();
        this.getHotList();
        this.getThumbsUser();
        this.findDot();
    }
};
</script>
<style scoped>
.dot{
    background: red;
    width:6px;
    height:6px;
    border-radius:6px;
    position: relative;
    left:45px;
    z-index:1001;
    float:left;
    top:-38px;
}
.tree i{
    font-size:22px;
}
.treeContent{
    position: relative;
    top:-30px;
}
.van-search{
    padding:10px 50px;
}
.van-search__content{
    border-radius:18px;
}
.maincontent{
    position: relative;
    width:100%;
    margin-top:6px;
    border-radius:10px;
    background:#fff;
}
.contentout{
    position: relative;
    left:13px;
    width:94%;
}
.treename{
    color:#666;
    font-size:14px;
    position: relative;
    top:-8px;
    left:6px;
}
/* .like2{
    position: absolute;
    top:100px;
    left:3px;
} */
</style>