import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';

/**
 * 密码强度组件
 *
 * 用法：
 * <app-password-strength [password]="密码值" [(level)]="level"></app-password-strength>
 */
@Component({
  selector: 'app-password-strength',
  templateUrl: './password-strength.component.html',
  styleUrls: [],
})
export class PasswordStrengthComponent implements OnChanges {
  /**
   * 待评估的密码
   */
  @Input()
  password: string;

  /**
   * 密码强度的说明文字
   */
  strengthTexts = ['', '弱密码', '普通', '高强度'];

  /**
   * 输入的密码强度级别
   */
  @Input()
  level = 0;

  /**
   * 改变事件，level+Change命名方式会自动实现双向绑定
   */
  @Output()
  levelChange: EventEmitter<any> = new EventEmitter();

  constructor() {}

  /**
   * 评估密码强度
   *
   * @param pwd 密码
   */
  private evaluateStrength(pwd: string): void {
    let lvl = 0;
    if (pwd) {
      if (pwd.match(/[a-z]/g)) {
        lvl++;
      }
      if (pwd.match(/[0-9]/g)) {
        lvl++;
      }
      if (pwd.match(/(.[^a-z0-9])/g)) {
        lvl++;
      }
      if (pwd.length > 0 && pwd.length < 8) {
        lvl = 1;
      }
      if (lvl > 3) {
        lvl = 3;
      }
    }
    this.level = lvl;
    this.levelChange.emit(lvl);
  }

  ngOnChanges(simpleChanges: SimpleChanges): void {
    if (simpleChanges.password) {
      // 如果password数据采用表达式方式传入，则会导致无法关闭，所以最好采用延迟的方式来评估密码强度
      setTimeout(() => {
        this.evaluateStrength(this.password);
      }, 100);
    }
  }
}
