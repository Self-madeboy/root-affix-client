import { FormGroup } from '@angular/forms';

/**
 * 表单工具类
 */
export class FormUtil {
  /**
   * 重置表单
   * @param fg 表单
   * @param reset 是否调用reset
   */
  public static resetForm(fg: FormGroup, data?: any): void {
    fg.reset(data);
    for (const key in fg.controls) {
      if (fg.controls[key]) {
        fg.controls[key].markAsUntouched();
        fg.controls[key].markAsPristine();
        fg.controls[key].updateValueAndValidity();
      }
    }
  }

  /**
   * 验证表单
   * @param fg 表单
   */
  public static validateForm(fg: FormGroup): boolean {
    for (const key in fg.controls) {
      if (fg.controls[key]) {
        // 标记控件值已经改变，只是为了显示错误提示，避免用户在没有任何操作的情况下点击保存
        fg.controls[key].markAsDirty();
        // 表单输入过程中已经验证了，没能必要再次进行验证
        // fg.controls[key].updateValueAndValidity();
      }
    }
    return fg.valid;
  }
}
