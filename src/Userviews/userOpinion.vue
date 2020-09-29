<template>
        <div style="background: whitesmoke;height:630px">
            <mt-header fixed title="用户反馈">
                <router-link to slot="left">
                    <i class ="iconfont icon-fanhui2" style="font-size:20px" @click="back"></i>
                </router-link>
                <router-link to slot="right">
                    <i class ="iconfont icon-icon" style="font-size:26px" @click="submit"></i>
                </router-link>
            </mt-header>
        <div style="margin-top:50px;margin-left:10px;">
            <span>请给这次的推送评分：</span><br/>
             <van-rate v-model="value" size="30px" style="margin-top:10px;"/><br/>
             <span style="position: relative;top:10px;">请填写对于心情推送的意见：</span><br/>
             <van-field
                v-model="content"
                rows="10"
                autosize
                type="textarea"
                maxlength="400"
                placeholder="..."
                show-word-limit
                style="position: relative;top:20px;left:2px;width:96%;"
            />
        </div>
        </div>
</template>
<script>
export default{
    name:'userOpinion',
    data(){
        return{
            value:0,
            content:''
        }
    },
    methods:{
        back(){
            this.$router.go(-1);
        },
        submit:async function(){
            let params={
                user_id:JSON.parse(localStorage.getItem('userInfo')).user_id,
                id:this.$route.params.id,
                value:this.value,
                content:this.content
            }
            const res=await this.$api.user.userOpinion(params);
            if(res.code==1){
                this.$toast({
                        message:'发布成功',
                        duration:1000
                        })
                    var that=this;
                    setTimeout(function () {
                        that.$router.go(-1);
                    }, 1100)
                }
        }
    }
}
</script>
<style >
</style>
