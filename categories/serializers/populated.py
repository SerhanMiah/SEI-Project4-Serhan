from .common import GenreSerializer
from venue.serializers.common import TheatreSerializer

class PopulatedGenreSerializer(GenreSerializer):
    plays = TheatreSerializer(many=True)
