import api from '../index'
import urls from './urls'
export default {
  userinfo(params){
    return api.post(urls.userinfo,params)
},
  toSendmsg(params){
    return api.get(urls.sendmsg,params)
},
  register(params){
    return api.post(urls.register,params)
},
  saveinfo(params){
    return api.get(urls.saveinfo,params)
},
  getInfo(params){
    return api.get(urls.getInfo,params)
},
  saveDiary(params){
    return api.get(urls.saveDiary,params)
},
//日记本、草稿箱拿日记列表
  getDiaryList(params){
    return api.get(urls.getDiaryList,params)
},
  setpwd(params){
    return api.post(urls.setpwd,params)
},
  saveAnniversary(params){
    return api.get(urls.saveAnniversary,params)
},
  getAnniversary(params){
    return api.get(urls.getAnniversary,params)
},
  getTimeline(params){
    return api.get(urls.getTimeline,params)
},
//日记详情
  getdetail(params){
    return api.get(urls.getdetail,params)
  },
//保存更新的日记内容
  savedetail(params){
    return api.get(urls.savedetail,params)
  },
  //草稿箱重发日记
  resubmitDiary(params){
    return api.get(urls.resubmitDiary,params)
  },
  //删除日记
  todelDiary(params){
    return api.get(urls.todelDiary,params)
  },
  //心情推送页面
  getAllmoodpush(params){
    return api.get(urls.getAllmoodpush,params)
  },
  getmoodPushContent(params){
    return api.get(urls.getmoodPushContent,params)
  },
  addTreeMain(params){
    return api.get(urls.addTreeMain,params)
  },
  userOpinion(params){
    return api.get(urls.userOpinion,params)
  },
  getTreeList(){
    return api.get(urls.getTreeList)
  },
  getHotList(){
    return api.get(urls.getHotList)
  },
  getAllMsg(params){
    return api.get(urls.getAllMsg,params)
  },
  delMsg(params){
    return api.get(urls.delMsg,params)
  },
  getTreeDetail(params){
    return api.get(urls.getTreeDetail,params)
  },
  getUserTree(params){
    return api.get(urls.getUserTree,params)
  },
  addComment(params){
    return api.get(urls.addComment,params)
  },
  getComment(params){
    return api.get(urls.getComment,params)
  },
  Thumbs(params){
    return api.get(urls.Thumbs,params)
  },
  getThumbs(params){
    return api.get(urls.getThumbs,params)
  },
  getThumbsUser(params){
    return api.get(urls.getThumbsUser,params)
  },
  delDot(params){
    return api.get(urls.delDot,params)
  },
  findDot(params){
    return api.get(urls.findDot,params)
  },
  CommentThumbs(params){
    return api.get(urls.CommentThumbs,params)
  },
  commentCount(params){
    return api.get(urls.commentCount,params)
  },
}

