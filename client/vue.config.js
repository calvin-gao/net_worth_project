const { defineConfig } = require('@vue/cli-service');
module.exports = defineConfig({
  transpileDependencies: true,
  devServer: {
    proxy: {
      // proxy all requests starting with /api to jsonplaceholder
      '^/api': {
        target: 'http://localhost:8000',
        changeOrigin: true,
        secure:false,
        pathRewrite: {'^/api': '/api'},
        logLevel: 'debug'
      },
    }
  }
})
