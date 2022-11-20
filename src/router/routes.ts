import { RouteRecordRaw } from 'vue-router';

const routes: RouteRecordRaw[] = [
  {
    path: '/asd',
    component: () => import('layouts/MainLayout.vue'),
    children: [{ path: '', component: () => import('pages/IndexPage.vue') }],
  },
  {
    path: '/menu',
    component: () => import('layouts/MainLayout.vue'),
    children: [{ path: '/menu', component: () => import('pages/MenuPage.vue') }],
  },
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue'),
  },
  {
    path: '/mis-pedidos',
    component: () => import('layouts/MainLayout.vue'),
    children: [{ path: '/mis-pedidos', component: () => import('pages/MisPedidosPage.vue') }],
  },
  {
    path: '/cart',
    component: () => import('layouts/MainLayout.vue'),
    children: [{ path: '/cart', component: () => import('pages/CartPage.vue') }],
  },
  {
    path: '/',
    component: () => import('layouts/LoginLayout.vue'),
    children: [{ path: '', component: () => import('pages/LoginPage.vue') }],
  },

];

export default routes;
