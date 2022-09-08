from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.exceptions import NotFound
from .models import Theatre
from .serializers.common import TheatreSerializer
from .serializers.populated import ShowVenueSerializer, ShowVenuewithCategorySerializer


# Create your views here.
class TheatreView(APIView):

    def get(self, _request):
        theatres = Theatre.objects.all()
        serialized_theatre = TheatreSerializer(theatres, many=True)
        return Response(serialized_theatre.data, status=status.HTTP_200_OK)

    def post(self, request):
        print(request.data)
        theatre_to_add = ShowVenuewithCategorySerializer(data=request.data)
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
        serialized_book = ShowVenueSerializer(play)
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

# def wishlist(self, request):
#     user_id = request.POST.get('user_id')
#     if not user_id:
#         raise ValueError("Required music_id to set wishlist")
#     ## can be set user id once authentication is set
#     ##some_id = request.user.pk
#     some_id = 3 ## Say
#     try:
#         music = Music.objects.get(pk=music_id)
#         wishlist_obj = {
#             'some_id': some_id,
#             'music': music
#         }
#         WishlistMusic(**wishlist_obj).save()
#     except ObjectDoesNotExist:
#         ## Your action
#         ## raise or Return HTTP response with failure status_code
#         return Response('Some error occured, unable to add to wishlist') ## or can set for render
        
#     return Response('Added to wishlist') ## or can set for render
