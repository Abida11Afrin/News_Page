from rest_framework.views import APIView
from rest_framework.response import Response
from .models import Page, HomePageImage
from .serializers import PageSerializer, HomePageImageSerializer

class PageListView(APIView):
    def get(self, request):
        pages = Page.objects.filter(is_active=True)
        serializer = PageSerializer(pages, many=True, context={'request': request})
        return Response(serializer.data)

class HomePageImageListView(APIView):
    def get(self, request):
        images = HomePageImage.objects.filter(is_active=True)
        serializer = HomePageImageSerializer(images, many=True, context={'request': request})
        return Response(serializer.data)