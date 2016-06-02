from django.shortcuts import render

from rest_framework import generics
from rest_framework import permissions

from .serializers import UserSerializer
from .models import AuthUser

from .permissions import IsAnonymous,IsSelf

# Create your views here.

class UserList(generics.ListAPIView):
	permission_classes = ([ permissions.IsAdminUser ])
	queryset = AuthUser.objects.all()
	serializer_class = UserSerializer
	
class UserDetail(generics.RetrieveAPIView):
	serializer_class = UserSerializer
	
	def get_queryset(self):
		return AuthUser.objects.filter(id=self.request.user.id)
	
class UserCreate(generics.CreateAPIView):
	permission_classes = ([ IsAnonymous ])
	queryset = AuthUser.objects.none()
	serializer_class = UserSerializer
	
class UserUpdate(generics.UpdateAPIView):
	permission_classes = ([ IsSelf ])
	queryset = AuthUser.objects.all()
	serializer_class = UserSerializer
	
class UserDelete(generics.DestroyAPIView):
	permission_classes = ([ IsSelf ])
	queryset = AuthUser.objects.all()
	serializer_class = UserSerializer