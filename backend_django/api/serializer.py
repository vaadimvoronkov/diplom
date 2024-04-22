from rest_framework import serializers
from .models import *

class RoomItemListSerializer(serializers.ModelSerializer):
    class Meta:
       model = RoomItem
       fields = '__all__'

class RoomItemDetailSerializer(serializers.ModelSerializer):
    class Meta:
       model = RoomItem
       fields = '__all__'

class RoomSerializer(serializers.ModelSerializer):
    class Meta:
        model = Room
        fields = '__all__'
        
class RoomListSerializer(serializers.ModelSerializer):
    class Meta:
       model = Room
       fields = '__all__'
       
class RoomDetailSerializer(serializers.ModelSerializer):
    class Meta:
       model = Room
       fields = '__all__'

class BuildingSerializer(serializers.ModelSerializer):
    class Meta:
        model = Building
        fields = '__all__'

class FacultySerializer(serializers.ModelSerializer):
    class Meta:
        model = Faculty
        fields = '__all__'