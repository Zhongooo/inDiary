<template>
    <div>
        <div id="bg" style="width:100%;height:160px;background:#b0e6d1;z-index:-2">
            <img src="../assets/pic/设置.png" width="36px" height="36px" @click="jump()">
            <img src="../assets/pic/信封.png" width="32px" height="32px" @click="tojump()" style="position:absolute;right:10px">
            <div v-if="dot" class="dot"></div>
          <div id="bg-bg" style="z-index:0">
              <img :src="imgsrc" width="80px" height="80px" 
              style="z-index:1;border-radius: 80px;position:absolute;top:-40px;left:38%">
              <span style="color:#828282;position:absolute;left:155px;top:48px">{{user.user_name}}</span>
          </div>
        </div>

        <van-grid icon-size="30px" :border="false" :column-num="3" style="position: relative;top:6px;">
            <van-grid-item icon="user-circle-o" to="/user/personalData" text="个人资料" />
            <van-grid-item icon="flower-o" to="/user/anniversary" text="纪念日" />
            <van-grid-item icon="smile-o" to="/user/moodPush" text="心情推送" />
          </van-grid>

          <div style="position: relative;top:14px">
              <van-cell title="密码锁" value="已关闭" to="/user/diarypassword" is-link size="large">
                  <template #icon>
                      <svg class="iconcolor" aria-hidden="true" style="width:26px;height:26px;margin-right:10px">
                          <use xlink:href="#icon-mima"></use>
                      </svg>
                    </template>
              </van-cell>
              <van-cell title="日记本" is-link size="large" to="/diary/diaryBook">
                  <template #icon>
                      <svg class="iconcolor" aria-hidden="true" style="width:30px;height:30px;margin-right:10px">
                          <use xlink:href="#icon-fankuixuanzhong"></use>
                      </svg>
                    </template>
              </van-cell>
              <van-cell title="记录日历" is-link size="large" to="/user/calendar">
              <template #icon>
                  <svg class="iconcolor" aria-hidden="true" style="width:26px;height:26px;margin-left:2px;margin-right:10px">
                      <use xlink:href="#icon-rili1"></use>
                  </svg>
                </template>
              </van-cell>
              <van-cell title="日记草稿箱" is-link size="large" to="/diary/diaryDrafts">
                <template #icon>
                  <svg class="iconcolor" aria-hidden="true" style="width:32px;height:32px;margin-right:10px">
                      <use xlink:href="#icon-xinxi"></use>
                  </svg>
                </template>
              </van-cell>
              <van-cell title="使用说明" is-link size="large">
                <template #icon>
                  <svg class="iconcolor" aria-hidden="true" style="width:28px;height:28px;margin-left:2px;margin-right:10px">
                      <use xlink:href="#icon-shuoming"></use>
                  </svg>
                </template>
              </van-cell>
              <van-cell title="问题反馈" is-link size="large">
                <template #icon>
                  <svg class="iconcolor" aria-hidden="true" style="width:28px;height:28px;margin-left:2px;margin-right:10px">
                      <use xlink:href="#icon-wenjian"></use>
                  </svg>
                </template>
              </van-cell>
          </div>

        <div style="height:5em"></div>
    </div>
</template>
<script>
export default {
    name: 'User',
    data () {
        return {
          user:'',
          imgsrc:'',
          dot:''
     }
    },
    methods: {
        jump:async function(){
          this.$router.push('/user/setting')
        },
        tojump:async function(){
          this.$router.push('/Message')
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
    created:async function(){
      this.findDot();
      let params={user_id:JSON.parse(localStorage.getItem('userInfo')).user_id}
      const res=await this.$api.user.getInfo(params);
      this.user=res.user;
      if(res.user.headpic){
        const pic=res.user.headpic;
        this.imgsrc=require(`../../../../koaS/koaPass/public/images/${pic}`)
      }else{
        this.imgsrc=require('../assets/pic/good.jpg')
      }
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
    right:12px;
    z-index:1001;
    float:right;
    top:3px;
}
  #bg-bg{
    width:100%;
    height:80px;
    background:#fff;
    position:absolute;
    top:80px;
    border-top-left-radius: 30px;
    border-top-right-radius: 30px;
    z-index:-1;
  }
</style>
