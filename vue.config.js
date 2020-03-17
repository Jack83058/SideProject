const path = require('path')
const resolve = dir => path.join(__dirname, dir)
const IS_PROD = ['production', 'prod'].includes(process.env.NODE_ENV)
module.exports = {
    publicPath: IS_PROD ? process.env.VUE_APP_PUBLIC_PATH : './', // 默认'/'，部署应用包时的基本 URL
    // outputDir: process.env.outputDir || 'dist', // 'dist', 生产环境构建文件的目录
    // assetsDir: "", // 相对于outputDir的静态资源(js、css、img、fonts)目录
    lintOnSave: false,
    runtimeCompiler: true, // 是否使用包含运行时编译器的 Vue 构建版本
    productionSourceMap: !IS_PROD, // 生产环境的 source map
    parallel: require('os').cpus().length > 1,
    pwa: {},
    chainWebpack: config => {
        // 添加别名
        config.resolve.alias.set('vue$', 'vue/dist/vue.esm.js').set('@', resolve('src'))
        config.module
            .rule('pdf')
            .test(/\.pdf$/)
            .use('file-loader')
            .loader('file-loader')
        config.module
            .rule('txt')
            .test(/\.txt$/)
            .use('raw-loader')
            .loader('raw-loader')
        config.module
            .rule('vtt')
            .test(/\.vtt$/)
            .use('raw-loader')
            .loader('raw-loader')
        // .set('@assets', resolve('src/assets'))
        // .set('@scss', resolve('src/assets/scss'))
        // .set('@components', resolve('src/components'))
        // .set('@plugins', resolve('src/plugins'))
        // .set('@views', resolve('src/views'))
        // .set('@router', resolve('src/router'))
        // .set('@store', resolve('src/store'))
        // .set('@layouts', resolve('src/layouts'))
        // .set('@static', resolve('src/static'))
    },
    configureWebpack: config => {
        config.devtool = 'source-map'
    },
    css: {
        modules: false,
        extract: IS_PROD,
        sourceMap: false,
        loaderOptions: {
            scss: {
                // 向全局sass样式传入共享的全局变量, $src可以配置图片cdn前缀
                // 详情: https://cli.vuejs.org/guide/css.html#passing-options-to-pre-processor-loaders
                prependData: `
            @import "@/assets/scss/config.scss";
            @import "@/assets/scss/variables.scss";
            @import "@/assets/scss/mixins.scss";
            @import "@/assets/scss/utils.scss";
            $src: "${process.env.VUE_APP_OSS_SRC}";
            `
            }
        }
    },
    devServer: {
        proxy: {
            '/video-youtube': {
                // 自訂 local 端的位置
                target: 'https://www.youtube.com/', // 遠端 URL Domain
                changeOrigin: true,
                pathRewrite: {
                    '^/video-youtube': ''
                }
            },
            '/ytimg': {
                // 自訂 local 端的位置
                target: 'https://i.ytimg.com/', // 遠端 URL Domain
                changeOrigin: true,
                pathRewrite: {
                    '^/ytimg': ''
                }
            }
        }
    }
}
