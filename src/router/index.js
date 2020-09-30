import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import User from '../views/User.vue'
import Login from '../views/Login.vue'
import Tree from '../views/Tree.vue'
import Timeline from '../views/Timeline.vue'
import Tab from '../components/Tab.vue'
import store from '../store/index'


Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    components: {
      default: Home,
      foot: Tab
    },
  },
  {
    path: '/user',
    name: 'user',
    components: {
      default: User,
      foot: Tab
    },
    meta: {
      isLogin: true
    }
  },
  {
    path: '/login',
    name: 'login',
    components: {
      default: Login,
    },
  },
  {
    path: '/Tree',
    name: 'Tree',
    components: {
      default: Tree,
      foot: Tab
    },
    meta: {
      isLogin: true
    }
  },
  {
    path: '/Timeline',
    name: 'Timeline',
    components: {
      default: Timeline,
      foot: Tab
    },
    meta: {
      isLogin: true
    }
  },
  {
    path: '/register',
    name: 'register',
    component: () => import('../Userviews/register')
  },
  {
    path: '/user/setting',
    name: 'setting',
    component: () => import('../otherViews/setting')
  },
  {
    path: '/diary/weather',
    name: 'weather',
    component: () => import('../Diary/weather')
  },
  {
    path: '/diary/mood/:weather',
    name: 'mood',
    component: () => import('../Diary/mood')
  },
  {
    path: '/diary/diaryContent/:weather/:mood',
    name: 'diaryContent',
    component: () => import('../Diary/diaryContent')
  },
  {
    path: '/diary/diaryBook',
    name: 'diaryBook',
    component: () => import('../Diary/diaryBook')
  },
  {
    path: '/diary/diaryDetail/:id',
    name: 'diaryDetail',
    component: () => import('../Diary/diaryDetail')
  },
  {
    path: '/diary/diaryDrafts',
    name: 'diaryDrafts',
    component: () => import('../Diary/diaryDrafts')
  },
  {
    path: '/user/calendar',
    name: 'calendar',
    component: () => import('../Userviews/calendar')
  },
  {
    path: '/user/personalData',
    name: 'personalData',
    component: () => import('../Userviews/personalData')
  },
  {
    path: '/user/diarypassword',
    name: 'diarypassword',
    component: () => import('../Userviews/diarypassword')
  },
  {
    path: '/user/moodPush',
    name: 'moodPush',
    component: () => import('../Userviews/moodPush')
  },
  {
    path: '/user/moodpushContent/:id/:moodid',
    name: 'moodpushContent',
    component: () => import('../Userviews/moodpushContent')
  },
  {
    path: '/user/anniversary',
    name: 'anniversary',
    component: () => import('../Userviews/anniversary')
  },
  {
    path: '/user/addanniversary',
    name: 'addanniversary',
    component: () => import('../Userviews/addanniversary')
  },
  {
    path: '/tree/release',
    name: 'release',
    component: () => import('../Treeviews/release')
  },
  {
    path: '/tree/treecontent/:id',
    name: 'treecontent',
    component: () => import('../Treeviews/treecontent')
  },
  {
    path: '/tree/Myrelease',
    name: 'Myrelease',
    component: () => import('../Treeviews/Myrelease')
  },
  {
    path: '/tree/search',
    name: 'search',
    component: () => import('../Treeviews/search'),
    meta: {
      keepAlive: true
    }
  },
  {
    path: '/user/userOpinion/:id',
    name: 'userOpinion',
    component: () => import('../Userviews/userOpinion')
  },
  {
    path: '/Message',
    name: 'Message',
    component: () => import('../views/Message')
  }
]

if (localStorage.getItem('token')) {
  store.commit('set_token', localStorage.getItem('token'))
}

const router = new VueRouter({
  mode: 'history',//去掉路由井号＃
  routes
})


router.beforeEach((to, from, next) => {
  if (to.name === 'search') {
    store.commit('keepAlive', 'search')
  } else {
    next()
  }
  if (to.name === 'weather') {
    store.commit('keepAlive', 'weather')
  } else {
    next()
  }
  if (to.name === 'mood') {
    store.commit('keepAlive', 'mood')
  } else {
    next()
  }
  // const getToken=localStorage.getItem('token');
  if (to.meta.isLogin) {
    if (store.state.token) {
      next();
    } else {
      next({
        path: '/login'
      })
    }
  } else {
    next()
  }
})

export default router
