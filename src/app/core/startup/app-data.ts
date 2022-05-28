export const APP_DATA = {
  app: {
    name: 'English-Easy',
    description: 'Ng-zorro & Ng-alain admin panel front-end framework',
  },
  menu: [
    {
      text: '导航',
      i18n: 'menu.main',
      group: true,
      hideInBreadcrumb: true,
      children: [
        {
          text: '首页',
          link: '/dashboard',
          i18n: 'menu.dashboard',
          icon: 'anticon-dashboard',
        },
        {
          text: '拼单词',
          i18n: 'menu.vocabulary',
          icon: 'anticon-safety',
          link: '/vocabulary',
        },
      ],
    },
  ],
};
