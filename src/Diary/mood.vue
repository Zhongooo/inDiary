<template>
    <div>
        <mt-header fixed>
            <router-link to="/diary/weather" slot="left">
                <i class ="iconfont icon-fanhui2" style="font-size:20px"></i>
            </router-link>
        </mt-header>
        <div style="position: relative;width:100%;height:628px;background:#fff">
            <span id="ask">那么,<br/>这一天的心情又如何呢？</span><br/>
            <img :src="src" style="width:110px;height:110px;position: relative;top:100px;left:140px">
            <div v-for="item in list" style="position: relative;top:130px;left:23px">
                <div id="moodName" ref="btn" @click="showcolor(item.id,item.name)">{{item.name}}</div>
            </div>
            <van-button @click="jumpNext" style="position: relative;top:160px;width:200px;left:90px" color="black" plain round >我的心情是这样</van-button>

        </div>
        </div>
</template>
<script>
export default{
    name:'mood',
    data(){
        return{
            weather:'',
            checked:'',
            src:require('../assets/pic/mood/无想法.png'),
            list:[
                {id:0,name:'开心'},
                {id:1,name:'平静'},
                {id:2,name:'激动'},
                {id:3,name:'难过'},
                {id:4,name:'烦乱'},
                {id:5,name:'得意'},
                {id:6,name:'不爽'},
                {id:7,name:'狂喜'},
                {id:8,name:'不知道'},
            ]
        }
    },
    methods:{
        showcolor(id,name){
            for(var i=0;i<this.list.length;i++){
                this.$refs.btn[i].style.background='';
                this.$refs.btn[i].style.color="black";
                this.src=require(`../assets/pic/mood/${name}.png`)
            }
            this.$refs.btn[id].style.background="#b0e6d1";
            this.$refs.btn[id].style.color="#fff";
            this.checked=name;
            console.log('checked:'+this.checked)
            console.log('weather:'+this.weather)
        },
        jumpNext(){
            if(this.checked!=''){
                this.$router.push(`/diary/diaryContent/${this.weather}/${this.checked}`)
            }else{
                this.$toast('请先选择心情')
            }
        }
    },
    created:function(){
        this.weather=this.$route.params.weather
    },
    beforeRouteLeave (to, from, next) {
        if (to.name !== 'diaryContent') {
            this.$store.commit('noKeepAlive')
        }
    next()
  }
}
</script>
<style scoped>
.mint-header{
    font-size:16px;
    color:black;
    background:#fff;
}
#ask{
    position: relative;
    width:200px;
    height:20px;
    top:60px;
    color:#666;
    left:38px;
    font-size:18px;
    letter-spacing: 3px;
}
#moodName{
    position: relative;
    margin:10px;
    float:left;
    width:90px;
    height:40px;
    line-height:40px;
    border-radius: 6px;
    text-align:center;
    box-shadow: #eeeded 0px 0px 2px 2px;
}
</style>