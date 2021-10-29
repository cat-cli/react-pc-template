export default [
  {
    path: '/error',
    component: '../layouts/BaseLayout',
    routes: [
      { path: '/error/404', component: './404' },
      { path: '/error/403', component: './403' },
      { path: '/error/500', component: './500' },
    ],
  },
  {
    path: '/',
    component: '../layouts/BaseLayout',
    routes: [
      {
        path: '/',
        component: '../layouts/MainLayout',
        routes: [
          { path: '/', component: './home' },
          { path: '*', redirect: '/error/404' },
        ],
      },
    ],
  },
];
