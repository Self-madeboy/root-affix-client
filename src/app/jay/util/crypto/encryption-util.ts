import * as CryptoJS from 'crypto-js';

/**
 * 加解密工具类
 */
export class EncryptionUtil {
  /**
   * 加密数据
   * @param data 源数据串
   * @param key 加密的key
   * @returns 加密后返回的字符串
   */
  public static aesEncrypt(data: string, key: string): string {
    const keyHex = CryptoJS.enc.Utf8.parse(key);
    const encrypted = CryptoJS.AES.encrypt(data, keyHex, {
      mode: CryptoJS.mode.ECB,
      padding: CryptoJS.pad.Pkcs7,
    });
    return encrypted.toString();
  }

  /**
   * 解密数据
   * @param data 加密的源数据
   * @param key 加密的key
   * @returns 解密后的数据
   */
  public static aesDecrypt(data: string, key: string): string {
    const keyHex = CryptoJS.enc.Utf8.parse(key);
    const decrypt = CryptoJS.AES.decrypt(data, keyHex, {
      mode: CryptoJS.mode.ECB,
      padding: CryptoJS.pad.Pkcs7,
    });
    const result = CryptoJS.enc.Utf8.stringify(decrypt).toString();
    return result;
  }
}
