import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppShell } from './app-shell/app-shell.component';

@NgModule({
	imports : [ BrowserModule ],
	declarations : [ AppShell ],
	bootstrap : [ AppShell ]
})
export class AppModule { }