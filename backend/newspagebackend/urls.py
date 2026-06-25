from django.urls import path
from .views import PageListView, HomePageImageListView

urlpatterns = [
    path('api/pages/', PageListView.as_view(), name='page-list'),
    path('api/homepage-images/', HomePageImageListView.as_view(), name='homepage-images'),
]