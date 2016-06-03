from rest_framework import permissions

# Create Permissions here.

class IsBlogAuthor(permissions.BasePermission):
	'''
		Permission only for 'Author of Blogs'
	'''
	
	def has_permission(self,request,view):

		view.get_object()
		return True
		
	def has_object_permission(self,request,view,obj):
		if request.user :
				return obj.author == request.user
			
		else:
			return False
		
		
class IsBlogCommentAuthorOrAdmin(permissions.BasePermission):
	'''
		Permission only for 'Author' of Blogs Comments and 'admin'
	'''
	
	def has_permission(self,request,view):

		view.get_object()
		return True
		
	def has_object_permission(self,request,view,obj):
		
		if request.user and request.user.is_staff :
			return True
		
		else:
			if request.user :
				return obj.author == request.user
			
			else:
				return False
				
				
class IsBlogCommentAuthor(permissions.BasePermission):
	'''
		Permission only for 'Author' of Blogs Comments
	'''
	
	def has_permission(self,request,view):

		view.get_object()
		return True
		
	def has_object_permission(self,request,view,obj):
		
		if request.user :
			return obj.author == request.user
		
		else:
			return False