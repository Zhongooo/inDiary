<template>
  <div style="background: whitesmoke;height:630px">
    <mt-header fixed title="新增纪念日">
      <router-link to="/user/anniversary" slot="left">
        <i class="iconfont icon-fanhui2" style="font-size:20px"></i>
      </router-link>
      <router-link to slot="right">
        <i class="iconfont icon-icon" style="font-size:26px" @click="submit"></i>
      </router-link>
              
    </mt-header>
    <div style="position: relative;top:48px;">
      <mt-field placeholder="输入内容" v-model="value">
        <i class="iconfont icon-icon1"></i>
      </mt-field>
      <mt-field placeholder="选择日期" v-model="timeValue" @click="pickDate">
        <i class="iconfont icon-rili" @click="pickDate"></i>
      </mt-field>
      <van-popup v-model="show" position="bottom" :style="{ height:'40%'}">
        <van-datetime-picker v-model="currentDate" type="date" @change="changeFn()" @confirm="confirmFn()"
          @cancel="cancelFn()" />
      </van-popup>
    </div>
    <div id="chooseimg">
      <i class="iconfont icon-icon4" class="iconchoose"></i>
      <span class="tochoose">图标选择</span>
      <van-divider />
      <div id="chooseIcon" v-for="item in list">
        <div id="checked" :style="style" ref="btn" @click="showicon(item.id)">
          <img src="../assets/pic/anniversary/ok.png" :style="style2" ref="img">
        </div>
        <img :src="item.pic" id="realimg">
      </div>
    </div>

  </div>
</template>
<script>
  export default {
    name: 'addanniversary',
    data() {
      return {
        checkimgId: '',
        style: '',
        style2: 'display:none;width:30px;height:30px;position: relative;left:13px;top:12px;',
        value: '',
        timeValue: '',
        currentDate: new Date(),
        changeDate: new Date(),
        show: false,
        list: [
          { id: 0, pic: require('../assets/pic/anniversary/0.png') },
          { id: 1, pic: require('../assets/pic/anniversary/1.png') },
          { id: 2, pic: require('../assets/pic/anniversary/2.png') },
          { id: 3, pic: require('../assets/pic/anniversary/3.png') },
          { id: 4, pic: require('../assets/pic/anniversary/4.png') },
          { id: 5, pic: require('../assets/pic/anniversary/5.png') },
          { id: 6, pic: require('../assets/pic/anniversary/6.png') },
          { id: 7, pic: require('../assets/pic/anniversary/7.png') },
          { id: 8, pic: require('../assets/pic/anniversary/8.png') },
          { id: 9, pic: require('../assets/pic/anniversary/9.png') },
          { id: 10, pic: require('../assets/pic/anniversary/10.png') },
          { id: 11, pic: require('../assets/pic/anniversary/11.png') },
        ],
      }
    },
    methods: {
      showicon: async function (id) {
        for (var i = 0; i < this.list.length; i++) {
          this.$refs.btn[i].style.background = '';
          this.$refs.img[i].style.display = 'none'
        }
        this.$refs.btn[id].style.background = "lightcoral";
        this.$refs.img[id].style.display = '';
        this.checkimgId = id;
        console.log(id);
      },
      pickDate: async function () {
        this.show = true;
      },
      changeFn() { // 值变化时触发
        this.changeDate = this.currentDate;
      },
      confirmFn() { // 确定按钮
        this.timeValue = this.timeFormat(this.currentDate);
        this.show = false;
      },
      cancelFn() {
        this.show = false;
      },
      timeFormat(time) {
        return this.$moment(time).format('YYYY-MM-DD')
      },
      submit: async function () {
        let params = {
          user_id: JSON.parse(localStorage.getItem('userInfo')).user_id,
          icon: this.checkimgId,
          content: this.value,
          time: this.timeValue
        }
        let res = await this.$api.user.saveAnniversary(params);
        if (res.code == 1) {
          this.$toast({
            message: '保存成功',
            duration: 1000
          });
          var that = this;
          setTimeout(function () {
            that.$router.replace('/user/anniversary')
          }, 1100)
        }
      }
    },
    mounted() {
      this.timeFormat(new Date());
    }
  }
</script>
<style scoped>
  @import '../style/userviews/addanniversary.css';
</style>