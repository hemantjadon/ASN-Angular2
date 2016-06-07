from rest_framework_jwt.settings import api_settings
from user.serializers import UserSerializer
from datetime import datetime

def jwt_token_payload_handler(user):
	payload = {
		'username' : user.username,
		'user_id' : user.id,
		'email' : user.email,
		'is_staff' : user.is_staff,
		'exp' : datetime.now() + api_settings.JWT_EXPIRATION_DELTA
	}

	return payload
