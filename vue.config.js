const { defineConfig } = require('@vue/cli-service')
const path = require('path')
function resolve (dir) {
  return path.join(__dirname, dir)
}
// https://cli.vuejs.org/zh/guide/webpack.html#%E7%AE%80%E5%8D%95%E7%9A%84%E9%85%8D%E7%BD%AE%E6%96%B9%E5%BC%8F
module.exports = defineConfig({
  css: {
    loaderOptions: {
      scss: {
        // additionalData: '@import "~@/style/variable.module.scss";'
      }
    }
  },
  configureWebpack: {
    resolve: {
      fallback: { path: require.resolve('path-browserify') }
    }
  },
  chainWebpack (config) {
    // 设置 svg-sprite-loader
    config.module
      .rule('svg')
      .exclude.add(resolve('src/icons'))
      .end()
    config.module
      .rule('icons')
      .test(/\.svg$/)
      .include.add(resolve('src/icons'))
      .end()
      .use('svg-sprite-loader')
      .loader('svg-sprite-loader')
      .options({
        symbolId: 'icon-[name]'
      })
      .end()
  },
  devServer: {
    port: 3001
    // proxy: {
    //   '/api': {
    //     target: 'https://api.imooc-admin.lgdsunday.club/',
    //     changeOrigin: true
    //   }
    // }
  },
  transpileDependencies: true
})
