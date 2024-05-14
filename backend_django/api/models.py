from django.db import models

class Building(models.Model):
    name = models.CharField(max_length=100)
    address = models.CharField(max_length=200)

    def str(self):
        return self.name

class Faculty(models.Model):
    name = models.CharField(max_length=100)
    building = models.ForeignKey(Building, on_delete=models.CASCADE)

    def str(self):
        return self.name

class Room(models.Model):
    number = models.CharField(max_length=50)
    faculty = models.ForeignKey(Faculty, on_delete=models.CASCADE)

    def str(self):
        return self.number

class RoomItem(models.Model):
    name = models.CharField(max_length=100)
    price = models.IntegerField(default=0)
    inventory_number = models.CharField(max_length=50,default='')
    description = models.TextField()
    date = models.DateField()
    x = models.IntegerField()
    y = models.IntegerField()
    width = models.IntegerField(default=0)
    height = models.IntegerField(default=0)
    color = models.CharField(max_length=50, default='')
    room = models.ForeignKey(Room, on_delete=models.CASCADE, null=True)

    def str(self):
        return self.name
    