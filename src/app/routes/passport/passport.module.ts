import { NgModule } from '@angular/core';
import { SharedModule } from '@shared';

import { CallbackComponent } from './callback.component';
import { UserLoginComponent } from './login/login.component';
import { PassportRoutingModule } from './passport-routing.module';
import { UserRegisterResultComponent } from './register-result/register-result.component';
import { UserRegisterComponent } from './register/register.component';

const COMPONENTS = [UserLoginComponent, UserRegisterResultComponent, UserRegisterComponent, CallbackComponent];

@NgModule({
  imports: [SharedModule, PassportRoutingModule],
  declarations: [...COMPONENTS],
})
export class PassportModule {}
