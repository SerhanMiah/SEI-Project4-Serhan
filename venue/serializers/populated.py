from .common import TheatreSerializer
from review.serializers.populated import PopulatedReviewSerializer
from categories.serializers.common import GenreSerializer


class PopulatedVenueSerializer(TheatreSerializer):
    review = PopulatedReviewSerializer(many=True)
    genres = GenreSerializer(many=True)

class PopulatedVenueWithGenresSerializer(TheatreSerializer):
    genres = GenreSerializer(many=True)
    