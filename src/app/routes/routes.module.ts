import { NgModule, Type } from '@angular/core';
import { SharedModule } from '@shared';
// dashboard pages
import { DashboardComponent } from './dashboard/dashboard.component';
// single pages
import { CallbackComponent } from './passport/callback.component';
// passport pages
import { UserLoginComponent } from './passport/login/login.component';
import { UserRegisterResultComponent } from './passport/register-result/register-result.component';
import { UserRegisterComponent } from './passport/register/register.component';
import { RouteRoutingModule } from './routes-routing.module';

const COMPONENTS: Type<void>[] = [
  DashboardComponent,
  // passport pages
  UserLoginComponent,
  UserRegisterComponent,
  UserRegisterResultComponent,
  // single pages
  CallbackComponent,
];

@NgModule({
  imports: [SharedModule, RouteRoutingModule],
  declarations: COMPONENTS,
})
export class RoutesModule {}
