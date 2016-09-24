import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { appRoutingProviders, Routing } from './app.routing';

import { ScheduleModule } from './schedule/schedule.module';
import { NavbarModule } from './navbar/navbar.module';

import { TitleService } from './shared/services/title.service';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    Routing,
    ScheduleModule,
    NavbarModule
  ],
  providers: [
    TitleService, 
    appRoutingProviders 
  ],
  bootstrap: [ AppComponent ]
})
export class AppModule { }
