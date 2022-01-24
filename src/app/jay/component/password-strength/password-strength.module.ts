import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

// Progress进度条
import { NzProgressModule } from 'ng-zorro-antd/progress';
import { PasswordStrengthComponent } from './password-strength.component';

@NgModule({
  imports: [CommonModule, FormsModule, ReactiveFormsModule, NzProgressModule],
  declarations: [PasswordStrengthComponent],
  exports: [PasswordStrengthComponent],
})
export class PasswordStrengthModule {}
