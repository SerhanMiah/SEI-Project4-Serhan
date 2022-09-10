from rest_framework import serializers
from ..models import Attend


class AttendSerializer(serializers.ModelSerializer):
    class Meta:
        model = Attend
        fields = '__all__'