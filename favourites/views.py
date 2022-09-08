from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.exceptions import NotFound

from .serializers.common import FavouriteSerializers
from .models import FavouritePlay

class FavouriteView(APIView):
    pass
