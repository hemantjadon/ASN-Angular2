import { Injectable } from '@angular/core';

// URL interface which can be used for creating urls.
export class URL {
	url : string;
	allowed_methods : string[];
}


/**
 * Class which contains methods to create url and there specifications on the fly.
 * 
 * @method : <URL>LoginURL()	=>	gives api endpoint for login.	['POST']
 */

@Injectable()
export class APIEndpoints {
	
	public LoginURL() : URL {
		let loginUrl = new URL();

		loginUrl.url = window.location.origin + '/api-token-auth/';
		loginUrl.allowed_methods = ['POST'];
		return loginUrl;
	}
}