# Generated by Django 5.0.6 on 2024-05-14 12:20

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0006_roomitem_price'),
    ]

    operations = [
        migrations.AddField(
            model_name='roomitem',
            name='inventory_number',
            field=models.CharField(default='', max_length=50),
        ),
    ]
