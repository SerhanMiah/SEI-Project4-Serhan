from urllib import request
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.exceptions import NotFound, PermissionDenied
from rest_framework.permissions import IsAuthenticatedOrReadOnly

from .serializers.common import ReviewSerializer
from .models import Review


# Create your views here.

class ReviewListView(APIView):
    permission_classes = (IsAuthenticatedOrReadOnly, )

    def get(self, request):

        reviews = Review.objects.all()
        print('end point hit?')
        serialized_review = ReviewSerializer(reviews, many=True)
        return Response(serialized_review.data, status=status.HTTP_200_OK)

    def post(self, request):
        request.data['owner'] = request.user.id
        review_to_create = ReviewSerializer(data=request.data) 
        try:
            review_to_create.is_valid(True) 
            review_to_create.save() 
            return Response(review_to_create.data, status=status.HTTP_201_CREATED)
        except Exception as e:
            print(e)
            return Response(e.__dict__ if e.__dict__ else str(e), status=status.HTTP_422_UNPROCESSABLE_ENTITY)

# Single review view
class ReviewDetailView(APIView):
    permission_classes = (IsAuthenticatedOrReadOnly, )

    def get_review(self, pk):
        try:
            return Review.objects.get(pk=pk)
        except Review.DoesNotExist:
            raise NotFound("Review not found!")

    # def put(self, request, pk):
    #     review_update = self.get_review(pk=pk)

    #     review_update = ReviewSerializer(data=request.data)
    #     try:
    #         # review_update.owner != request.user:
    #         # raise PermissionDenied("Unauthorised")
    #         review_update.is_valid(True)
    #         review_update.save()

    #         return Response(status=status.HTTP_204_NO_CONTENT)
    #     except Exception as e:
    #         print(e)
    #         return Response(e.__dict__ if e.__dict__ else str(e), status=status.HTTP_422_UNPROCESSABLE_ENTITY)

    def put(self, request, pk, format=None):
        edit_review = self.get_review(pk)
        edit_serializer = ReviewSerializer(edit_review, data=request.data)
        if edit_serializer.is_valid():
            edit_serializer.save()
            return Response(edit_serializer.data)
        return Response(edit_serializer.errors, status=status.HTTP_400_BAD_REQUEST)


    def delete(self, request, pk):
        review_to_delete = self.get_review(pk=pk)

        if review_to_delete.owner != request.user:
            raise PermissionDenied("Unauthorised")

        review_to_delete.delete()

        return Response(status=status.HTTP_204_NO_CONTENT)




    

    # update comment




