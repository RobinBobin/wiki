/** @param {import("@babel/core").ConfigAPI} api */
module.exports = function (api) {
  api.cache.forever()

  return {
    env: {
      production: {
        plugins: ['react-native-paper/babel']
      }
    },
    presets: ['babel-preset-expo']
  }
}
