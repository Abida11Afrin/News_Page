from django.shortcuts import render

# Create your views here.
from rest_framework.views import APIView
from rest_framework.response import Response
from .models import Page
from .serializers import PageSerializer

class PageListView(APIView):
    def get(self, request):
        pages = Page.objects.filter(is_active=True)
        serializer = PageSerializer(pages, many=True, context={'request': request})
        return Response(serializer.data)