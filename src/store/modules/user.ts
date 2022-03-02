import { Module, VuexModule, Mutation, Action, getModule } from 'vuex-module-decorators';
import store from '@/store';
import UserApi from '@/api/user';
import { Decrypt, Encrypt } from '@/utils/utils';
import { sStorage } from '@/utils/storage';
interface UserInfor {
  username: string;
  id: string;
  code: string;
  token: string;
  url: string;
}

export interface IUserState {
  userInfor: UserInfor;
}

const defaultUserInfor = () => ({ username: '', id: '', code: '', token: '', url: '' });

const initUserInfor = () => {
  const userInfor = sStorage.getItem('userInfor')
    ? JSON.parse(Decrypt(sStorage.getItem('userInfor')))
    : defaultUserInfor();
  return userInfor;
};

@Module({ name: 'User', dynamic: true, namespaced: true, store })
export default class User extends VuexModule implements IUserState {
  // state
  menuList = [];
  userInfor: UserInfor = initUserInfor();

  @Mutation
  updateUserInfor(data?: undefined | UserInfor) {
    if (data) {
      this.userInfor = data;
    } else {
      this.userInfor = defaultUserInfor();
    }
    sStorage.setItem('userInfor', Encrypt(this.userInfor));
  }

  @Action
  clear() {
    this.updateUserInfor();
  }

  @Action
  isLogin() {
    const token = sStorage.getItem('userInfor')
    ? JSON.parse(Decrypt(sStorage.getItem('userInfor'))).token
    : '';
    return Boolean(token);
  }

  @Action
  async login(params: object) {
    try {
      const { data, status, message } = await UserApi.login(params);
      if (status && data && data.id) {
        this.updateUserInfor(data);
      }
      return { status, message };
    } catch (e) {
      return { status: false, message: '登录失败~' };
    }
  }

}

export const UserModule = getModule(User);