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
            print('error', e)
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

class FavouriteList(APIView):
    permission_classes = (IsAuthenticatedOrReadOnly, )

    def get(self, request):

        favourites = Theatre.objects.all()
        print('end point hit?')
        serialized_favourites = TheatreSerializer(favourites, many=True)
        return Response(serialized_favourites.data, status=status.HTTP_200_OK)

    def post(self, request):
        request.data['owner'] = request.user.id
        favourite_to_add = TheatreSerializer(data=request.data) 
        try:
            favourite_to_add.is_valid(True) 
            favourite_to_add.save() 
            return Response(favourite_to_add.data, status=status.HTTP_201_CREATED)
        except Exception as e:
            print(e)
            return Response(e.__dict__ if e.__dict__ else str(e), status=status.HTTP_422_UNPROCESSABLE_ENTITY)

class FavouriteDetailList(APIView):
    def get_favourite(self, pk):
        try:
            return Theatre.objects.all()
        except Theatre.DoesNotExist:
            raise NotFound(detail="Venue not found!")

    def get(self, _request, pk):
        play = self.get_favourite(pk=pk)
        serialized_book = TheatreSerializer(play)
        return Response(serialized_book.data)

    def delete(self, _request, pk):
        delete_favourite = self.get_favourite(pk=pk)
        delete_favourite.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)

    def post(self, request, pk):
        favourite_to_update = self.get_favourite(pk=pk)
        updated_favourite = TheatreSerializer(favourite_to_update, data=request.data)
        try:
            updated_favourite.is_valid(True)
            updated_favourite.save()
            return Response(updated_favourite.data, status=status.HTTP_202_ACCEPTED)
        except Exception as e:
            print(e)
            return Response(str(e), status=status.HTTP_422_UNPROCESSABLE_ENTITY)