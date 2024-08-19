import { defineConfig, loadEnv } from 'vite'
import vue from '@vitejs/plugin-vue'
import { resolve } from 'path'
//引入svg需要用到的插件
import { createSvgIconsPlugin } from 'vite-plugin-svg-icons'
import { viteMockServe } from 'vite-plugin-mock'

// https://vitejs.dev/config/
export default defineConfig(({ command, mode }) => {
  let env = loadEnv(mode, process.cwd())
  return {
    build: {
      rollupOptions: {
        output: {
          // 在这里修改静态资源路径
          chunkFileNames: 'static/assets/js/[name]-[hash].js',
          entryFileNames: 'static/assets/js/[name]-[hash].js',
          assetFileNames: 'static/assets/[ext]/[name]-[hash].[ext]',
        },
      },
    },
    base: './', // 这里更改打包相对绝对路径
    plugins: [
      vue(),
      createSvgIconsPlugin({
        //指定需要缓存的图标文件夹
        iconDirs: [resolve(__dirname, 'src/assets/icons')],
        //指定symbolId格式
        symbolId: 'icon-[dir]-[name]',
      }),
      viteMockServe({
        mockPath: 'mock',
        localEnabled: command === 'serve', //保证开发阶段可以使用mock接口
      }),
    ],
    resolve: {
      // 设置文件./src路径为 @
      alias: [
        {
          find: '@',
          replacement: resolve(__dirname, './src'),
        },
      ],
    },
    //scss全局变量配置
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: `@import "@/styles/variable.scss";`,
        },
      },
    },
    //代理跨域
    server: {
      proxy: {
        [env.VITE_APP_API_URL]: {
          //获取数据的服务器地址的设置
          target: env.VITE_SERVE,
          //是否代理跨域
          changeOrigin: true,
          //路径重写
          rewrite: (path) => path.replace(/^\/api/, ''),
        },
      },
    },
  }
})
