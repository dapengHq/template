import Vue, { ComponentOptions, AsyncComponent } from 'vue';
import VueRouter, { RawLocation, RouteConfig } from 'vue-router';
import { UserModule } from '@/store/modules/user';
import { AppModule } from '@/store/modules/app';
import { localRoutes } from './routerConfig';
import Home from '@/views/Home.vue';
import Layout from '@/components/Layout/index.vue';

type Component = ComponentOptions<Vue> | typeof Vue | AsyncComponent
interface MenuItemMeta {
  keepAlive: boolean;
  icon: string;
  title: string
}
interface MenuItem {
  name: string;
  path: string;
  children: Array<MenuItem>;
  filePath: string;
  type: number; // 0: 展开菜单 1:路由菜单
  meta: MenuItemMeta;
  component?: Component;
}


Vue.use(VueRouter);

const initRoutes = (children = []) => ({
  path: '/',
  name: 'Home',
  component: Layout,
  meta: {
    title: '首页',
    icon: 'el',
    keepAlive: true,
  },
  children: [
    ...children
  ]
});

const basicRouters = [
  {
    path: '/login',
    name: 'Login',
    meta: {
      title: '登录',
      icon: '',
      keepAlive: true,
    },
    component: () => import(/* webpackChunkName: 'Login' */ '../views/login/Login.vue'),
  }
];

const noFoundRoute = {
  path: '*',
  name: 'NoFound',
  meta: {
    title: 'NoFound',
    icon: '',
    keepAlive: true,
  },
  component: () => import(/* webpackChunkName: 'Login' */ '../views/NoFound.vue'),
};

const collectKeepAliveRoutes: Array<string> = [];
const collectFlatMenuList: Array<any> = [];

const createRouter = () => new VueRouter({
  base: process.env.BASE_URL,
  routes: [...basicRouters],
});

const router = createRouter();

router.beforeEach(async (to, from, next) => {
  
  if (to.path === '/login') {
    next();
    return;
  }

  const isLogin = await UserModule.isLogin();

  if (!isLogin) {
    await UserModule.clear();
    next('/login');
    return;
  }

  if (isLogin && !AppModule.menuList.length) {
    const list = await AppModule.getMenuList();
    // 菜单配置
    if (list && list.length) {
      
      deepForEachMenu(list, localRoutes);

      AppModule.updateKeepAliveNames(collectKeepAliveRoutes);

      AppModule.updateFlatMenuList(collectFlatMenuList);

      router.addRoute(initRoutes(list));
      // router.options.routes?.push(initRoutes(list));

      router.addRoute(noFoundRoute);
      router.options.routes?.push(noFoundRoute);

      console.log(router.options.routes, '路由列表');
      
      AppModule.addTabNavList(to);
      next(to.path);
      return;
    }
  }

  AppModule.addTabNavList(to);
  next();
});

router.afterEach(to => {
  document.title = to.meta?.title;
  console.log(to, 'after');
  AppModule.updateRecentVisitList(to);
});

// 根据权限菜单配置路由
function deepForEachMenu(menu: Array<MenuItem>, parentRouter: RouteConfig[] | undefined = localRouters) {
  for (let i = 0, len = menu.length; i < len; i++) {
    const menuItem = menu[i];
    const localRouter = findCanRouterByLocalRouter(menuItem.name, parentRouter);
    Array.isArray(menuItem.children)
    && menuItem.children.length
    && deepForEachMenu(menuItem.children, localRouter?.children);

    menuItem.type === 1 && setComponent(menuItem, localRouter) && collectFlatMenuList.push(menuItem);

    menuItem.meta && menuItem.meta.keepAlive && collectKeepAliveRoutes.push(menuItem.name);
  }
};

function setComponent(menuItem: MenuItem, localRouterItem: RouteConfig | any) {
  try {
    menuItem.component = localRouterItem ? localRouterItem.component : Home;
    return true;
  } catch (e) { console.log(e, '可能没有找到视图路径'); }
}

const localRouters: Array<any> = [];

function findCanRouterByLocalRouter(routerName: string, parentRouter: RouteConfig[]) {
  if (!Array.isArray(parentRouter)) return null;
  return parentRouter.find(rItem => rItem.name === routerName);
}

export default router;
