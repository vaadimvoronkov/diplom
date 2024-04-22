from django.contrib import admin
from .models import *
# Register your models here.
class diplomAdmin(admin.ModelAdmin):
	list_display = ['name','description','date']

admin.site.register(RoomItem,diplomAdmin)