from django.db import models
from django.contrib.auth.models import AbstractUser

# Create your models here.

class AuthUser(AbstractUser):
	'''
		Auth User Model Derived from AbstractUser for future updations
		or addition of new fields if required.
	'''
	
	def __str__(self):
		return "%s"%super(AuthUser,self).__str__()
		
	def get_full_name(self):
		'''
			Returns The Full Name of the user as STRING.
		'''
		
		return "%s %s"%(self.first_name,self.last_name)