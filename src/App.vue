<template>
  <div id="app">
    <router-view name="head"></router-view>
    <keep-alive :include="$store.state.catchList">
      <router-view v-if="isRouterAlive"></router-view>
   </keep-alive>
  <!-- <router-view v-if="isRouterAlive" :exclude="catchList"></router-view> -->
    <router-view name="foot"></router-view>
  </div>
</template>

<script>
export default {
  name: 'app',
  provide(){
          return{
              reload:this.reload
          }
      },
      data(){
          return{
              isRouterAlive:true
          }
      },
      methods:{
          reload(){
              this.isRouterAlive=false
              this.$nextTick(()=>{
                  this.isRouterAlive=true
              })
          }
      }
}
</script>
<style>
body{
  background:whitesmoke;
}
</style>