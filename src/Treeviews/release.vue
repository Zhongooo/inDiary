<template>
        <div style="background: whitesmoke;height:630px">
            <mt-header fixed title="发布树洞">
                <router-link to="/Tree" slot="left">
                    <i class ="iconfont icon-fanhui2" style="font-size:20px"></i>
                </router-link>
                <router-link to slot="right">
                        <i class ="iconfont icon-fenxiang" @click="submit"></i>
                    </router-link>
            </mt-header>
            <div style="position: relative;top:46px">
                    <div class="changefield"><van-field v-model="title" placeholder="请输入一个完整的标题..." /></div>
                    <van-field
                        v-model="content"
                        rows="10"
                        autosize
                        type="textarea"
                        maxlength="400"
                        placeholder="内容..."
                        show-word-limit
                        />
            </div>
            <van-uploader v-model="fileList" :after-read="onRead" :before-delete="toDel" max-count="3" capture multiple style="position: relative;top:60px;left:10px;"/>
    </div>
</template>
<script>
import axios from 'axios'
export default{
    name:'release',
    data(){
        return{
            title:'',
            content:'',
            picture:'',
            fileList: [
                
             ],
            postData:[]
        }
    },
    methods:{
        submit:async function(){
            console.log(this.picture instanceof Array)
            if(this.picture){
                let formData=new FormData();
                if(this.postData.length>1) {    
                    for(var i=0;i<this.postData.length;i++){
                        console.log('picture:'+this.postData[i])
                        formData.append("file",this.postData[i]);
                    }
                    console.log('formData',formData.getAll('file'))
                }else{
                    formData.append("file", this.picture);
                    console.log('formData',formData.get('file'))
                }
                // formData.append('file',this.picture);
                const user_id=JSON.parse(localStorage.getItem('userInfo')).user_id;
                const title=this.title;
                const content=this.content;
                const url = `http://localhost:3000/api/uploadTreePhoto`+ `/${user_id}/${title}/${content}`;
                var config = {
                    headers: {
                        'Content-type': 'application/x-www-form-urlencoded',
                    }
                }; 
                axios.post(url, formData, config)
                .then(res => {
                    console.log(res)
                    this.$toast({
                        message:'发布成功',
                        duration:1000
                     })
                    var that=this;
                    setTimeout(function () {
                        that.$router.replace('/Tree')
                    }, 1100)
                }).catch(err => {
                    this.$toast({
                        message:'保存失败，重新试试',
                        duration:2000
                })
                })
            }else if(!this.picture){
                let params={
                    user_id:JSON.parse(localStorage.getItem('userInfo')).user_id,
                    title:this.title,
                    content:this.content
                }
                let res = await this.$api.user.addTreeMain(params);
                if(res.code==1){
                    this.$toast({
                        message:'发布成功',
                        duration:1000
                     })
                    var that=this;
                    setTimeout(function () {
                        that.$router.replace('/Tree')
                    }, 1100)
                }
            }
        },
        onRead:async function(file){
            this.picture=file.file;
            this.postData.push(this.picture)
            console.log(this.postData.length)
        },
        toDel:async function(){
            this.postData.length--;
            console.log(this.postData.length)
        }
    }
}
</script>
<style>
.changefield .van-field__control {
    font-weight: bold;
    font-size:17px;
}
</style>