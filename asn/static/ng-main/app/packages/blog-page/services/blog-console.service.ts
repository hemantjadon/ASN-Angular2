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
	
	public get_blogs(user : User , token : string) : Promise<Blog[]> {
		return new Promise<Blog[]>((resolve : Function , reject : Function) => {
			let query_array = [
				{ key : 'author' , value : user.user_id },
			]
			let blogs_url_author_only_get : URL = this.apiEndpoints.BlogURL_Author_Only_GET();

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
}