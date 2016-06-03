from django.db import models,IntegrityError
from django.conf import settings
from .utils import UUIDKeyGenerator

# Create your models here.


class Blog(models.Model):
	'''
		Blog Model contains information about blogs. 
			-> id, author(FK ~> user.AuthUser), timestamp, title, content
	'''
	
	id = models.CharField(max_length=22,primary_key=True,editable=False)
	author = models.ForeignKey(settings.AUTH_USER_MODEL,related_name='blogs')
	timestamp = models.DateTimeField(auto_now_add=True)
	title = models.CharField(max_length=75,blank=False,null=True)
	content = models.TextField(blank=False,null=True)

	class Meta:
		ordering = ['-timestamp']
		
	def __str__(self):
		return "%s by %s on %s"%(self.title,self.author.get_full_name(),self.timestamp)
	
	def save(self,*args,**kwargs):
		'''
			Overriding .save() method for assigning the UUID keys to each new object.
		'''
		
		if len(self.id) == 0:
			self.id = UUIDKeyGenerator()
		
		# Checking for Uniqueness of key.
		while True:
			try:
				super(Blog,self).save()
				break
				
			except IntegrityError:
				self.id = UUIDKeyGenerator()



class BlogComment(models.Model):
	'''
		Blog Comment Model contains information about comments on blogs.
			-> id, blog(FK ~> .Blog), author(FK ~> user.AuthUser), timestamp, title, content
	'''
	
	id = models.CharField(max_length=22,primary_key=True,editable=False)
	blog = models.ForeignKey(Blog,related_name='comments',blank=False)
	author = models.ForeignKey(settings.AUTH_USER_MODEL,related_name='blog_comment')
	timestamp = models.DateTimeField(auto_now_add=True)
	comment = models.TextField(blank=True,null=True)
	
	class Meta:
		ordering = ['timestamp']
		
	def __str__(self):
		return "For %s by %s on %s"%(self.blog.title,self.author.get_full_name(),self.timestamp)
	
	def save(self,*args,**kwargs):
		'''
			Overriding .save() method for assigning the UUID keys to each new object.
		'''
		
		if len(self.id) == 0:
			self.id = UUIDKeyGenerator()
		
		# Checking for Uniqueness of key.
		while True:
			try:
				super(BlogComment,self).save()
				break
				
			except IntegrityError:
				self.id = UUIDKeyGenerator()