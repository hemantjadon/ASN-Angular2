import { Component,OnInit } from '@angular/core';
import * as moment_ from 'moment';
const moment:moment.MomentStatic = (<any>moment_)['default'] || moment_;

import { User } from '../user.interface';
import { Blog } from './blog.interface';
import { AUTH } from '../auth-services/auth.service';
import { BlogConsoleService } from './services/blog-console.service';

@Component({
	selector: 'blog-console',
	templateUrl: "static/ng-main/build/app/packages/blog-page/templates/blog-console.component.html",
	styleUrls: ["static/ng-main/build/app/packages/blog-page/styles/blog-console.component.css"]
})

export class BlogConsoleComponent implements OnInit {
	
	private user : User;
	
	private user_token : string;
	
	constructor( private AUTH : AUTH , private  consoleService : BlogConsoleService ){
		this.user = new User();
		this.user = this.AUTH.construct_user_from_localStorage();
		this.user_token = this.AUTH.get_token();
	}
	
	ngOnInit(){
		this.getUserBlogs();
	}
	
	private blogs : Blog[];
	
	private getUserBlogs(){
		if (this.user.user_id == null) {
			console.error('You must not enter here !!!!',{'message' : 'Handle 403 : Forbidden'});
		}
		else {
			this.consoleService.get_blogs(this.user,this.user_token)
							.then((blogs : Blog[]) => {
								this.blogs = blogs;
								
							})
							.catch(( error : Error ) => {
								console.warn(error,{'message' : 'Something Went wrong this should not happen.'});
							});
		}
	}

	private momentify(DateTime_String : string){
		let _moment = moment(DateTime_String,moment.ISO_8601);
		
		return _moment.format("MMMM DD[,] YYYY");
	}
}