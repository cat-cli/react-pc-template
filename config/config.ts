import pageRoutes from './router.config';
import { defineConfig } from 'umi';

export default defineConfig({
  dynamicImport: {
    loading: '@/components/Loading',
  },
  antd: {},
  title: '招聘中心',
  routes: pageRoutes,
  dva: {
    hmr: true,
    skipModelValidate: false,
  },
  'dva-enhance': {},
  targets: {
    ie: 11,
  },
  lessLoader: {
    javascriptEnabled: true,
  },
  history: { type: 'browser' },
  hash: true,
  proxy: {
    '/api': {
      target: 'http://127.0.0.1:8080',
      changeOrigin: true,
    },
  },
});
