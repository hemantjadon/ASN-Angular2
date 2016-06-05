import { Injectable } from '@angular/core';
import { Http,Headers } from '@angular/http';
import 'rxjs/add/operator/toPromise';

import { Blog } from '../blog.interface';
import { User } from '../../user.interface';
import { URL,APIEndpoints } from '../../api-endpoints';

/**
 * Service which do all the tasks related to blog fetching, creating, modifying, deleting.
 * 
 * @method : <Promise<Blog[]>> get_blogs()	=>	Fetches blogs from API.
 */
@Injectable()
export class BlogService{
	
	constructor(
		private http : Http,
		private apiEndpoints : APIEndpoints
	){}
	
	public get_blogs() : Promise<Blog[]> {
		return new Promise<Blog[]>((resolve : Function , reject : Function) => {
			
			let blogs_url_get : URL = this.apiEndpoints.BlogURL_GET();
			let headers = new Headers({
				'Content-Type' : 'application/json',
			});
			
			this.http.get(blogs_url_get.url,{ headers : headers })
					 .toPromise()
					 .then((response) => {
						 resolve(response.json());
					 })
					 .catch((error : Error) => {
						 reject(error);
					 });
		});
	}
	
	public create_blog(user : User,token : string) {
		console.log(user);
		if ( user.is_authenticated ) {
			let blog_creation_url : URL = this.apiEndpoints.BlogURL_CREATE();
			let headers = new Headers({
				'Content-Type' : 'application/json',
				'Authorization' : 'JWT ' + token,
			});
			
			let payload = { title : 'Testing' , content : 'Testing Creation of blog by, Angular2'};
			this.http.post(blog_creation_url.url , JSON.stringify(payload), { headers : headers } )
					 .toPromise()
					 .then((response) => {
						 console.log(response.json());
					 })
					 .catch((error : Error) => {
						 console.log(error);
					 });
		}
	}
}