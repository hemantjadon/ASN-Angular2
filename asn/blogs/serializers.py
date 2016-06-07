from rest_framework import serializers
from .models import Blog,BlogComment
from user.models import AuthUser

from .CustomSerializerFields import Custom_Author_HyperlinkedIdentity , Custom_BlogComment_HyperlinkedIdentityField , Custom_Blog_HyperlinkedIdentityField		
from .CustomSerializers import DynamicFieldsHyperlinkedModelSerializer


class BlogCommentSerializer(DynamicFieldsHyperlinkedModelSerializer):
	'''
		Serializer for the 'BlogComment' Model.
		Contains information about : 'url', 'id', 'timestamp', 'author', 'blog', 'content'.
	'''
	
	url = Custom_BlogComment_HyperlinkedIdentityField(view_name='blog-comment-detail',lookup_field='pk')
	author = Custom_Author_HyperlinkedIdentity(view_name='user-detail',lookup_field='pk')
	blog = Custom_Blog_HyperlinkedIdentityField(view_name='blog-detail',lookup_field='pk')
	
	class Meta:
		model = BlogComment
		fields = ('url','id','timestamp','blog','author','comment')
	
	
class BlogSerializer(serializers.HyperlinkedModelSerializer):
	'''
		Serializer for the 'Blog' Model.
		Contains information about : 'url', 'id', 'timestamp', 'author', 'category', 'title', 
		'description', 'content','is_published' ,'comments'.
	'''
	
	url = serializers.HyperlinkedIdentityField(view_name='blog-detail',lookup_field='pk')
	author = Custom_Author_HyperlinkedIdentity(view_name='user-detail',lookup_field='pk')
	comments = BlogCommentSerializer(many = True , read_only=True , exclude = ('blog',))

	class Meta:
		model = Blog
		fields = ('url','id','timestamp','author','category','title','description','content','is_published','comments')