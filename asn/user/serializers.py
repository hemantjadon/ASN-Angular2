from rest_framework import serializers
from .models import AuthUser

class UserSerializer(serializers.HyperlinkedModelSerializer):
	'''
		Serializer for the User Model.
		Contains information about : url, id, username, email, staff_status.
	'''
	
	url = serializers.HyperlinkedIdentityField(view_name='user-detail',many=False)
	
	class Meta:
		model = AuthUser
		fields = ('url','id','username','email','is_staff')