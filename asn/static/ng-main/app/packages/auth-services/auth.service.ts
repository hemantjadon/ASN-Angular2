import { Injectable } from '@angular/core';
import { Http,Headers } from '@angular/http';
import 'rxjs/add/operator/toPromise';
import { JwtHelper,tokenNotExpired } from 'angular2-jwt';

import { User } from '../user.interface';
import { URL,APIEndpoints } from '../api-endpoints';


/**
 * The class for all authentication tasks.
 * 
 * @property : jwtHelper<Object> : JwtHelper	=> Helper JWT class to decode/encode/check token.
 * 
 * @method : <User> construct_user_from_localStorage()	=>	Constructs user from local storage and new user if none.
 * 
 * @method : <Promise<boolean>> is_authenticated()	=>	Checks if token present in localStorage is valid or not.
 * 
 * @method : <Promise<Object>> login(string, string)	=>	Logs user in. Sends request to server and saves the token and profile.
 * 	
 * @method : <Promise<Object>> logout()		=>	Logs user out. Removes token and profile from localStorage. 
 * 
 */

@Injectable()
export class AUTH {
	
	private jwtHelper : JwtHelper;	//	Helper JWT class to decode/encode/check token.
	
	constructor(private http : Http , private apiEndpoints : APIEndpoints){
		this.jwtHelper = new JwtHelper();
	}
	
	public construct_user_from_localStorage() : User {
		let status = tokenNotExpired() ? true : false;
		let user = new User();
		
		if (status) {
			user = JSON.parse(localStorage.getItem('profile'));
			user.is_authenticated = true;
		}
		else { }
		
		return user;
	}
	
	public get_token() {
		
		let token = window.localStorage.getItem('id_token');
		let status = tokenNotExpired() ? true : false;
		
		if ( status ) {
			return token;
		}
		else {
			return null;
		}
	}
	
	public is_authenticated() : Promise<boolean> {
		// Checks if token is valid or not.

		return new Promise<boolean>((resolve : Function , reject : Function)=>{
			let status = tokenNotExpired() ? true : false;
			resolve(status);
		});
	}
	
	
	public login(username : string, password : string) : Promise<Object>{
		// Logs user in.
		
		return new Promise<Object>((resolve : Function , reject : Function)=>{
			
			this.is_authenticated().then(( user_login_state )=>{	// Checking wheather user is already logged in or not.
				
				if ( user_login_state ) {	//	If already logged in, then return the user discarding request for login.
					let user = localStorage.getItem('profile');
					let resp = {
						message : 'ACCEPT',
						reason : 'Already Logged In.',
						user : user,
						status_code : 200
					}
					resolve(resp);
				}
				else {	// Else sends the request, and resolves or rejects accordingly.
					let login_url : URL = this.apiEndpoints.LoginURL();
					let payload : string = JSON.stringify({'username' : username , 'password' : password});
					let headers = new Headers({
						'Content-Type' : 'application/json',
					});
					
					this.http.post(login_url.url , payload , { headers : headers })
							.toPromise()
							.then((response) => {
								if (response.status === 200) {
									let json_response = response.json();
									let token = json_response.token;
									
									let decoded_token = this.jwtHelper.decodeToken(token);
									
									window.localStorage.setItem('profile',JSON.stringify(decoded_token));
									window.localStorage.setItem('id_token',token);
									
									let resp = {
										message : 'ACCEPT',
										reason : 'Successful Login.',
										user : decoded_token,
										status_code : 200
									}
									resolve(resp);
								}
								
								else {
									let err : Object = {
										message : 'REJECT',
										reason : ' Response from server is neither 200_OK nor 400_BAD_REQUEST but is appearing to be a success',
										status_code : response.status
									}
									reject(err);
								}
							})
							.catch((error) => { 
								if( error.status == 400) {
									let json_error = error.json();
									let err : Object = {
										message : 'REJECT',
										reason : 'Invalid/Incomplete Credentials',
										status_code : 400,
										username : json_error.username,
										password : json_error.password,
										non_field_errors : json_error.non_field_errors,
									}
									reject(err);
								}
								else {
									let err : Object = {
										message : 'REJECT', 
										reason : 'Response from server is neither 200_OK nor 400_BAD_REQUEST but is appearing to be an error.',
										status_code : error.status
									}
									reject(err);
								}
							});
				}
			 });
		});
	}
	
	public logout() : Promise<Object>{
		return new Promise<Object>((resolve : Function , reject : Function)=>{
			localStorage.removeItem('profile');
			localStorage.removeItem('id_token');
			let resp = {
				message : 'ACCEPT',
				reason : 'Successfully Logged Out !',
				status_code : 200,
			}
			resolve(resp);
		});
	}
}