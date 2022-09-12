from .common import UserSerializer, FavouriteUser


class PopulatedWithFavourites(UserSerializer):
    favourites = FavouriteUser(many=True)

    