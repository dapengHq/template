export const localMenus = [
  {
    name: 'About',
    path: '/about',
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
    path: '/about1',
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
    path: '/about2',
    meta: {
      title: '关于2',
      icon: '',
      keepAlive: true,
      defaultActive: 'About2'
    },
    type: 1,
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
    ]
  }
];