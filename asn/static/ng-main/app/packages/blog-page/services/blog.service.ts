import { Injectable } from '@angular/core';
import { Http,Headers } from '@angular/http';


/**
 * Service which do all the tasks related to blog fetching, creating, modifying, deleting.
 * 
 * @method : <Promise<Blog[]>> get_blogs()	=>	Fetches blogs from API.
 */
@Injectable()
export class BlogService{
	
	constructor(
		private http : Http
	){}
	
	
}