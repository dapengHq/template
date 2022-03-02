import { RouteConfig } from 'vue-router';

export const localRoutes: Array<RouteConfig> = [
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: 'about' */ '../views/About.vue'),
  },
  {
    path: '/about',
    name: 'About1',
    component: () => import(/* webpackChunkName: 'about1' */ '../views/About1.vue'),
  },
  {
    path: '/about',
    name: 'About2',
    component: () => import(/* webpackChunkName: 'about2' */ '../views/About2.vue'),
    children: [
      {
        path: '/about2/about21',
        name: 'About21',
        component: () => import(/* webpackChunkName: 'about21' */ '../views/About21.vue'),
      }
    ]
  },
];