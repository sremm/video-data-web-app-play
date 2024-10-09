const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  configureWebpack: {
    devtool: 'source-map',
    resolve: {
      fallback: {
        "stream": require.resolve("stream-browserify"),
        "assert": require.resolve("assert/"),
    }
    }}
})
