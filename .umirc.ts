import { defineConfig } from "umi";
const path = require('path');

export default defineConfig({
  outputPath: "./exe/public",
  history: { type: "hash" },
  esbuildMinifyIIFE: true,
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
        { path: '/dataManagement', component: '@/pages/dataManagement' },
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
   proxy: {
    '/api': { 
      target: 'http://202.104.149.204:9109',
      changeOrigin: true,
      pathRewrite: { '^/api': '' },
    },
  },
});
