import { Component,OnInit } from '@angular/core';
import { Router,RouteParams } from '@angular/router-deprecated';

import { AUTH } from './auth-services/auth.service';
import { User } from './user.interface';

@Component({
	selector : 'nav-bar',
	templateUrl : "static/ng-main/build/app/templates/navbar.component.html",
	styleUrls : [ "static/ng-main/build/app/styles/navbar.component.css"]
})

export class NavbarComponent implements OnInit{
	
	private user : User;
	
	constructor(private AUTH : AUTH , private router : Router){
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
			gutter: 0, // Spacing from edge
			belowOrigin: true, // Displays dropdown below the button
			alignment: 'left' // Displays dropdown with edge aligned to the left of button
		});
	}
	
	private NavbarElements = NavbarElements;
	
	private _navigation($event : Event , element){
		let link = ['BlogPage'];
		this.router.navigate(link);
		console.log(this.router.currentInstruction);
	}
}

var NavbarElements : Object[] = [
	{show_name:'Blogs',page_name:'BlogPage'},
	{show_name:'Fourms',page_name:'FourmPage'},
	{show_name:'Events',page_name:'EventPage'},
	{show_name:'Schedule',page_name:'SchedulePage'}
]