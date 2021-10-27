import { defineConfig } from 'umi';

export default defineConfig({
  nodeModulesTransform: {
    type: 'none',
  },
  dva: {
    hmr: true,
  },
  routes: [{ path: '/', component: '@/pages/index' }],
  fastRefresh: {},
});
