<template>
  <div id="tab">
    <mt-tabbar v-model="selected" fixed>
      <mt-tab-item id="home">
        <i :class="icon1"></i><br><span class="iconwords">日记本</span>
      </mt-tab-item>
      <mt-tab-item id="Tree">
        <i :class="icon2"></i><br><span class="iconwords">树洞</span>
      </mt-tab-item>
      <mt-tab-item id="Timeline">
        <i :class="icon4"></i><br><span class="iconwords">时间轴</span>
      </mt-tab-item>
      <mt-tab-item id="user">
        <i :class="icon3"></i><br><span class="iconwords">我的</span>
      </mt-tab-item>
    </mt-tabbar>
  </div>
</template>
<script>
export default {
  name: 'Tab',
    data () {
    return {
      //拿到路由
      selected:localStorage.getItem('localData')?
      localStorage.getItem('localData'):'home',
      num:'',
      icon1:'iconfont icon-iconset0117',
      icon2:'iconfont icon-shu6',
      icon3:'iconfont icon-gerenzhongxinhui',
      icon4:'iconfont icon-fuhao-shijianzhou'
    }
  },
  watch:{
    selected(val,oldVal){
      //一旦标签变化，把selected的值存到localStorage
      console.log('val:'+val)
      if(val==='home'){
        this.$router.replace('/')
        this.icon1='iconfont icon-jurassic_text1 '
        this.icon2='iconfont icon-shu6'
        this.icon3='iconfont icon-gerenzhongxinhui',
        this.icon4='iconfont icon-fuhao-shijianzhou'
      }
      else if(val==='Tree'){
        this.$router.replace('/Tree')
        this.icon2='iconfont icon-guoshu'
        this.icon1='iconfont icon-iconset0117'
        this.icon3='iconfont icon-gerenzhongxinhui',
        this.icon4='iconfont icon-fuhao-shijianzhou'
      }
      else if(val==='Timeline'){
        this.$router.replace('/Timeline')
        this.icon4='iconfont icon-shijian',
        this.icon1='iconfont icon-iconset0117',
        this.icon2='iconfont icon-shu6',
        this.icon3='iconfont icon-gerenzhongxinhui'
      }
      else{
        this.$router.replace(`/${val}`)
        this.icon3='iconfont icon-dashujukeshihuaico-'
        this.icon1='iconfont icon-iconset0117'
        this.icon2='iconfont icon-shu6',
        this.icon4='iconfont icon-fuhao-shijianzhou'
      }
      localStorage.setItem('localData',val)
    },
  },
  methods:{
   
  },
  created:function(){
    if(this.$route.path == "/"){
        this.selected = 'home'
        this.icon1='iconfont icon-jurassic_text1 '
      }
    if(this.$route.path == "/Tree"){
      this.selected = 'Tree'
      this.icon2='iconfont icon-guoshu'
    }
    if(this.$route.path == "/user"){
      this.selected = 'user'
      this.icon3='iconfont icon-dashujukeshihuaico-'
    }
    if(this.$route.path == "/Timeline"){
      this.selected = 'Timeline'
      this.icon4='iconfont icon-shijian'
    }
  }
}
</script>
<style>
i.iconfont{
    font-size: 30px;
}
.iconwords{
  position:relative;
  top:5px;
}
</style>