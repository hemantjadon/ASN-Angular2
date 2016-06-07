/**
 * User class with interface of user stored in local storage.
 */
export class User {
	username : string;
	exp : number;
	user_id : number;
	is_staff : boolean;
	email : string;
	is_authenticated : boolean;
	
	constructor() {
		this.username = null;
		this.exp = null;
		this.user_id = null;
		this.is_staff = false;
		this.email = null;
		this.is_authenticated = false;
	}
}