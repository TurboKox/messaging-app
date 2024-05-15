import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CzatComponent } from './czat/czat.component';
import { UserRegisterComponent } from './user/user-register/user-register.component';
import { UserLoginComponent } from './user/user-login/user-login.component';
import { UserLogoutComponent } from './user/user-logout/user-logout.component';

const routes: Routes = [
  { path: "czat", component: CzatComponent },
  { path: "rejestracja", component: UserRegisterComponent},
  { path: "logowanie", component: UserLoginComponent},
  { path: "wylogowanie", component: UserLogoutComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
