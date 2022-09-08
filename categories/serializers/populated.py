from .common import GenreSerializer
from venue.serializers.common import TheatreSerializer

class ShowCategoriesSerializer(GenreSerializer):
    books = TheatreSerializer(many=True)
