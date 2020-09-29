<template>
        <div>
            <mt-header fixed title="新建日记">
                <router-link to slot="left">
                    <i class ="iconfont icon-fanhui2"  style="font-size:20px" @click="toback"></i>
                </router-link>
                <router-link to slot="right">
                    <i class ="iconfont icon-fenxiang" @click="saveHtml(1)"></i>
                </router-link>
            </mt-header>
         <div style="position: relative;width:100%;height:630px;background:#fff">
            <div style="width:100%;height:200px;background:#b0e6d1">
                <img v-show="upload!=''" :src="upload" style="width:100%;height:200px;">
                <img src="../assets/pic/相机.png" @click="setAvatar" id="camera">
                <input type="file" ref="avatarInput" style="display:none" name="file" @change="getFile($event)">
            </div>
            <van-field v-model="title" placeholder="标题（不能超过20字）" maxlength="20" autofocus style="position: relative;top:0px;"/>
            <div class="edit_container" style="position: relative;top:0px">
                <quill-editor 
                    v-model.trim="content" 
                    ref="myQuillEditor" 
                    :options="editorOption" 
                    @blur="onEditorBlur($event)" @focus="onEditorFocus($event)"
                    @change="onEditorChange($event)">
                </quill-editor>
            </div>
        </div>
    </div>
</template>
<script>
import axios from 'axios'
export default{
    name:'diaryContent',
    data(){
        return{
            weather:'',
            mood:'',
            time:this.$moment().format('YYYY-MM-DD HH:mm:ss'),
            upload:'',
            title:'',
            content:``,
            editorOption: {
                theme:'bubble',
                placeholder: '输入内容...',
                modules:{
            toolbar:[
              ['bold', 'italic', 'underline'],    //加粗，斜体，下划线，删除线
              [{ 'size': ['small', false, 'large', 'huge'] }], // 字体大小
              [{ 'color': [] }],     // 字体颜色，字体背景颜色
              [{ 'align': [] }],    //对齐方式
              ['clean'],    //清除字体样式
            ]
          },
        }      
        }
    },
    methods: {
        onEditorReady(editor) { // 准备编辑器
            console.log('---'+editor)
        },
        onEditorBlur(){
            console.log('content:'+this.content.length)
        }, // 失去焦点事件
        onEditorFocus(){}, // 获得焦点事件
        onEditorChange(){
            console.log('content:'+this.content);
            console.log('content:'+this.content.length);
        }, // 内容改变事件
        setAvatar:async function() {
            this.$refs.avatarInput.click()
        },
        getFile(event) {
            this.file = event.target.files[0];
            let that = this;
            let fileReader = new FileReader();
            fileReader.readAsDataURL(this.file);
            fileReader.onload = function () {
            that.upload = this.result;
        }},
        saveHtml:async function(num){
           const user_id=JSON.parse(localStorage.getItem('userInfo')).user_id;
           let params={
                user_id:user_id,
                weather:this.weather,
                mood:this.mood,
                title:this.title,
                content:this.content,
                time:this.time,
                realwea:localStorage.getItem('wea'),
                drafts:num
                 }
            let res = await this.$api.user.saveDiary(params);
            console.log(res.resid.id)
            const id=res.resid.id;
           if(this.file){
            const formData = new FormData();
                    formData.append('user_id', user_id);
                    formData.append('file', this.file);
                    console.log(formData.get('file'));
                    console.log('id:'+formData.get('user_id'));
                    const url = `http://localhost:3000/api/uploadDiaryPhoto`+ `/${id}`;
                    var config = {
                        headers: {
                            'Content-type': 'application/x-www-form-urlencoded',
                        },
                     }; 
                axios.post(url, formData, config)
                .then(res => {
                    console.log(res)
                    this.$toast({
                        message:res.data.msg,
                        duration:1000
                     })
                    var that=this;
                    setTimeout(function () {
                        that.$router.replace('/diary/diaryBook')
                    }, 1100)
                }).catch(err => {
                    this.$toast({
                        message:'保存失败，重新试试',
                        duration:2000
                })
                })
            }else{
                if(res.code==1){
                    this.$toast({
                        message:'保存成功',
                        duration:1000
                         })
                        var that=this;
                        setTimeout(function () {
                          that.$router.replace('/diary/diaryBook')
                        }, 1100)
                }else if(res.code==-1){
                    this.$toast('保存失败，请再试试！')
                }
            }
           
        },
        toback:async function(){
            if(this.file||this.title!=''||this.content!=''){
                this.$messagebox.confirm("要保存到草稿箱吗")
            .then(action => {
                this.saveHtml(0);
                this.$toast({
                    message:'保存成功',
                    duration:1000
                  })
                var that=this;
                setTimeout(function () {
                    that.$router.replace('/')
                }, 1100)
            }).catch(err=>{
                this.$router.push('/');
            })
            }else{
                this.$router.go(-1);
            }
        },
    },
    computed: {
        editor() {
            return this.$refs.myQuillEditor.quill;
        }
    },
    created:function(){
        this.weather=this.$route.params.weather;
        this.mood=this.$route.params.mood;
        console.log(this.weather,this.mood);
    },
    beforeRouteLeave(to, from, next) {
        to.meta.keepAlive = true;
        next();
    }
}
</script>
<style>
.ql-container {
    height: 320px;
    font-size:16px;
}
</style>
<style scoped>
.mint-header{
    font-size:16px;
    color:black;
    background:#fff;
}
#camera{
    width:40px;
    height:40px;
    position:absolute;
    top:100px;
    left:170px; 
    z-index:2;
}
</style>
