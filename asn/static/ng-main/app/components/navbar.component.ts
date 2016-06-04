import { Component,OnInit } from '@angular/core';

import { AUTH } from '../services/auth.service';
import { User } from '../user.interface';

@Component({
	selector : 'nav-bar',
	templateUrl : "static/ng-main/build/app/templates/navbar.component.html",
	styleUrls : [ "static/ng-main/build/app/styles/navbar.component.css"]
})

export class NavbarComponent implements OnInit{
	
	private user : User;
	
	constructor(private AUTH : AUTH){
		this.user = new User();
		this.user = this.AUTH.construct_user_from_localStorage();
	}
	
	ngOnInit(){
		this._enableDropdown();
	}
	
	private _enableDropdown(){
		$('.hamburger').dropdown({
			inDuration: 300,
			outDuration: 225,
			constrain_width: false, // Does not change width of dropdown to that of the activator
			hover: false, // Activate on hover
			gutter: 10, // Spacing from edge
			belowOrigin: true, // Displays dropdown below the button
			alignment: 'left' // Displays dropdown with edge aligned to the left of button
		});
	}
}