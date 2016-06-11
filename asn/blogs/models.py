from django.db import models,IntegrityError
from django.conf import settings
from .utils import UUIDKeyGenerator

# Create your models here.

class Blog(models.Model):
	'''
		* Blog Model contains information about blogs. 
		* 'id' , 'author' , 'timestamp' , 'publication_date' , 'title' , 'description' , 'category' ,'content'.
	'''
	
	id = models.CharField(max_length=22,primary_key=True,editable=False)
	author = models.ForeignKey(settings.AUTH_USER_MODEL,related_name='blogs')
	timestamp = models.DateTimeField(auto_now_add=True)
	pub_date = models.DateTimeField(blank=True,null=True)
	title = models.CharField(max_length=200,blank=False,null=False,default="Title")
	description = models.CharField(max_length=1000,blank=False,null=False,default="Description of Blog.")
	category = models.CharField(max_length=50,blank=False,null=False,default="Category")
	content = models.TextField(blank=True,null=True)
	header_color_hash = models.CharField(max_length=7,blank=False,null=False,default="#8bc34a")
	is_published = models.BooleanField(default=False)

	class Meta:
		ordering = ['-timestamp']
		
	def __str__(self):
		return "%s by %s on %s"%(self.title,self.author.get_full_name(),self.timestamp)
	
	def save(self,*args,**kwargs):
		'''
			Overriding .save() method for assigning the b64encoded UUID keys to each new object.
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
		* Blog Comment Model contains information about comments on blogs.
		* 'id' , 'blog' , 'author' , 'timestamp' , 'title' , 'content'.
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