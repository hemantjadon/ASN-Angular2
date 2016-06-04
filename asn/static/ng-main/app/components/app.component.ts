import { Component,OnInit } from '@angular/core';
import { RouteConfig, ROUTER_DIRECTIVES, ROUTER_PROVIDERS } from '@angular/router-deprecated';

import { AUTH } from '../services/auth.service';
import { NavbarComponent } from './navbar.component';
import { HomePageComponent } from './home-page.component';

@Component({
	selector: 'ng-app',
	templateUrl: "static/ng-main/build/app/templates/app.component.html",
	styleUrls: ["static/ng-main/build/app/styles/app.component.css"],
	directives: [
		NavbarComponent,
		ROUTER_DIRECTIVES
	],
	providers: [ 
		AUTH,
		ROUTER_PROVIDERS
	],
})
@RouteConfig([
	{
		path: '/',
		name : 'HomePage',
		component : HomePageComponent,
		useAsDefault : true
	}
])
export class AppComponent implements OnInit {
	
	
	constructor(private AUTH : AUTH){
	}
	
	ngOnInit() { 
		// this.AUTH.login('admin','admin1234')
		// 		 .then((response) => {
		// 			 console.log(response);
		// 		 })
		// 		 .catch((error)=>{ 
		// 			 console.error(error) 
		// 		 });
		
		this.AUTH.logout();
	}
}