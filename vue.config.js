module.exports = {
    devServer: {
      proxy: {
        '/zhihu': {
          target: 'https://news-at.zhihu.com/api/4/', //对应自己的接口
          changeOrigin: true,
          ws: true,
          pathRewrite: {
            '^/zhihu': ''
          }
        }
      }
    }
}