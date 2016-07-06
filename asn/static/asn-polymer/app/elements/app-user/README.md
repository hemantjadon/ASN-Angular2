# app-user

* This element aims to provide one off service to interact with user data stored in `localstorage`.

* This helps to __easier__ and __imperative__ `data-binding` with _*localstorage*_.


### Specs :

* Binds user to its __user__ attribute to _*localstorage user*_, which will be updated successful login.

* It sets __anonymous user__ if it does not find any user in localstorage.


### Properties of __anonymous user__:

+ username = null

+ email = null

+ token = null

+ expires_at = null

+ is_anonymous = true

+ is_authenticated = false

+ is_admin = false
