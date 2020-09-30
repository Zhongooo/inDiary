<template>
  <div>
    <mt-header fixed :title="$moment(this.list.time).format('YYYY年MM月DD日')">
      <router-link to slot="left">
        <i class="iconfont icon-fanhui2" style="font-size:1rem" @click="back"></i>
      </router-link>
      <router-link to slot="right" v-show="show">
        <i class="iconfont icon-fenxiang" style="font-size:26px;position:relative;left:-10px;" @click="resubmit"></i>
      </router-link>
              
    </mt-header>
    <div class="detail">
      <div id="photos">
        <img :src='require(`../../../../koaS/koaPass/public/diaryimg/${list.picture}`)' width="100%" height="180px">
      </div>
      <div class="diarycontent">
        <span class="contentTitle">{{list.title}}</span><br />
        <span class="smallword">天气：{{list.weather}}</span><br />
        <span class="smallword">心情：{{list.mood}}</span>
        <div v-html="list.content" v-show="showContent">{{list.content}}</div>
      </div>
    </div>
    <van-tabbar v-model="active">
      <van-tabbar-item icon="delete" v-show="showContent" @click="todel">删除</van-tabbar-item>
      <van-tabbar-item icon="edit" v-show="showContent" @click="edit">编辑</van-tabbar-item>
      <van-tabbar-item icon="passed" v-show="!showContent" @click="save">保存</van-tabbar-item>
    </van-tabbar>

    <div class="edit_container" v-show="!showContent">
      <quill-editor v-model="list.content" ref="myQuillEditor" :options="editorOption" @blur="onEditorBlur($event)"
        @focus="onEditorFocus($event)" @change="onEditorChange($event)">
      </quill-editor>
    </div>
  </div>
</template>
<script>
  export default {
    inject: ['reload'],
    name: 'diaryDetail',
    data() {
      return {
        show: false,
        active: '',
        showContent: true,
        list: [],
        content: ``,
        editorOption: {
          theme: 'snow',
          placeholder: '输入内容...',
          modules: {
            toolbar: [
              ['bold', 'italic', 'underline'],    //加粗，斜体，下划线，删除线
              [{ 'size': ['small', false, 'large', 'huge'] }], // 字体大小
              [{ 'color': [] }],     // 字体颜色，字体背景颜色
              [{ 'align': [] }],    //对齐方式
              ['clean'],    //清除字体样式
            ]
          }
        },
      };
    },
    methods: {
      back() {
        this.$router.go(-1);
      },
      edit() {
        this.showContent = false;
      },
      save: async function () {
        this.showContent = true;
        console.log(this.list.content);
        let params = {
          id: this.$route.params.id,
          content: this.list.content,
        }
        const result = await this.$api.user.savedetail(params);
        if (result.code == 1) {
          this.$toast('保存成功')
        }
      },
      onEditorChange() {
        console.log('hhh')
      },
      onEditorBlur() {
        console.log('hhh')
      },
      onEditorFocus() {
        console.log('hhh')
      },
      getdetail: async function () {
        let params = {
          id: this.$route.params.id,
        }
        const result = await this.$api.user.getdetail(params);
        console.log(result.data);
        this.list = result.data;
        if (result.data.drafts == 0) {
          this.show = true;
        } else if (result.data.drafts == 1) {
          this.show = false;
        }
      },
      resubmit: async function () {
        this.$messagebox.confirm("要保存到日记本中吗")
          .then(action => {
            let params = {
              id: this.list.id,
              drafts: 1
            }
            let res = this.$api.user.resubmitDiary(params);
            console.log(res)
            if (res) {
              this.reload();
              this.$toast('成功！可在日记本中查看！');
            }
          }).catch(err => {
            console.log('取消')
          })

      },
      todel: async function () {
        this.$messagebox.confirm("确定要删除吗")
          .then(action => {
            let params = {
              id: this.list.id,
            }
            let res = this.$api.user.todelDiary(params);
            if (res) {
              this.$toast({
                message: '删除成功',
                duration: 1000
              })
              var that = this;
              setTimeout(function () {
                that.$router.replace('/diary/diaryBook')
              }, 1100)
            }
          }).catch(err => {
            console.log('取消')
          })

      }
    },
    computed: {
      editor() {
        return this.$refs.myQuillEditor.quill;
      }
    },
    created() {
      this.getdetail()
    },
    beforeRouteLeave(to, from, next) {
      to.meta.keepAlive = true;
      next();
    }
  }
</script>
<style>
  .ql-container {
    height: 10rem;
    font-size: 0.6rem;
    width: 97%;
  }
</style>
<style scoped>
  @import '../style/diaryViews/index.css';

  .mint-header {
    font-size: 0.7rem;
    color: black;
    background: #fff;
  }
</style>