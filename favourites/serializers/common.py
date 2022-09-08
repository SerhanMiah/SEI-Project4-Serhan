from rest_framework import serializers
from ..models import FavouritePlay

class FavouriteSerializers(serializers.ModelSerializer):
    class Meta:
        model = FavouritePlay
        fields = "__all__"