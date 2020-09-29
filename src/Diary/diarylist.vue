<template>
        <div>
            <div style="position:relative;top:56px">
              <div id="diarylist" v-for="item in arr" :key="item.id" @click="jump(item.id)">
                <div id="listLeft">
                    <span style="color:#707070;font-size:15px">{{$moment(item.time).format('MM-DD dddd')}}
                    &nbsp{{item.weather}}</span><br/>
                    <span id="titles">{{item.title}}</span>
                    <div class="van-hairline--bottom" style="position:relative;top:38px;width:30px"></div>
                    <span id="moods">{{item.mood}}</span>
                </div>

                <div id="photos">
                  <img :src='require(`../../../../koaS/koaPass/public/diaryimg/${item.picture}`)' width="120px" height="120px">
                </div>

              </div>
            </div>
        </div>
</template>
<script>
export default{
    name:'diarylist',
    data() {
    return {
      value: '',
      showKeyboard: true,
      arr:[]
    };
  },
  methods: {
    jump(id){
      this.$router.push(`/diary/diaryDetail/${id}`)
    },
    getDiaryList:async function(){
      const user_id=JSON.parse(localStorage.getItem('userInfo')).user_id;
           let params={
               user_id:user_id,
               drafts:1 //区分草稿箱
           }
           let res = await this.$api.user.getDiaryList(params);
           if(res.code==1){
             console.log(res.list);
             this.arr=res.list
           }
    },
  },
  created:function(){
    this.getDiaryList();
  }
}
</script>
<style scoped>
#diarylist{
  position: relative;
  width:94%;
  height:130px;
  left:12px;
  border-radius:10px;
  background:#fff;
  margin-bottom: 12px;
  box-shadow: #eeeded 0px 0px 2px 2px;
}
#listLeft{
  position: relative;
  top:20px;
  left:20px;
  width:56%;
  height:100px;
  float: left;
}
#titles{
  position: absolute;
  font-size:19px;
  margin-top:8px;
  margin-bottom:8px;
}
#moods{
  position: relative;
  top:48px;
  font-size:14px;
  color:#707070;
  letter-spacing:3px;
}
#photos{
  float:left;
  position: relative;
  right:-20px;
  top:4px;
}
#photos img{
  border-top-right-radius: 16px;
  border-bottom-right-radius: 16px;
}
</style>