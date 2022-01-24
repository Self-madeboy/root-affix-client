// This file can be replaced during build by using the `fileReplacements` array.
// `ng build ---prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

import { DelonMockModule } from '@delon/mock';
// import { Environment } from '@delon/theme';
import * as MOCKDATA from '../../_mock';

export const environment = {
  // 是否生产环境
  production: false,
  // 是否启用 URL 片段（#）代替 history API
  useHash: true,
  api: {
    // 指定API前缀
    baseUrl: 'http://127.0.0.1:8023/multi-module-server/server',
    // 是否启用自动刷新Token
    refreshTokenEnabled: true,
    // 刷新Token方式，`re-request` 当检测过期时间到期时先发起刷新Token请求，再重新发起原请求，`auth-refresh` 利用 `@delon/auth` 来定期检测是否过期
    refreshTokenType: 'auth-refresh',
  },
  // 请求体是否加密
  encrypt: true,
  // 定义在 `global-config.module.ts` 导入的模块列表
  modules: [DelonMockModule.forRoot({ data: MOCKDATA })],
};

/*
 * In development mode, to ignore zone related error stack frames such as
 * `zone.run`, `zoneDelegate.invokeTask` for easier debugging, you can
 * import the following file, but please comment it out in production mode
 * because it will have performance impact when throw error
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
