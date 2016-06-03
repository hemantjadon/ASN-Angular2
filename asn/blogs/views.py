from django.shortcuts import render
from rest_framework import generics
from rest_framework import permissions
from rest_framework.exceptions import NotFound
from rest_framework.views import exception_handler
from rest_framework.response import Response
from rest_framework import status

from .serializers import BlogSerializer,BlogCommentSerializer
from .models import Blog,BlogComment

from .permissions import IsBlogAuthor,IsBlogCommentAuthor,IsBlogCommentAuthorOrAdmin

# Create your views here.

class BlogList(generics.ListAPIView):
	queryset = Blog.objects.all()
	serializer_class = BlogSerializer


class BlogDetail(generics.RetrieveAPIView):
	serializer_class = BlogSerializer
	
	def get_queryset(self):
		pk = self.kwargs['pk']
		return Blog.objects.filter(id = pk)

class BlogCreate(generics.CreateAPIView):
	serializer_class = BlogSerializer
	permission_classes = ([ permissions.IsAdminUser ])
	
	def perform_create(self,serializer):
		serializer.save(author = self.request.user)
		
class BlogUpdate(generics.UpdateAPIView):
	serializer_class = BlogSerializer
	permission_classes = ([ IsBlogAuthor ])
	
	def get_queryset(self):
		pk = self.kwargs['pk']
		return Blog.objects.filter(id = pk)
	
class BlogDelete(generics.DestroyAPIView):
	serializer_class = BlogSerializer
	permission_classes = ([ IsBlogAuthor ])
	
	def get_queryset(self):
		pk = self.kwargs['pk']
		return Blog.objects.filter(id = pk)




class BlogCommentList(generics.ListAPIView):
	serializer_class = BlogCommentSerializer
	
	def get_queryset(self):
		blog_pk = self.kwargs['blogID']
		return BlogComment.objects.filter(blog__id = blog_pk)
	
class BlogCommentDetail(generics.RetrieveAPIView):
	serializer_class = BlogCommentSerializer
	
	def get_queryset(self):
		pk = self.kwargs['pk']
		return BlogComment.objects.filter(id = pk)
	
class BlogCommentCreate(generics.CreateAPIView):
	serializer_class = BlogCommentSerializer
	permission_classes = ([ permissions.IsAuthenticated ])
	
	def create(self,request,*args,**kwargs):
		# It was required to override .create() to handle exception of
		# non existent blogID during creation of BlogComment
		
		blogID = self.kwargs['blogID']
		
		try :
			blog = Blog.objects.get(id = blogID)
			serializer = self.get_serializer(data=request.data)
			serializer.is_valid(raise_exception=True)
			self.perform_create(serializer)
			headers = super(BlogCommentCreate,self).get_success_headers(serializer.data)
			return Response(serializer.data, status=status.HTTP_201_CREATED, headers=headers)
			
		except Blog.DoesNotExist:
			blog = None
			exception = NotFound(detail="The blog of given ID does not exist.")
			response = exception_handler(exception,{})
			return response
			
	def perform_create(self,serializer):
		blogID = self.kwargs['blogID']
		blog = Blog.objects.get(id = blogID)
		serializer.save(author = self.request.user , blog = blog)
		
class BlogCommentUpdate(generics.UpdateAPIView):
	serializer_class = BlogCommentSerializer
	permission_classes = ([ IsBlogCommentAuthor ])
	
	def get_queryset(self):
		pk = self.kwargs['pk']
		return BlogComment.objects.filter(id = pk)

class BlogCommentDelete(generics.DestroyAPIView):
	serializer_class = BlogCommentSerializer
	permission_classes = ([ IsBlogCommentAuthorOrAdmin ])
	
	def get_queryset(self):
		pk = self.kwargs['pk']
		return BlogComment.objects.filter(id = pk)
		
class BlogComment_All_List(generics.ListAPIView):
	queryset = BlogComment.objects.all()
	serializer_class = BlogCommentSerializer
	permission_classes = ([ permissions.IsAdminUser ])