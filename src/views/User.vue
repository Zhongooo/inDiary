<template>
  <div class="users w">
    <div class="bg">
      <img src="../assets/pic/设置.png" class="seticon1" @click="jump()">
      <img src="../assets/pic/信封.png" class="seticon2" @click="tojump()">
      <div v-if="dot" class="dot"></div>
      <div class="bg-bg w">
        <img :src="imgsrc" class="avatar">
        <div class="uname"><span>{{user.user_name}}</span></div>
      </div>
    </div>

    <van-grid icon-size="1.3rem" :border="false" :column-num="3">
      <van-grid-item icon="user-circle-o" to="/user/personalData" text="个人资料" />
      <van-grid-item icon="flower-o" to="/user/anniversary" text="纪念日" />
      <van-grid-item icon="smile-o" to="/user/moodPush" text="心情推送" />
    </van-grid>

    <div class="indexlist">
      <van-cell title="密码锁" value="已关闭" to="/user/diarypassword" is-link size="large">
        <template #icon>
          <svg class="iconcolor iconSite" aria-hidden="true">
            <use xlink:href="#icon-mima"></use>
          </svg>
        </template>
      </van-cell>
      <van-cell title="日记本" is-link size="large" to="/diary/diaryBook">
        <template #icon>
          <svg class="iconcolor iconSite2" aria-hidden="true">
            <use xlink:href="#icon-fankuixuanzhong"></use>
          </svg>
        </template>
      </van-cell>
      <van-cell title="记录日历" is-link size="large" to="/user/calendar">
        <template #icon>
          <svg class="iconcolor iconSite" aria-hidden="true">
            <use xlink:href="#icon-rili1"></use>
          </svg>
        </template>
      </van-cell>
      <van-cell title="日记草稿箱" is-link size="large" to="/diary/diaryDrafts">
        <template #icon>
          <svg class="iconcolor iconSite2" aria-hidden="true">
            <use xlink:href="#icon-xinxi"></use>
          </svg>
        </template>
      </van-cell>
      <van-cell title="使用说明" is-link size="large">
        <template #icon>
          <svg class="iconcolor iconSite" aria-hidden="true">
            <use xlink:href="#icon-shuoming"></use>
          </svg>
        </template>
      </van-cell>
      <van-cell title="问题反馈" is-link size="large">
        <template #icon>
          <svg class="iconcolor iconSite" aria-hidden="true">
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
    data() {
      return {
        user: '',
        imgsrc: '',
        dot: ''
      }
    },
    methods: {
      jump: async function () {
        this.$router.push('/user/setting')
      },
      tojump: async function () {
        this.$router.push('/Message')
      },
      findDot: async function () {
        let params = { user_id: JSON.parse(localStorage.getItem('userInfo')).user_id }
        const res = await this.$api.user.findDot(params);
        if (res.code == 1) {
          this.dot = true
        } else if (res.code == 0) {
          this.dot = false
        }
      }
    },
    created: async function () {
      this.findDot();
      let params = { user_id: JSON.parse(localStorage.getItem('userInfo')).user_id }
      const res = await this.$api.user.getInfo(params);
      this.user = res.user;
      if (res.user.headpic) {
        const pic = res.user.headpic;
        this.imgsrc = require(`../../../../koaS/koaPass/public/images/${pic}`)
      } else {
        this.imgsrc = require('../assets/pic/good.jpg')
      }
    }
  };
</script>
<style>
  @import '../style/mainviews/user.css';

  .dot {
    background: red;
    width: 6px;
    height: 6px;
    border-radius: 6px;
    position: relative;
    right: 12px;
    z-index: 1001;
    float: right;
    top: 3px;
  }

  .van-cell--large {
    padding-top: 0.7rem !important;
    padding-bottom: 0.7rem !important;
  }

  .van-grid-item__text {
    font-size: 0.7rem !important;
  }

  .van-cell--large .van-cell__title {
    font-size: 0.7rem !important;
    margin-top: 0.3rem !important;
  }

  .van-cell__value {
    font-size: 0.5rem;
  }

  .van-icon-arrow::before {
    font-size: 0.7rem;
  }
</style>