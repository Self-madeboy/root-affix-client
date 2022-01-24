import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { SharedModule } from 'src/app/shared/shared.module';
import { PasswordStrengthModule } from '../../password-strength/password-strength.module';
import { ChangePasswordComponent } from './change-password.component';

@NgModule({
  imports: [SharedModule, PasswordStrengthModule],
  declarations: [ChangePasswordComponent],
  exports: [ChangePasswordComponent],
})
export class ChangePasswordModule {}
