import Vue from 'vue';
import Vuex from 'vuex';
import { IUserState } from './modules/user';
import { IAppState } from './modules/app';

Vue.use(Vuex);

export interface RootState {
  user: IUserState
  app: IAppState
}

export default new Vuex.Store<RootState>({});
