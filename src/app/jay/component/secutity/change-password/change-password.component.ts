import { Component, EventEmitter, Injector, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { CacheService } from '@delon/cache';
import { SettingsService } from '@delon/theme';
import { NzMessageService } from 'ng-zorro-antd/message';
import { UserService } from 'src/app/jay/service/srcurity/user.service';
import { FormUtil } from 'src/app/jay/util/form/form-util';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styles: [],
})
export class ChangePasswordComponent implements OnInit {
  /**
   * 弹窗是否显示
   */
  @Input()
  isVisible = false;

  /**
   * 弹窗是否显示通知
   */
  @Output()
  isVisibleChange = new EventEmitter<boolean>();

  validateForm: FormGroup;

  /**
   * 用户id
   */
  userId: string;

  /**
   * 原来的密码
   */
  get oldPassword(): any {
    return this.validateForm.get('oldPassword');
  }

  /**
   * 新的密码
   */
  get newPassword(): any {
    return this.validateForm.get('newPassword');
  }

  /**
   * 重复新的密码
   */
  get confirmPassword(): any {
    return this.validateForm.get('confirmPassword');
  }

  /**
   * 密码等级
   */
  level = 0;

  constructor(
    private userService: UserService,
    private injector: Injector,
    private fb: FormBuilder,
    private settingService: SettingsService,
    private msg: NzMessageService,
    private cacheService: CacheService,
  ) {}

  /**
   * 初始化钩子
   */
  ngOnInit(): void {
    this.userId = this.cacheService.get('__user', { mode: 'none' }).id;
    this.setPassword();
  }

  /**
   * 生成表单
   */
  private setPassword(): void {
    this.validateForm = this.fb.group({
      oldPassword: [null, [Validators.required]],
      newPassword: [null, [Validators.required, Validators.minLength(8)]],
      confirmPassword: [null, [this.confirmValidator]],
    });
  }

  /**
   * 确定
   * @param value 表单内容
   */
  submitForm(value: any): void {
    if (!FormUtil.validateForm(this.validateForm)) {
      this.msg.warning('密码有误');
      return;
    } else if (this.level < 2) {
      this.msg.warning('密码强度太低');
      return;
    }
    this.userService
      .updateUserPassword(this.userId, {
        oldPassword: value.oldPassword,
        newPassword: value.newPassword,
      })
      .subscribe((ur) => {
        this.msg.success('修改成功');
        this.isVisible = false;
        this.isVisibleChange.emit(false);
      });
    FormUtil.resetForm(this.validateForm, '');
  }

  /**
   * 取消按钮
   */
  handleCancel(): void {
    this.isVisible = false;
    this.isVisibleChange.emit(false);
    FormUtil.resetForm(this.validateForm, '');
  }

  validateConfirmPassword(): void {
    setTimeout(() => this.validateForm.controls.confirmPassword.updateValueAndValidity());
  }

  confirmValidator = (control: FormControl): { [s: string]: boolean } => {
    if (!control.value) {
      return { required: true };
    } else if (control.value !== this.validateForm.controls.newPassword.value) {
      return { confirmPassword: true, error: true };
    }
  };
}
