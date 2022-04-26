from django.urls import include, path
from .api import *

from . import views

urlpatterns = [
    path('', views.index, name='index'),
    path('auth/', include('knox.urls')),
    path('register/', RegistrationAPI.as_view()),
    path('login/', LoginAPI.as_view()),
    path('assets/', AssetAPI.as_view()),
]