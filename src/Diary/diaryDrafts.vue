<template>
    <div>
        <mt-header fixed title="草稿箱">
            <router-link to slot="left">
                <i class ="iconfont icon-fanhui2" @click="$router.go(-1)" style="font-size:20px"></i>
            </router-link>
        </mt-header>
        <div style="position: relative;top:46px;background:#fff;height:645px">
            <div v-for="item in arr" style="position:relative;top:20px;left:16px;">
                <div style="position: relative;margin-bottom:40px;">
                    <span  @click="jump(item.id)">{{item.title}}</span>
                    <van-button type="default" @click="resubmit(item.id)" size="small" style="position: absolute;left:280px;">重发</van-button><br/>
                    <span style="color:#828282;font-size:13px;">{{$moment(item.time).format('MM-DD HH:mm')}}</span><br/>
                    <div  @click="jump(item.id)"><img :src='require(`../../../../koaS/koaPass/public/diaryimg/${item.picture}`)' style="width:70px;height:70px;float:left;position: relative;top:10px;"></div>
                    <div v-html="item.content"  @click="jump(item.id)" class="van-multi-ellipsis--l2" style="letter-spacing:2px;margin-top:1px;left:10px;position: relative;width:60%;">{{item.content}}</div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
export default{
    inject:['reload'],
    name:'diaryDrafts',
    data(){
        return{
            arr:[]
        }
    },
    methods:{
        jump(id){
            this.$router.replace(`/diary/diaryDetail/${id}`)
        },
        getDiaryList:async function(){
            const user_id=JSON.parse(localStorage.getItem('userInfo')).user_id;
           let params={
               user_id:user_id,
               drafts:0 //区分草稿箱
           }
           let res = await this.$api.user.getDiaryList(params);
           if(res.code==1){
             console.log(res.list);
             this.arr=res.list
           }
         },
         resubmit:async function(id){
            this.$messagebox.confirm("要保存到日记本中吗")
            .then(action => {
                let params={
                    id:id,
                    drafts:1
                }
                let res =  this.$api.user.resubmitDiary(params);
                console.log(res)
                if(res){
                    this.reload();
                    this.$toast('成功！可在日记本中查看！'); 
                }
            }).catch(err=>{
                this.$toast('取消')
            })
            
         }
    },
    created(){
        this.getDiaryList();
    }
}
</script>