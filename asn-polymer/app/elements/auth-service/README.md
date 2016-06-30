# user-data

* `user-data` component provides the one-off source for user data.

* As we are dealing with a rest server it is important to store `JWT` coming in from user and passing these tokens in application.

* Specs :
	+ Whenever there is a need of user in the application hook this element to talk to localstorage for user. 

	+ It includes the user object from the localstorage and pass it.

	+ It generates the default anonymous user if no user is present in localstorage.
	
	+ It also generates the default anonymous user if the token of the user present in the localstorage has expired.

	+ It rechecks for the user after listening to `check-user-status` event, returns the `Promise` to set the user in application.(anonymous or authentuicated)

	+ It also sets the user in localstorage after listening to `set-user` event, returns the `Promise` to set user in application.(sets the `item` argument in the event to user).