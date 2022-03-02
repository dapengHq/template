import MockAdapter from 'axios-mock-adapter';
export default (mock: MockAdapter) => {
  mock.onPost('/menuList').reply(() => {
    return [200, { data: { list: [
      {
        name: 'About',
        path: 'about',
        meta: {
          title: '关于',
          icon: '',
          keepAlive: true,
          defaultActive: 'About'
        },
        type: 1,
      },
      {
        name: 'About1',
        path: 'about1',
        meta: {
          title: '关于1',
          icon: '',
          keepAlive: true,
          defaultActive: 'About1'
        },
        type: 1,
      },
      {
        name: 'About2',
        path: 'about2',
        meta: {
          title: '关于2',
          icon: '',
          keepAlive: true,
          defaultActive: 'About2'
        },
        children: [
          {
            name: 'About21',
            path: 'about21',
            meta: {
              title: '关于2-1',
              icon: '',
              keepAlive: true,
              defaultActive: 'About2-About21'
            },
            type: 1
          }
        ],
        type: 1
      }
    ]}, success: true }];
  });

  mock.onPost('/login').reply(() => {
    return [200, { data: { id: 'hyj001', username: '用户名-hyj', code: '001', token: '001-1', url: 'https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png' }, success: true }];
  });
};