from .common import TheatreSerializer
from review.serializers.common import ReviewSerializer
from categories.serializers.common import GenreSerializer

class ShowVenueSerializer(TheatreSerializer):
    reviews = ReviewSerializer(many=True)
    genres = GenreSerializer(many=True)

class ShowVenuewithCategorySerializer(TheatreSerializer):
    genres = GenreSerializer