import { Component,OnInit } from '@angular/core';

import { User } from '../user.interface';
import { Blog } from './blog.interface';
import { AUTH } from '../auth-services/auth.service';
import { BlogService } from './services/blog.service';

@Component({
	selector: 'blogs-feed',
	templateUrl: "static/ng-main/build/app/packages/blog-page/templates/blog-feed.component.html",
	styleUrls: ["static/ng-main/build/app/packages/blog-page/styles/blog-feed.component.css"]
})
export class BlogFeedComponent implements OnInit {
	
	private user : User;
	
	private user_token : string;
	
	constructor( private AUTH : AUTH , private  blogService : BlogService ){
		this.user = new User();
		this.user = this.AUTH.construct_user_from_localStorage();
		this.user_token = this.AUTH.get_token();
	}
	
	ngOnInit(){
		this.getAllBlogs();
		this.createBlog();
	}
	
	private blogs : Blog[];
	
	private getAllBlogs(){
		console.log('yooo');
		this.blogService.get_blogs()
						.then((blogs : Blog[]) => {
							this.blogs = blogs;
							console.log(this.blogs);
						})
						.catch(( error : Error ) => {
							console.warn(error,{'message' : 'Something Went wrong this should not happen.'});
						});
	}
	
	private createBlog(){
		this.blogService.create_blog(this.user,this.user_token);
	}
}