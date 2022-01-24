import { HttpClient } from '@angular/common/http';
import { Inject, Injectable, Optional } from '@angular/core';
import * as JsEncryptModule from 'jsencrypt';
import { ApiSimpleData } from 'src/app/jay/model/common/api-simple-data';
import { EncryptionUtil } from 'src/app/jay/util/crypto/encryption-util';
import { GuidUtil } from 'src/app/jay/util/misc/guid-util';

@Injectable({
  providedIn: 'root',
})
export class EncryptionService {
  /**
   * RSA加密类
   */
  private jsEncrypt = new JsEncryptModule.JSEncrypt({
    default_key_size: 1024,
    default_public_exponent: '010001',
    log: false,
  });

  /**
   * 客户端随机的ID
   */
  clientUUID = GuidUtil.guid();

  /**
   * 16位AES的KEY
   */
  private key: string = null;

  // tslint:disable-next-line: variable-name
  private _encrypt = false;

  set encrypt(value: boolean) {
    this._encrypt = value;
  }

  get encrypt(): boolean {
    return this._encrypt;
  }

  constructor(private http: HttpClient) {}

  /**
   * 从服务器获取AES的key
   * 默认配置中对所有HTTP请求都会强制[校验](https://ng-alain.com/auth/getting-started) 用户 Token
   * 在请求URL加上：`/login?_allow_anonymous=true` 表示不触发用户 Token 校验
   */
  public getKeyFromServer(): void {
    if (this.encrypt) {
      const url = '/api/crypt/key?clientId=' + this.clientUUID + '&_allow_anonymous=true';

      // 取服务器生成的rsa公钥
      this.http.get<ApiSimpleData<string>>(url).subscribe((pk) => {
        const rsa = new JsEncryptModule.JSEncrypt();
        rsa.setPublicKey(pk.data);

        // 使用服务器公钥加密自己的公钥，传递给服务器用来加密aes的key
        this.http
          .post<ApiSimpleData<string>>(url, {
            data: rsa.encrypt(this.jsEncrypt.getPublicKeyB64()),
          })
          .subscribe((key) => {
            this.key = this.jsEncrypt.decrypt(key.data);
          });
      });
    }
  }

  /**
   * 加密数据，如果不需要加密则直接返回原始数据
   *
   * @param data 要加密的数据
   * @returns 加密后的数据
   */
  encryptData(data: any): string {
    if (this.key && this.encrypt && data) {
      let temp = data;
      if (typeof data !== 'string') {
        temp = JSON.stringify(data);
      }
      return EncryptionUtil.aesEncrypt(temp, this.key);
    } else {
      return data;
    }
  }

  /**
   * 解密数据，如果不需要加密则直接返回原始数据
   * @param data 要解密的数据
   * @returns 如果是json数据，则返回对象，否则返回字符串
   */
  descryptData(data: string): string | any {
    if (this.key && this.encrypt && data) {
      let temp = EncryptionUtil.aesDecrypt(data, this.key);
      // 如果data是json的字符串，则尝试转换为object
      if (temp.startsWith('{') && temp.endsWith('}')) {
        try {
          temp = JSON.parse(temp);
        } catch (e) {
          // nothing to do
        }
      }
      return temp;
    } else {
      return data;
    }
  }
}
