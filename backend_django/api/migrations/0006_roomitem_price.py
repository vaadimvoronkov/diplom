# Generated by Django 5.0.6 on 2024-05-14 12:02

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0005_roomitem_color_roomitem_height_roomitem_width'),
    ]

    operations = [
        migrations.AddField(
            model_name='roomitem',
            name='price',
            field=models.IntegerField(default=0),
        ),
    ]
