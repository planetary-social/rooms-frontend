const path = require(`path`);
const { defineConfig } = require('@vue/cli-service')

module.exports = defineConfig({
  pluginOptions: {
    quasar: {
      importStrategy: 'kebab',
      rtlSupport: false
    }
  },
  transpileDependencies: ['quasar'],
  configureWebpack: {
      resolve: {
          symlinks: false,
          alias: {
              vue: path.resolve(`./node_modules/vue`)
          }
      }
  }
})
