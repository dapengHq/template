import { Module, VuexModule, Mutation, Action, getModule } from 'vuex-module-decorators';
import { localMenus } from '@/router/localMenus';
import UserApi from '@/api/user';
import store from '@/store';
import _ from 'lodash';
import { lStorage } from '@/utils/storage';

export interface IAppState {
  sidebar: {
    opened: boolean
    withoutAnimation: boolean
  },
  menuList: Array<any>;
  keepAliveNames: Array<string>;
  tabNavList: Array<any>;
  recentVisitList: Array<any>;
}

let recentVisitList: Array<any> = [];
try {
  const res = lStorage.getItem('recentVisitList');
  recentVisitList = res ? JSON.parse(res) : [];
} catch (e) {
  recentVisitList = [];
}

const excludeVisit = ['Home', 'Login', undefined, null, NaN];

@Module({ dynamic: true, store, name: 'app' })
class App extends VuexModule implements IAppState {
  sidebar = {
    opened: false,
    withoutAnimation: false
  }

  menuList:Array<any> = [];

  flatMenuList:Array<any> = [];

  keepAliveNames:Array<string> = [];

  recentVisitList: Array<any> = recentVisitList;

  tabNavList:Array<any> = [
    {
      path: '/',
      name: 'Home',
      meta: {
        title: '首页'
      }
    }
  ];

  @Mutation
  updateRecentVisitList({ name, meta, path }: any) {
    if (excludeVisit.includes(name)) return;

    const existIndex = this.recentVisitList.findIndex(r => r.name === name);
    if (existIndex !== -1) this.recentVisitList.splice(existIndex, 1);

    this.recentVisitList.unshift(_.cloneDeep({ name, meta, path }));

    if (this.recentVisitList.length > 6) {
      this.recentVisitList = this.recentVisitList.slice(0, 7);
    }

    lStorage.setItem('recentVisitList', this.recentVisitList);
  }

  @Mutation
  updateMenuList(list: Array<any> = []) {
    this.menuList = list;
  }

  @Mutation
  updateFlatMenuList(list: Array<any> = []) {
    this.flatMenuList = list;
  }

  @Mutation
  updateKeepAliveNames(list: Array<string>) {
    this.keepAliveNames = list; // 多级都可用
  }

  @Mutation
  addTabNavList(tabItem: any = { name: '', path: '' }) {
    tabItem.name
    && tabItem.path
    && (this.tabNavList.findIndex(it => it.name === tabItem.name) === -1)
    && this.tabNavList.push(tabItem);
  }

  @Mutation
  updateTabNavList(list: Array<any> = []) {
    this.tabNavList = list;
  }

  @Mutation
  toggleSidebar(opened = false) {
    this.sidebar.opened = opened;
  }

  @Mutation
  deleteTabNavItemByIndex(index: number) {
    if (this.tabNavList[index]) {
      return this.tabNavList.splice(index, 1);
    }
    return null;
  }

  @Action
  async getMenuList() {
    if (process.env.VUE_APP_USE_LOCAL_MENU === '1') {
      this.updateMenuList(localMenus as any);
      return _.cloneDeep(localMenus);
    }
    try {
      const { data } = await UserApi.getMenuList();

      if (Array.isArray(data.list)) {

        const { list = [] } = data;
        this.updateMenuList(list);

        return _.cloneDeep(list);
      }
    } catch (e) {}
  }
}

export const AppModule = getModule(App);