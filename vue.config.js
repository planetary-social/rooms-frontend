const path = require(`path`);
const { defineConfig } = require('@vue/cli-service')

module.exports = defineConfig({
  publicPath: import.meta.env.VITE_BASE_DIR,
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
