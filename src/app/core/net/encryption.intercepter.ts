import { HttpEvent, HttpHandler, HttpHeaders, HttpInterceptor, HttpRequest, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { mergeMap } from 'rxjs/operators';
import { EncryptionService } from '../startup/encryption.service';

/**
 * providedIn: 'root'，告诉 Angular在根注入器中注册这个服务,这也是使用CLI生成服务时默认的方式
 * 这种方式注册,不需要再@NgModule装饰器中写providers,而且在代码编译打包时,可以执行摇树优化，会移除所有没在应用中使用过的服务。
 * 推荐使用此种方式注册服务
 */
@Injectable({
  providedIn: 'root',
})
export class EncryptionInterceptor implements HttpInterceptor {
  /**
   * 构造函数
   *
   * @param encryptionService 加密服务
   */
  constructor(private encryptionService: EncryptionService) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    let request = req;

    // 如果请求有encrypt，就对body进行加密
    if (req.urlWithParams.includes('encrypt') || req.headers.has('encrypt')) {
      request = req.clone({
        body: this.encryptionService.encryptData(req.body),
        headers: new HttpHeaders().append('Content-Type', 'application/json;charset=UTF-8'),
      });
    }

    return next.handle(request).pipe(
      mergeMap((event: any) => {
        let evt = event;

        // 如果头上注明是json, 但返回的数据体不是json，则认为数据体需要解密
        if (event instanceof HttpResponse) {
          const head = event.headers.get('Content-Type');
          if (head && head.includes('application/json') && typeof event.body === 'string') {
            evt = event.clone({
              body: this.encryptionService.descryptData(event.body),
            });
          }
        }

        return of(evt);
      }),
    );
  }
}
