import { Injectable } from '@angular/core';

// URL interface which can be used for creating urls.
export class URL {
	url : string;
	allowed_methods : string[];
	
	constructor(){
		this.url = null;
		this.allowed_methods = null;
	}
}


/**
 * Class which contains methods to create url and there specifications on the fly.
 * 
 * @method : <URL>LoginURL()	=>	gives api endpoint for login.	['POST']
 * 
 * @method : <URL>BlogURL_GET(string)	=>	gives api endpoint for getting blogs list. 
 * 											If id is provided then returns endpoint that particular blog .	['GET']
 * 
 */

@Injectable()
export class APIEndpoints {
	
	public LoginURL() : URL {
		let loginUrl = new URL();

		loginUrl.url = window.location.origin + '/api-token-auth/';
		loginUrl.allowed_methods = ['POST'];
		return loginUrl;
	}
	
	public BlogURL_GET(id : string = null) : URL {
		
		let blog_url = new URL();
		blog_url.allowed_methods = ['GET'];
		
		if ( id ) {
			blog_url.url = window.location.origin + '/api/blogs/' + id;
		}
		else {
			blog_url.url = window.location.origin + '/api/blogs/';
		}
		
		return blog_url;
	}
	
	public BlogURL_CREATE() : URL {
		let blog_creation_url = new URL();
		blog_creation_url.allowed_methods = ['POST'];
		
		blog_creation_url.url = window.location.origin + '/api/blogs/create/';
		
		return blog_creation_url;
	}
}