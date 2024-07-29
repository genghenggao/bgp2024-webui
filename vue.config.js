/*
 * @Description: henggao_note
 * @version: v1.0.0
 * @Date: 2024-07-20 11:05:26
 * @LastEditors: henggao
 * @LastEditTime: 2024-07-29 09:54:27
 */
module.exports = {
  publicPath: './',
  chainWebpack: config => {
    config
      .plugin('html')
      .tap(args => {
        args[0].title = 'BGP2024 WEB'
        return args
      })
  }
}