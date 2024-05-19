import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { WiadomoscComponent } from './wiadomosc/wiadomosc.component';
import { CzatComponent } from './czat/czat.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { StoreModule } from '@ngrx/store';
import { UserLoginComponent } from './user/user-login/user-login.component';
import { UserRegisterComponent } from './user/user-register/user-register.component';
import { UserLogoutComponent } from './user/user-logout/user-logout.component';

import { APIService } from './api.service';
import { provideRouter } from '@angular/router';
import { routes } from './app-routing.module';
import { userReduktor } from './magazyn/user-reducers';
import { AuthService } from './auth.service';


@NgModule({
  declarations: [
    AppComponent,
    WiadomoscComponent,
    CzatComponent,
    UserLoginComponent,
    UserRegisterComponent,
    UserLogoutComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    StoreModule.forRoot({user: userReduktor})
  ],
  providers: [
    provideRouter(routes),
    APIService,
    AuthService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
