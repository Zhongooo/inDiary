import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import axios from 'axios'
import MintUI from 'mint-ui'
import 'mint-ui/lib/style.css'
import api from './api/install'
import './assets/icon/iconfont.css'
import './assets/font/iconfont.js'
import './style/mintcss.css'
import moment from 'moment'
import Vant from 'vant';
import 'vant/lib/index.css';
import VideoPlayer from 'vue-video-player'
// import videojs from 'videojs-contrib-hls'


import VueQuillEditor from 'vue-quill-editor'
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'

 
Vue.use(VueQuillEditor)
Vue.use(VideoPlayer);
// Vue.use(videojs);

Vue.use(MintUI)
Vue.use(Vant);
Vue.use(api)
Vue.prototype.$http = axios

var ajax = axios.create({
  baseURL: 'http://localhost:3000/api/uploadpic',
  timeout: 2000,
  headers: {'Content-Type': 'multipart/form-data'}
});
Vue.prototype.ajax = ajax
Vue.prototype.$moment = moment

Vue.config.productionTip = false



new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
