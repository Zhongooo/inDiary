import axios from 'axios'
import router from '../router'
// 创建 axios 实例
let service = axios.create({timeout: 60000})
// 设置 post、put 默认 Content-Type
service.defaults.headers.get['Content-Type'] = 'application/json'
service.defaults.headers.post['Content-Type'] = 'application/json'
service.defaults.headers.put['Content-Type'] = 'application/json'



// 添加请求拦截器
service.interceptors.request.use(
  (config) => {
    const token=localStorage.getItem('token');
    if (config.method === 'post' || config.method === 'put') {
      // post、put 提交时，将对象转换为string, 为处理Java后台解析问题
      config.data = JSON.stringify(config.data)
  }
  if(token){
    config.headers.common['Authorization'] = token;
  }
    // 请求发送前进行处理
    return config
  },
  (error) => {
    // 请求错误处理
    return Promise.reject(error)
  }
)
// 添加响应拦截器
service.interceptors.response.use(
    (response) => {
      console.log(response.status)
      let { data } = response
      return data
    },
    err=> {
      if(err&&err.response){
        switch(err.response.status){
          case 400:err.message='请求错误(400)';break;
          case 401:err.message='未授权，请重新登录(401)';
                localStorage.removeItem('token');
                router.push({
                  path:'/login',
                });
                console.log(err.response.status)
                break;
          case 403:err.message='拒绝访问(403)';
          case 404:err.message='请求出错(404)';
          case 408:err.message='请求超时(408)';
          case 500:err.message='服务器错误(500)';
          case 501:err.message='服务未实现(501)';
          case 502:err.message='网络错误(502)';
          case 503:err.message='服务不可用(503)';
          case 504:err.message='网络超时(504)';
          case 505:err.message='HTTP版本不受支持(505)';
          default:err.message=`连接出错(${err.response.status})!`;
              }
        }
        else{
          err.message='连接服务器失败'
        }
      // Message.error({message:err.message})
      return Promise.reject(err);
      // let info = {},
      //   { status, statusText, data } = error.response
      // if (!error.response) {
      //   info = {
      //     code: 5000,
      //     msg: 'Network Error'
      //   }
      // } else {
      //   // 此处整理错误信息格式
      //   if(error.response.status==401){
      //     localStorage.removeItem('token');
      //     router.push({
      //       path:'/user/login',
      //     })
      //   }
      //   console.log(error.response.data)
      //   console.log(error.response.status)
      //   info = {
      //     code: status,
      //     data: data,
      //     msg: statusText
        // }}
      }) 
  export default function() {	
    return service}
  
