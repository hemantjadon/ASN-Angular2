import { Component,OnInit } from '@angular/core';
import { AUTH } from '../services/auth.service';
import { NavbarComponent } from './navbar.component';

@Component({
	selector: 'my-app',
	templateUrl: "static/ng-main/build/app/templates/app.component.html",
	styleUrls: ["static/ng-main/build/app/styles/app.component.css"],
	providers: [ AUTH ]
})

export class AppComponent implements OnInit {
	constructor(
		private AUTH : AUTH
	){}
	
	ngOnInit() {
		
	}
}