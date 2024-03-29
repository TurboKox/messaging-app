import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { WiadomoscComponent } from './wiadomosc/wiadomosc.component';
import { CzatComponent } from './czat/czat.component';

@NgModule({
  declarations: [
    AppComponent,
    WiadomoscComponent,
    CzatComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
