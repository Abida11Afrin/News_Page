from django.urls import path
from .views import PageListView

urlpatterns = [
    path('api/pages/', PageListView.as_view(), name='page-list'),
]