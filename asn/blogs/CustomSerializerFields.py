from rest_framework import serializers
from rest_framework.reverse import reverse

# Create Custom Serializer Fields Here.

class Custom_Author_HyperlinkedIdentity(serializers.HyperlinkedIdentityField):
	'''
		Custom Serializer Field for URL Author in both Blog and BlogComment Serializers. 
	'''
	
	def get_url(self, obj, view_name, request, format):
		url_kwargs = {
			'pk': obj.author.pk
		}
		return reverse(view_name, kwargs=url_kwargs, request=request, format=format)
		
	def get_object(self, view_name, view_args, view_kwargs):
			lookup_kwargs = {
				'pk': view_args['pk']
			}
			return self.get_queryset().get(**lookup_kwargs)


class Custom_BlogComment_HyperlinkedIdentityField(serializers.HyperlinkedIdentityField):
	'''
		Custom Serializer Field for URL of BlogComment in Blog Comment Serializer.
	'''
	
	def get_url(self, obj, view_name, request, format):
		url_kwargs = {
			'blogID': obj.blog.id,
			'pk': obj.id
		}
		return reverse(view_name, kwargs=url_kwargs, request=request, format=format)

	def get_object(self, view_name, view_args, view_kwargs):
		lookup_kwargs = {
			'blog__id': view_kwargs['blogID'],
			'pk': view_kwargs['id']
		}
		return self.get_queryset().get(**lookup_kwargs)
		
		
class Custom_Blog_HyperlinkedIdentityField(serializers.HyperlinkedIdentityField):
	'''
		Custom Serializer Field for URL of Blog in Blog Comment Serializer.
	'''
	
	def get_url(self, obj, view_name, request, format):
		url_kwargs = {
			'pk': obj.blog.id,
		}
		return reverse(view_name, kwargs=url_kwargs, request=request, format=format)

	def get_object(self, view_name, view_args, view_kwargs):
		lookup_kwargs = {
			'id': view_kwargs['pk'],
		}
		return self.get_queryset().get(**lookup_kwargs)