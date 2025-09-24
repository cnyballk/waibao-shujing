import { defineConfig } from "umi";
const path = require('path');

export default defineConfig({
  routes: [
    { path: "/login", component: "login" , layout: false },
    {
      path: '/',
      wrappers: ['@/wrappers/auth'],
      routes: [
        { path: '/', component: '@/pages/home' },
        { path: '/project', component: '@/pages/project' },
        { path: '/progress', component: '@/pages/progress' },
        { path: '/dashboard', component: '@/pages/dashboard' },
        { path: '/personnel', component: '@/pages/personnel' },
        { path: '/user', component: '@/pages/user' },
      ],
    },
  ],
  npmClient: 'pnpm',
    chainWebpack: (config: any) => {
    config.resolve.alias.set('@', path.resolve(__dirname, 'src')),
    config.optimization.concatenateModules(false),
    config.module.rule('url-loader')
    .test(/.otf$|.ttf$|.webm$|.glb$|.hdr$/)
    .type('asset');
  },
  //  proxy: {
  //   '/dpi': {  // 接口代理IP
  //     target: 'http://120.24.215.84:8080/',
  //     changeOrigin: true,
  //     pathRewrite: { '^/dpi': '' },
  //   },
  //   '/dws': {  // 接口代理IP
  //     target: 'ws://120.24.215.84:8080/ws/ws',
  //     changeOrigin: true,
  //     ws: true,
  //     pathRewrite: { '^/dws': '' },
  //   },
  // },
});
