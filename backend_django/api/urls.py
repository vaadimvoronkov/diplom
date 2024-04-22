from django.urls import path
from api.views import *

urlpatterns = [
    path('roomitem/create/', RoomItemCreateView.as_view()),
    path('all/', RoomItemsView.as_view()),
    path('roomitem/detail/<int:pk>/', RoomItemsDetailView.as_view()),
    path('roomitem/update/<int:pk>/', RoomItemUpdateView.as_view()),  # Добавленный путь для обновления RoomItem
    path('room/create/', RoomCreateView.as_view()),
    path('rooms/all/', RoomsView.as_view()),
    path('room/detail/<int:pk>/', RoomDetailView.as_view()),
    path('room/update/<int:pk>/', RoomUpdateView.as_view()),  # Добавленный путь для обновления Room
    path('building/create/', BuildingCreateView.as_view()),
    path('buildings/all/', BuildingsView.as_view()),
    path('building/detail/<int:pk>/', BuildingDetailView.as_view()),
    path('building/update/<int:pk>/', BuildingUpdateView.as_view()),  # Добавленный путь для обновления Building
    path('faculty/create/', FacultyCreateView.as_view()),
    path('faculties/all/', FacultiesView.as_view()),
    path('faculty/detail/<int:pk>/', FacultyDetailView.as_view()),
    path('faculty/update/<int:pk>/', FacultyUpdateView.as_view()),  # Добавленный путь для обновления Faculty
    path('roomitem/delete/<int:pk>/', RoomItemDeleteView.as_view()),
]
