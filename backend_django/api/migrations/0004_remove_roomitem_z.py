# Generated by Django 5.0.4 on 2024-04-22 09:43

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0003_building_remove_roomitem_building_and_more'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='roomitem',
            name='z',
        ),
    ]
