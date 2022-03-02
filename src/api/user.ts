import Abstract from '@/axios/abstract';
class UserApi extends Abstract {
  async getMenuList() {
    return this.postRequest({ url: '/menuList' });
  }

  async login(params: object) {
    return this.postRequest({ url: '/login', params });
  }
}

let userApi;
export default (() => {
  if (userApi) return userApi;
  userApi = new UserApi();
  return userApi;
})();
