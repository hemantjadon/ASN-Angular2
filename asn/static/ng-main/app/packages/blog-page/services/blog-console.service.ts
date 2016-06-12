import { Injectable } from '@angular/core';
import { Http,Headers } from '@angular/http';
import 'rxjs/add/operator/toPromise';

import { Blog } from '../blog.interface';
import { User } from '../../user.interface';
import { URL,APIEndpoints } from '../../api-endpoints'

/**
 * Service which do all the tasks related to blog fetching, creating, modifying, deleting.
 * 
 * @method : <Promise<Blog[]>> get_blogs()	=>	Fetches blogs from API of the loggend in staff user.
 */
@Injectable()
export class BlogConsoleService{
	constructor(
		private http : Http,
		private apiEndpoints : APIEndpoints
	){}
	
	public get_blogs(user : User , token : string , id : string = null) : Promise<Blog[] | Blog > {
		return new Promise<Blog[]>((resolve : Function , reject : Function) => {
			let blogs_url_author_only_get : URL;

			if( id ){
				 blogs_url_author_only_get = this.apiEndpoints.BlogURL_Author_Only_GET( id );
			}
			else {
				blogs_url_author_only_get = this.apiEndpoints.BlogURL_Author_Only_GET();
			}

			let headers = new Headers({
				'Content-Type' : 'application/json',
				'Authorization': 'JWT ' + token, 
			});
			
			this.http.get(blogs_url_author_only_get.url,{ headers : headers })
					 .toPromise()
					 .then((response) => {
						 resolve(response.json());
					 })
					 .catch((error : Error) => {
						 reject(error);
					 });
		});
	}

	public update_blog(user : User , token : string , blog : Blog) : Promise<Blog>{
		return new Promise<Blog>((resolve : Function , reject : Function) => {
			let blog_update_url : URL = this.apiEndpoints.BlogURL_UPDATE( blog.id );

			let headers = new Headers({
				'Content-Type' : 'application/json',
				'Authorization': 'JWT ' + token, 
			});

			let payload = JSON.stringify(blog); 

			this.http.put(blog_update_url.url,payload,{ headers : headers })
					 .toPromise()
					 .then((response) => {
						 resolve(response.json());
					 })
					 .catch((error : Error) => {
						 reject(error);
					 });
		});
	}

	public create_blog(user : User,token : string) : Promise<Blog>{
		return new Promise<Blog>((resolve : Function , reject : Function) => {
			let blog_create_url = this.apiEndpoints.BlogURL_CREATE();

			let headers = new Headers({
				'Content-Type' : 'application/json',
				'Authorization': 'JWT ' + token, 
			});

			this.http.post(blog_create_url.url,"",{ headers : headers})
					 .toPromise()
					 .then(( response ) => {
						 resolve(response.json());
					 })
					 .catch((error : Error) => {
						 reject(error);
					 });

		});
	}
}