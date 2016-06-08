import { Component,OnInit } from '@angular/core';
import { RouteParams,Router } from '@angular/router-deprecated';
import * as moment_ from 'moment';
const moment:moment.MomentStatic = (<any>moment_)['default'] || moment_;

import { User } from '../user.interface';
import { Blog } from './blog.interface';
import { AUTH } from '../auth-services/auth.service';
import { BlogConsoleService } from './services/blog-console.service';

@Component({
	selector: 'blog-console-edit',
	templateUrl: "static/ng-main/build/app/packages/blog-page/templates/blog-edit.component.html",
	styleUrls: ["static/ng-main/build/app/packages/blog-page/styles/blog-edit.component.css"]
})
export class BlogEditComponent{
	private user : User;
	
	private user_token : string;
	
	constructor( private AUTH : AUTH,
		private routeParams : RouteParams, 
		private router : Router,
		private  consoleService : BlogConsoleService )
	{
		this.user = new User();
		this.user = this.AUTH.construct_user_from_localStorage();
		this.user_token = this.AUTH.get_token();
	}
	
	ngOnInit(){
		let id = this.routeParams.get('id');
		console.log(id);
		this.getBlog(id);
	}

	private blog : Blog;

	private getBlog(id : string){
		if (this.user.user_id == null) {
			console.error('You must not enter here !!!!',{'message' : 'Handle 403 : Forbidden'});
		}
		else {
			this.consoleService.get_blogs(this.user,this.user_token,id)
							   .then((blog : Blog) => {
								   this.blog = blog;
								})
								.catch(( error ) => {
									if (error.status === 404) {
										this.blog = new Blog();
									}
									else {
										console.warn(error,{'message' : 'Something Went wrong this should not happen.'});
									}
								});
		}
	}

	private momentify(DateTime_String : string){
		let _moment = moment(DateTime_String,moment.ISO_8601);
		
		return _moment.calendar(null,{
			sameDay: '[Today]',
			nextDay: '[Tomorrow]',
			lastDay: '[Yesterday]',
			sameElse: 'MMMM DD[,] YYYY'
		});
	}

	// Just to provide first character of category or "B" to template.
	private _categoryFirstChar(){
		if (this.blog.category) {
			return this.blog.category[0];	
		}
		else {
			return "B";
		}
	}
}