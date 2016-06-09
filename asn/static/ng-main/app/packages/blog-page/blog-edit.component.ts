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
export class BlogEditComponent implements OnInit{
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
								   this._colorPalette.markSelectedColor();
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
			lastWeek: 'MMMM DD[,] YYYY',
			sameElse: 'MMMM DD[,] YYYY',
		});
	}

	private _colorPalette = {

		colors: list_of_colors,

		markSelectedColor : ()=>{
			this._colorPalette.colors.forEach(( color )=>{
				if (color.hash_value === this.blog.header_color_hash) {
					color.selected = true;
				}
			});
		},

		onClick : (target)=>{
			$(target).children('.dropdown').css({ 'height' : `${ list_of_colors.length * 44 }px`,'opacity': 1 });
		},

		onMouseLeave : (target) => {
			$(target).children('.dropdown').css({ 'height' : `${ 0 }px`,'opacity': 0 });
		}
	}

	private changeHeaderColor($event : Event,color : Color){
		if (color.selected) {
			return;
		}

		this.blog.header_color_hash = color.hash_value;

		this._colorPalette.colors.forEach(( colour ) => {
			colour.selected = false;
		});
		color.selected = true;
		
		// Updating at server.
		this.consoleService.update_blog(this.user , this.user_token ,this.blog)
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

class Color {
	name : string;
	hash_value : string;
	rgb_value : string;
	selected : boolean;

	constructor(name=null , hash_value = null , rgb_value = null , selected = false){
		this.name = name;
		this.hash_value = hash_value;
		this.rgb_value = rgb_value;
		this.selected = false;
	}
}

var list_of_colors : Color[] = [
	new Color("Green","#8bc34a","rgb(139, 195, 74)"),
	new Color("Magenta", "#e91e63","rgb(233, 30, 99)"),
	new Color("Blue", "#00acc1", "rgb(186, 104, 200)"),
	new Color("Purple", "#ba68c8", "rgb(186, 104, 200)"),
	new Color("Pink","#f06292","rgb(240, 98, 146)"),
	new Color("Orange","#f9a825","rgb(249, 168, 37)"),
	new Color("Red","#dd5f5f","rgb(221, 95, 95)"),
	new Color("Gray","#90a4ae","rgb(144, 164, 174)")
]