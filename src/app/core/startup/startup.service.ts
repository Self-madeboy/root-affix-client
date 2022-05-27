import { HttpClient } from '@angular/common/http';
import { Inject, Injectable, Injector } from '@angular/core';
import { Router } from '@angular/router';
import { ACLService } from '@delon/acl';
import { DA_SERVICE_TOKEN, ITokenService } from '@delon/auth';
import { ALAIN_I18N_TOKEN, MenuService, SettingsService, TitleService } from '@delon/theme';

import { CacheService } from '@delon/cache';
import { TranslateService } from '@ngx-translate/core';
import { NzIconService } from 'ng-zorro-antd/icon';
import { UserDTO } from 'src/app/jay/model/base/user-dto';
import { environment } from '../../../environments/environment';
import { ICONS } from '../../../style-icons';
import { ICONS_AUTO } from '../../../style-icons-auto';
import { I18N_DATA } from '../i18n/i18n-data';
import { I18NService } from '../i18n/i18n.service';
import { APP_DATA } from './app-data';
import { EncryptionService } from './encryption.service';

/**
 * Used for application startup
 * Generally used to get the basic data of the application, like: Menu Data, User Data, etc.
 */
@Injectable()
export class StartupService {
  constructor(
    iconSrv: NzIconService,
    private menuService: MenuService,
    private settingService: SettingsService,
    private aclService: ACLService,
    private titleService: TitleService,
    @Inject(DA_SERVICE_TOKEN) private tokenService: ITokenService,
    private httpClient: HttpClient,
    private injector: Injector,
    private translate: TranslateService,
    @Inject(ALAIN_I18N_TOKEN) private i18n: I18NService,
    private cacheService: CacheService,
    private encryptionService: EncryptionService,
  ) {
    // 使用的动态加载icon，此方法不需要
    // iconSrv.addIcon(...ICONS_AUTO, ...ICONS);
    // 从服务器获取数据加密的KEY
    this.encryptionService.encrypt = environment.encrypt;
    setTimeout(() => {
      this.encryptionService.getKeyFromServer();
    }, 1);
  }

  // TODO
  private viaHttp(resolve: any, reject: any): void {
    // setting language data
    this.translate.setTranslation(this.i18n.defaultLang, I18N_DATA);
    this.translate.setDefaultLang(this.i18n.defaultLang);

    // application data
    const res: any = APP_DATA;

    // 获取缓存中的权限
    const userDTO: UserDTO = this.cacheService.get('__user', { mode: 'none' });

    if (userDTO) {
      // 用户信息：包括姓名、头像、邮箱地址
      this.settingService.setUser({
        name: userDTO.name,
        id: userDTO.id,
        avatar: './assets/tmp/img/fallout_PNG28.png',
      });

      // ACL：设置权限
      // this.aclService.setRole(userDTO.authorities);
      // this.aclService.setAbility(auth);
    } else {
      this.tokenService.clear();
    }

    // 初始化菜单
    this.menuService.add(res.menu);
    // 设置页面标题的后缀
    this.titleService.suffix = res.app.name;
    // 应用信息：包括站点名、描述、年份
    this.settingService.setApp(res.app);
    // ACL: 将权限设置为完全, https://ng-alain.com/acl/getting-started
    // this.aclService.setFull(true);
    resolve(null);
  }

  private viaMock(resolve: any, reject: any): void {
    // const tokenData = this.tokenService.get();
    // if (!tokenData.token) {
    //   this.injector.get(Router).navigateByUrl('/passport/login');
    //   resolve({});
    //   return;
    // }
    // mock
    const app: any = {
      name: `ng-alain`,
      description: `Ng-zorro admin panel front-end framework`,
    };
    const user: any = {
      name: 'Admin',
      avatar: './assets/tmp/img/avatar.jpg',
      email: 'cipchk@qq.com',
      token: '123456789',
    };
    // Application information: including site name, description, year
    this.settingService.setApp(app);
    // User information: including name, avatar, email address
    this.settingService.setUser(user);
    // ACL: Set the permissions to full, https://ng-alain.com/acl/getting-started
    this.aclService.setFull(true);
    // Menu data, https://ng-alain.com/theme/menu
    this.menuService.add([
      {
        text: 'Main',
        group: true,
        children: [
          {
            text: 'Dashboard',
            link: '/dashboard',
            icon: { type: 'icon', value: 'appstore' },
          },
        ],
      },
    ]);
    // Can be set page suffix title, https://ng-alain.com/theme/title
    this.titleService.suffix = app.name;

    resolve({});
  }

  load(): Promise<any> {
    // only works with promises
    // https://github.com/angular/angular/issues/15088
    return new Promise((resolve, reject) => {
      // http
      this.viaHttp(resolve, reject);
      // mock：请勿在生产环境中这么使用，viaMock 单纯只是为了模拟一些数据使脚手架一开始能正常运行
      // this.viaMock(resolve, reject);
    });
  }
}
