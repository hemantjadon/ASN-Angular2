"""asn URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/1.9/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  url(r'^$', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  url(r'^$', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.conf.urls import url, include
    2. Add a URL to urlpatterns:  url(r'^blog/', include('blog.urls'))
"""
from django.conf.urls import url,include
from django.contrib import admin
from rest_framework_jwt.views import obtain_jwt_token,verify_jwt_token
from .views import APIRoot,PolymerRoot

urlpatterns = [
    url(r'^api/$',APIRoot.as_view(),name='api'),
    url(r'^api/users/',include('user.urls')),
    url(r'^api/blogs/',include('blogs.urls')),
    url(r'^api-auth/',include('rest_framework.urls',namespace='rest_framework')),
    url(r'^api-token-auth/$', obtain_jwt_token),
    url(r'^api-token-verify/$', verify_jwt_token),
    url(r'^admin/',include(admin.site.urls)),
    url(r'^',PolymerRoot.as_view(),name='app_root')
]
