from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status

from .serializers.populated import PopulatedGenreSerializer
from .models import Category

# Create your views here.
class GenreListView(APIView):
    
    def get(self, _request):
        category_genres = Category.objects.all()
        serialized_genres = PopulatedGenreSerializer(category_genres, many=True)
        return Response(serialized_genres.data)


        