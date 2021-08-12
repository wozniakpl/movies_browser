"""backend URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/3.2/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path, include
from rest_framework import routers
from omdbapi import views

router = routers.DefaultRouter()
router.register(r"movies", views.MovieView, "movie")
from django.views.generic import TemplateView
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
)
from django.conf import settings


def ensure_temporary_user_existence():
    from django.contrib.auth.models import User

    if User.objects.filter(username="temp").exists():
        return

    user = User.objects.create(username="temp")
    user.set_password("temptemp")
    user.save()


# if settings.DEBUG: # TODO
ensure_temporary_user_existence()

urlpatterns = [
    path("admin/", admin.site.urls),
    path("", TemplateView.as_view(template_name="index.html"), name="index"),
    path("api/", include(router.urls)),
    path("api/search/title/<str:title>/", views.TitlesView.as_view()),
    path("api/search/pattern/<str:pattern>/<int:page>/", views.PatternView.as_view()),
    path("token", TokenObtainPairView.as_view(), name="token_obtain_pair"),
]
