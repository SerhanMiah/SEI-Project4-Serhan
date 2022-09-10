from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.exceptions import NotFound
from .models import Theatre
from .serializers.common import TheatreSerializer
from .serializers.populated import PopulatedVenueSerializer, PopulatedVenueWithGenresSerializer
 
from django.shortcuts import get_object_or_404


from django.contrib.auth import get_user_model
User = get_user_model()

from .models import Theatre

from rest_framework.permissions import IsAuthenticatedOrReadOnly

# Create your views here.
class TheatreView(APIView):

    permission_classes = (IsAuthenticatedOrReadOnly, )

    def get(self, _request):
        venues = Theatre.objects.all()
        serialized_theatre = PopulatedVenueSerializer(venues, many=True)
        return Response(serialized_theatre.data, status=status.HTTP_200_OK)

    def post(self, request):
        print(request.data)
        theatre_to_add = TheatreSerializer(data=request.data)
        try:
            theatre_to_add.is_valid(True)
            theatre_to_add.save()
            return Response(theatre_to_add.data, status=status.HTTP_201_CREATED)
        except Exception as e:
            return Response(e.__dict__ if e.__dict__ else str(e), status=status.HTTP_422_UNPROCESSABLE_ENTITY)


class TheatreDetail(APIView):
    def get_play(self, pk):
        try:
            return Theatre.objects.get(pk=pk)
        except Theatre.DoesNotExist:
            raise NotFound(detail="Venue not found!")

    def get(self, _request, pk):
        play = self.get_play(pk=pk)
        serialized_book = PopulatedVenueSerializer(play)
        return Response(serialized_book.data)

    def delete(self, _request, pk):
        play_to_delete = self.get_play(pk=pk)
        play_to_delete.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)

    def put(self, request, pk):
        play_to_update = self.get_play(pk=pk)
        updated_theatre = TheatreSerializer(play_to_update, data=request.data)
        try:
            updated_theatre.is_valid(True)
            updated_theatre.save()
            return Response(updated_theatre.data, status=status.HTTP_202_ACCEPTED)
        except Exception as e:
            print(e)
            return Response(str(e), status=status.HTTP_422_UNPROCESSABLE_ENTITY)


class LikesView(APIView):

    def VenueLike(self, request, pk):
        print('hello, end point')
        post = get_object_or_404(Theatre, id=request.POST.get('Theatre_id'))
        if post.likes.filter(id=request.user.id).exists():
            post.likes.remove(request.user)
        else:
            post.likes.add(request.user)
        return Response(post.likes.data, status=status.HTTP_202_ACCEPTED)

class Dislike(APIView):

    def VenueDislike(self, request, pk):
        post = get_object_or_404(Theatre, id=request.POST.get('Theatre_id'))
        if post.dislikes.filter(id=request.user.id).exists():
            post.dislikes.remove(request.user)
        else:
            post.likes.add(request.user)
        return Response(post.likes.data, status=status.HTTP_202_ACCEPTED)

# ! check if this work in the front end 
# class FavouritesView(APIView):
#     # selecting the favourite
#     def favourites(self, request, theatre_id):

#         favourite_play = get_object_or_404(Theatre, pk=theatre_id)
#         if favourite_play.favourites.filter(id=request.user.id).exist():
#             favourite_play.favourites.remove(request.user)
#         else:
#             favourite_play.favourites.add(request.user) 
#         return Response(request, 'favourites/product_favourite_list.html')

#     # getting all the favourites not sure if this work need 
#     def product_favourite_list(self, request):
#         user=request.user
#         favourite_products = user.favourites.all()
#         context = {
#             'favourite_products': favourite_products
#         }
#         return Response(request, 'favourites/product_favourite_list.html', context)