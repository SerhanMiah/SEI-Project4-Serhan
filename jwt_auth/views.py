from functools import partial
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from django.contrib.auth import get_user_model
from rest_framework.exceptions import PermissionDenied
User = get_user_model()
from .serializers.common import UserSerializer
from rest_framework.permissions import IsAuthenticated

import jwt
from datetime import datetime, timedelta
from django.conf import settings 



# Create your views here.
class RegisterView(APIView):
    def post(self, request):
        user_to_create = UserSerializer(data=request.data)
        try:
            user_to_create.is_valid(True) 
            user_to_create.save() 
            return Response(user_to_create.data, status=status.HTTP_202_ACCEPTED)
        except Exception as e:
            print(e)
            return Response(e.__dict__ if e.__dict__ else str(e), status=status.HTTP_422_UNPROCESSABLE_ENTITY)

class LoginView(APIView):
    
    def post(self, request):
        email = request.data.get('email')
        password = request.data.get('password')

        try:
            user_to_login = User.objects.get(email=email)
        except User.DoesNotExist:
            raise PermissionDenied("Invalid credentials")

        if not user_to_login.check_password(password):
            raise PermissionDenied("Invalid credentials")

        dt = datetime.now() + timedelta(days=7) 
        token = jwt.encode(
            {
                "sub": user_to_login.id,
                "exp": int(dt.strftime('%s'))
            },
            settings.SECRET_KEY,
            "HS256"
        )

        return Response({ "token": token, "message": f"Welcome back {user_to_login.username}" })


class ProfileView(APIView):
    permission_classes = (IsAuthenticated, )
    def get_user(self, pk):
        try:
            return User.objects.get(pk=pk)
        except User.DoesNotExist:
            raise PermissionDenied(detail="Invalid Credentials")

    

    def get(self, request):
        user = self.get_user(request.user.id)
        serialized_user = UserSerializer(user)
        print('userrrr', serialized_user)
        return Response(serialized_user.data, status=status.HTTP_200_OK)

    
    # updating the user prfole view? 
    # def put(self, request, pk ):
    #     print('does this hit?')
    #     profile = self.get_user(pk=pk)

    #     # somewhat stuck her
    #     profile_to_update = self.get_user(pk=pk)
    #     # request.data['owner'] = request.user.id
    #     profile_to_update = UserSerializer(pk = request.data) 
    #     try:
    #         profile_to_update.is_valid(True) 
    #         profile_to_update.save() 
    #         return Response(profile_to_update.data, status=status.HTTP_201_CREATED)
    #     except Exception as e:
    #         print(e)
    #         return Response(e.__dict__ if e.__dict__ else str(e), status=status.HTTP_422_UNPROCESSABLE_ENTITY)


    # def put(self, request, pk):
    #     profile_to_update = self.get_user(pk=pk)  # get our product
    #     # print('Request data', request.data)
    #     request.data['owner'] = request.user.id

    #     updated_profile = UserSerializer(profile_to_update, data=request.data)
    #     try:
    #         updated_profile.is_valid(True)
    #         updated_profile.save()  # saves it if it's valid
    #         # print('Updated data', updated_event.data)
    #         return Response(updated_profile.data, status=status.HTTP_202_ACCEPTED)
    #     except Exception as e:
    #         print(e)
    #         return Response(e.__dict__ if e.__dict__ else str(e), status=status.HTTP_422_UNPROCESSABLE_ENTITY)

    # def post(self, request, pk):
    #     print('end point hitting?')
    #     profile_patch = self.get_user(pk=pk)
    #     request.data['owner'] = request.user.id

    #     serialize_profile = UserSerializer(profile_patch, pk=request.data)
    #     try:
    #         serialize_profile.is_valid(True)
    #         serialize_profile.save()
    #         return Response(serialize_profile.data, status=status.HTTP_201_CREATED)
    #     except Exception as e:
    #         return Response(e.__dict__ if e.__dict__ else str(e), status=status.HTTP_422_UNPROCESSABLE_ENTITY)

class EditProfile(APIView):
    permission_classes = (IsAuthenticated, )
    def get_user(self, pk):
        try:
            return User.objects.get(pk=pk)
        except User.DoesNotExist:
            raise PermissionDenied(detail="Invalid Credentials")

#     def put(self, request, pk, format=None):
#         print('end point reached?')
#         profile_update = self.get_user(pk)
#         request.data['owner'] = request.user.id

#         serializer = UserSerializer(profile_update , data=request.data)
#         if serializer.is_valid():
#             serializer.save()
#             return Response(serializer.data)
#         return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    def put(self, request, pk, format=None):
        edit_profile = self.get_user(pk)
        serializer = UserSerializer(edit_profile, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)