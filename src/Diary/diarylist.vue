<template>
  <div class="dList">
    <div class="diarylist" v-for="item in arr" :key="item.id" @click="jump(item.id)">
      <div id="listLeft">
        <span style="color:#707070;font-size:0.6rem">{{$moment(item.time).format('MM-DD dddd')}}
          &nbsp{{item.weather}}</span><br />
        <span id="titles">{{item.title}}</span>
        <span id="moods">{{item.mood}}</span>
      </div>

      <div id="photos">
        <img :src='require(`../../../../koaS/koaPass/public/diaryimg/${item.picture}`)' width="120rem" height="120rem">
      </div>

    </div>
  </div>

</template>
<script>
  export default {
    name: 'diarylist',
    data() {
      return {
        value: '',
        showKeyboard: true,
        arr: []
      };
    },
    methods: {
      jump(id) {
        this.$router.push(`/diary/diaryDetail/${id}`)
      },
      getDiaryList: async function () {
        const user_id = JSON.parse(localStorage.getItem('userInfo')).user_id;
        let params = {
          user_id: user_id,
          drafts: 1 //区分草稿箱
        }
        let res = await this.$api.user.getDiaryList(params);
        if (res.code == 1) {
          console.log(res.list);
          this.arr = res.list
        }
      },
    },
    created: function () {
      this.getDiaryList();
    }
  }
</script>
<style scoped>
  @import '../style/diaryViews/index.css';
</style>