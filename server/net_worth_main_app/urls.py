from django.urls import include, path
from .api import *
from knox import views as knox_views

from . import views

urlpatterns = [
    path('', views.index, name='index'),
    path('logout/', knox_views.LogoutView.as_view(), name='knox_logout'),
    path('register/', RegistrationAPI.as_view()),
    path('login/', LoginAPI.as_view()),
    path('assets/', AssetListAPI.as_view()),
    path('asset/<int:id>/', AssetDetailAPI.as_view()),
]