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
          text: '系统安全',
          i18n: 'menu.security',
          icon: 'anticon-safety',
          // acl: [
          //   'AUTHORITY_CREATE',
          //   'AUTHORITY_UPDATE',
          //   'AUTHORITY_DELETE',
          //   'ROLE_CREATE',
          //   'ROLE_UPDATE',
          //   'ROLE_DELETE',
          //   'USER_CREATE',
          //   'USER_UPDATE',
          //   'USER_DELETE',
          //   'LOG_RETRIEVE',
          // ],
          children: [
            {
              text: '权限管理',
              link: '/security/authorities',
              i18n: 'menu.security.authorities',
              // acl: ['AUTHORITY_CREATE', 'AUTHORITY_UPDATE', 'AUTHORITY_DELETE'],
            },
            {
              text: '角色管理',
              link: '/security/roles',
              i18n: 'menu.security.roles',
              // acl: ['ROLE_CREATE', 'ROLE_UPDATE', 'ROLE_DELETE'],
            },
            {
              text: '用户管理',
              link: '/security/users',
              i18n: 'menu.security.users',
              // acl: ['USER_CREATE', 'USER_UPDATE', 'USER_DELETE'],
            },
            {
              text: '系统日志',
              link: '/security/logs',
              i18n: 'menu.security.logs',
              // acl: ['LOG_RETRIEVE'],
            },
          ],
        },
      ],
    },
  ],
};
