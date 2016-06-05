import { Component,OnInit } from '@angular/core';
import { Http,Headers } from '@angular/http';
import { JwtHelper } from 'angular2-jwt';

import { User } from '../user.interface';
import { AUTH } from '../auth-services/auth.service';


@Component({
	selector: 'blogs-feed',
	templateUrl: "static/ng-main/build/app/packages/blog-page/templates/blog-feed.component.html",
	styleUrls: ["static/ng-main/build/app/packages/blog-page/styles/blog-feed.component.css"]
})
export class BlogFeedComponent implements OnInit {
	
	private user : User;
	
	constructor(private http : Http , private AUTH : AUTH ){
		this.user = new User();
		this.user = this.AUTH.construct_user_from_localStorage();
	}
	
	ngOnInit(){
		
	}
	
	private getAllBlogs(){}
}