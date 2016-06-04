/**
 * User class with interface of user stored in local storage.
 */
export class User {
	username : string;
	exp : number;
	user_id : number;
	email : string;
	is_authenticated : boolean;
	
	constructor() {
		this.username = null;
		this.exp = null;
		this.user_id = null;
		this.email = null;
		this.is_authenticated = false;
	}
}