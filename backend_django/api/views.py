from django.shortcuts import render
from rest_framework import generics
from .models import *
from .serializer import *

class RoomItemCreateView(generics.CreateAPIView):
	serializer_class = RoomItemDetailSerializer
	
class RoomItemsView(generics.ListAPIView):
	serializer_class = RoomItemListSerializer
	queryset = RoomItem.objects.all()
	
class RoomItemsDetailView(generics.RetrieveUpdateDestroyAPIView):
	serializer_class = RoomItemDetailSerializer
	queryset = RoomItem.objects.all()

class RoomCreateView(generics.CreateAPIView):
    serializer_class = RoomSerializer
    
class RoomsView(generics.ListAPIView):
	serializer_class = RoomListSerializer
	queryset = Room.objects.all()
 
class RoomDetailView(generics.RetrieveUpdateDestroyAPIView):
	serializer_class = RoomListSerializer
	queryset = Room.objects.all()
    
class BuildingCreateView(generics.CreateAPIView):
    serializer_class = BuildingSerializer

class BuildingsView(generics.ListAPIView):
    serializer_class = BuildingSerializer
    queryset = Building.objects.all()

class BuildingDetailView(generics.RetrieveUpdateDestroyAPIView):
    serializer_class = BuildingSerializer
    queryset = Building.objects.all()

class FacultyCreateView(generics.CreateAPIView):
    serializer_class = FacultySerializer

class FacultiesView(generics.ListAPIView):
    serializer_class = FacultySerializer
    queryset = Faculty.objects.all()

class FacultyDetailView(generics.RetrieveUpdateDestroyAPIView):
    serializer_class = FacultySerializer
    queryset = Faculty.objects.all()
    
class RoomItemDeleteView(generics.DestroyAPIView):
    serializer_class = RoomItemDetailSerializer
    queryset = RoomItem.objects.all()

class RoomItemUpdateView(generics.UpdateAPIView):
    serializer_class = RoomItemDetailSerializer
    queryset = RoomItem.objects.all()

class RoomUpdateView(generics.UpdateAPIView):
    serializer_class = RoomSerializer
    queryset = Room.objects.all()

class BuildingUpdateView(generics.UpdateAPIView):
    serializer_class = BuildingSerializer
    queryset = Building.objects.all()

class FacultyUpdateView(generics.UpdateAPIView):
    serializer_class = FacultySerializer
    queryset = Faculty.objects.all()
