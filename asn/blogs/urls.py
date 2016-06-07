from django.conf.urls import url
from . import views


urlpatterns = [
	url(r'^$', views.BlogList.as_view(),name='blog-list'),
	url(r'^create/$', views.BlogCreate.as_view(),name='blog-create'),
	url(r'^(?P<pk>[a-zA-Z0-9+_]{22,})/$', views.BlogDetail.as_view(),name='blog-detail'),
	url(r'^(?P<pk>[a-zA-Z0-9+_]{22,})/update/$', views.BlogUpdate.as_view(),name='blog-update'),
	url(r'^(?P<pk>[a-zA-Z0-9+_]{22,})/delete/$', views.BlogDelete.as_view(),name='blog-delete'),
	url(r'^author-only/$',views.BlogList_AuthorOnly.as_view(),name='blog-list-author-only'),
	url(r'^author-only/(?P<pk>[a-zA-Z0-9+_]{22,})/$',views.BlogDetail_AuthorOnly.as_view(),name='blog-detail-author-only'),

	url(r'^(?P<blogID>[a-zA-Z0-9+_]{22,})/comments/$', views.BlogCommentList.as_view(),name='blog-comment-list'),
	url(r'^(?P<blogID>[a-zA-Z0-9+_]{22,})/comments/create/$', views.BlogCommentCreate.as_view(),name='blog-comment-create'),
	url(r'^(?P<blogID>[a-zA-Z0-9+_]{22,})/comments/(?P<pk>[a-zA-Z0-9+_]{22,})/$', views.BlogCommentDetail.as_view(),name='blog-comment-detail'),
	url(r'^(?P<blogID>[a-zA-Z0-9+_]{22,})/comments/(?P<pk>[a-zA-Z0-9+_]{22,})/update/$', views.BlogCommentUpdate.as_view(),name='blog-comment-update'),
	url(r'^(?P<blogID>[a-zA-Z0-9+_]{22,})/comments/(?P<pk>[a-zA-Z0-9+_]{22,})/delete/$', views.BlogCommentDetail.as_view(),name='blog-comment-delete'),
	url(r'^comments/all/$',views.BlogComment_All_List.as_view(),name='blog-comment-list-all'),
]