// 请参考：https://ng-alain.com/docs/i18n
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { filter } from 'rxjs/operators';

import { registerLocaleData } from '@angular/common';
import ngEn from '@angular/common/locales/en';
import ngZh from '@angular/common/locales/zh';
import ngZhTw from '@angular/common/locales/zh-Hant';

import {
  AlainI18NService,
  DelonLocaleService,
  en_US as delonEnUS,
  SettingsService,
  zh_CN as delonZhCn,
  zh_TW as delonZhTw,
} from '@delon/theme';
import { TranslateService } from '@ngx-translate/core';
import * as df_en from 'date-fns/locale/en-US';
import * as df_zh_cn from 'date-fns/locale/zh-CN';
import * as df_zh_tw from 'date-fns/locale/zh-TW';
import { en_US, NzI18nService, zh_CN, zh_TW } from 'ng-zorro-antd/i18n';
// TODO 没有实现切换语言
interface LangData {
  text: string;
  ng: any;
  zorro: any;
  dateFns: any;
  delon: any;
  abbr: string;
}

const DEFAULT = 'zh-CN';
const LANGS: { [key: string]: LangData } = {
  'zh-CN': {
    text: '简体中文',
    ng: ngZh,
    zorro: zh_CN,
    dateFns: df_zh_cn,
    delon: delonZhCn,
    abbr: '🇨🇳',
  },
  'zh-TW': {
    text: '繁体中文',
    ng: ngZhTw,
    zorro: zh_TW,
    dateFns: df_zh_tw,
    delon: delonZhTw,
    abbr: '🇭🇰',
  },
  'en-US': {
    text: 'English',
    ng: ngEn,
    zorro: en_US,
    dateFns: df_en,
    delon: delonEnUS,
    abbr: '🇬🇧',
  },
};

@Injectable({ providedIn: 'root' })
export class I18NService implements AlainI18NService {
  // tslint:disable-next-line: variable-name
  private _default = DEFAULT;
  private change$ = new BehaviorSubject<string | null>(null);

  // tslint:disable-next-line: variable-name
  private _langs = Object.keys(LANGS).map((code) => {
    const item = LANGS[code];
    return { code, text: item.text, abbr: item.abbr };
  });

  constructor(
    settings: SettingsService,
    private nzI18nService: NzI18nService,
    private delonLocaleService: DelonLocaleService,
    private translate: TranslateService,
  ) {
    const defaultLan = settings.layout.lang || translate.getBrowserLang();
    // `@ngx-translate/core` 预先知道支持哪些语言
    const lans = this._langs.map((item) => item.code);
    translate.addLangs(lans);

    this._default = lans.includes(defaultLan) ? defaultLan : lans[0];
    this.updateLangData(this._default);
  }

  private updateLangData(lang: string): void {
    const item = LANGS[lang];
    registerLocaleData(item.ng);
    this.nzI18nService.setLocale(item.zorro);
    (window as any).__locale__ = item.dateFns;
    this.delonLocaleService.setLocale(item.delon);
  }

  get change(): Observable<string> {
    return this.change$.asObservable().pipe(filter((w) => w != null)) as Observable<string>;
  }

  use(lang: string): void {
    lang = lang || this.translate.getDefaultLang();
    if (this.currentLang === lang) {
      return;
    }
    this.updateLangData(lang);
    this.translate.use(lang).subscribe(() => this.change$.next(lang));
  }

  /** 获取语言列表 */
  // tslint:disable-next-line: typedef
  getLangs() {
    return this._langs;
  }

  /** 翻译 */
  // tslint:disable-next-line: typedef
  fanyi(key: string, interpolateParams?: {}) {
    return this.translate.instant(key, interpolateParams);
  }

  /** 默认语言 */
  // tslint:disable-next-line: typedef
  get defaultLang() {
    return this._default;
  }

  /** 当前语言 */
  // tslint:disable-next-line: typedef
  get currentLang() {
    return this.translate.currentLang || this.translate.getDefaultLang() || this._default;
  }
}
