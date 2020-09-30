<template>
    <div class="userdatas">
        <mt-header fixed title="个人资料">
            <router-link to="/user" slot="left">
                <i class="iconfont icon-fanhui2" style="font-size:20px"></i>
            </router-link>
            <router-link to slot="right">
                <i class="iconfont icon-baocun" style="font-size:28px" @click="save"></i>
            </router-link>
                    
        </mt-header>
        <div class="userbg w">
            <div class="bg-css w">
                <img :src="imgsrc" @click="setAvatar" class="avatar">
                <img src="../assets/pic/相机.png" @click="setAvatar" id="camera">
                <input type="file" ref="avatarInput" style="display:none" name="file" @change="getFile($event)">

            </div>
        </div>
        <van-cell-group>
            <van-field v-model="name" label="昵称" placeholder="未填写" input-align="right" />
            <van-field v-model="id" label="用户id" placeholder="未填写" input-align="right" readonly />
            <van-field v-model="sex" label="性别" placeholder="未填写" input-align="right" />
            <van-field v-model="age" label="年龄" placeholder="未填写" input-align="right" />
            <van-field v-model="time" label="已注册" placeholder="未填写" input-align="right" readonly />
        </van-cell-group>
    </div>
</template>
<script>
    import axios from 'axios'
    export default {
        name: 'personalData',
        data() {
            return {
                imgsrc: '',
                name: '',
                id: '',
                sex: '',
                age: '',
                time: ''
            }
        },
        methods: {
            setAvatar() {
                this.$refs.avatarInput.click()
            },
            //实时显示图片在页面 
            getFile(event) {
                this.file = event.target.files[0];
                let that = this;
                let fileReader = new FileReader();
                fileReader.readAsDataURL(this.file);
                fileReader.onload = function () {
                    that.imgsrc = this.result;
                }
            },
            save: async function () {
                let params = {
                    user_id: this.id,
                    username: this.name,
                    sex: this.sex,
                    age: this.age
                }
                let res = await this.$api.user.saveinfo(params)
                //上传头像
                if (this.file) {
                    const formData = new FormData();
                    const user_id = this.id;
                    formData.append('user_id', user_id);
                    formData.append('file', this.file);
                    console.log(formData.get('file'));
                    console.log('id:' + formData.get('user_id'));
                    const url = `http://localhost:3000/api/uploadPortrait` + `/${user_id}`;
                    var config = {
                        headers: {
                            'Content-type': 'application/x-www-form-urlencoded',
                        },
                    };
                    axios.post(url, formData, config)
                        .then(res => {
                            console.log(res)
                            this.$toast({
                                message: res.data.msg,
                                duration: 2000
                            })
                        }).catch(err => {
                            this.$toast({
                                message: '保存失败，重新试试',
                                duration: 2000
                            })
                        })
                } else {
                    if (res.code == 1) {
                        this.$toast('保存成功！')
                    } else {
                        this.$toast('保存失败，重新试试')
                    }
                }
            },

        },
        created: async function () {
            let params = { user_id: JSON.parse(localStorage.getItem('userInfo')).user_id }
            const res = await this.$api.user.getInfo(params);
            console.log(res.user)
            this.name = res.user.user_name;
            this.id = res.user.user_id;
            this.sex = res.user.sex;
            this.age = res.user.age;
            if (res.user.headpic) {
                const pic = res.user.headpic;
                this.imgsrc = require(`../../../../koaS/koaPass/public/images/${pic}`)
            } else {
                this.imgsrc = require('../assets/pic/good.jpg')
            }
            const time1 = this.$moment();
            const time2 = this.$moment(res.user.time);
            this.time = time1.diff(time2, 'day') + '天';
        }
    }
</script>
<style scoped>
    @import '../style/userviews/datas.css';

    .mint-header {
        font-size: 0.7rem;
        color: black;
        background: #fff;
    }
</style>
<style>
    .van-field__control {
        margin: 0.3rem;

        color: #666;
    }

    .van-cell {
        font-size: 0.6rem;
    }

    .van-field__control--right {
        font-size: 0.6rem;
    }
</style>