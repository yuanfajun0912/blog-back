module.exports = {
  // npm run build 后生成的打包文件放在哪里
  outputDir: __dirname + '/../server/back',
  // publicPath: './',  //解决打包后页面空白的问题
  publicPath: process.env.NODE_ENV === 'production'  // 生产/开发环境的路径问题
    ? '/back/'
    : './'
}