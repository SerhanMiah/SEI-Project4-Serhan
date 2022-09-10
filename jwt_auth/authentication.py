from rest_framework.authentication import BasicAuthentication 
from rest_framework.exceptions import PermissionDenied # canned response
from django.contrib.auth import get_user_model
from django.conf import settings # for our SECRET_KEY
import jwt

User = get_user_model()

class JWTAuthentication(BasicAuthentication):
    def authenticate(self, request):
        header = request.headers.get('Authorization')
        if not header:
            return None
        if not header.startswith('Bearer'):
            raise PermissionDenied("Invalid Token")
        token = header.replace('Bearer ', '')
        try:
            payload = jwt.decode(token, settings.SECRET_KEY, ["HS256"])
            user = User.objects.get(pk=payload.get('sub'))
        except jwt.exceptions.InvalidTokenError:          
            raise PermissionDenied("Invalid Token")
        except User.DoesNotExist:
            raise PermissionDenied("User not found")

        return (user, token)
