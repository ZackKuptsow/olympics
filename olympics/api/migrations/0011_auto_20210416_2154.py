# Generated by Django 3.1.7 on 2021-04-16 21:54

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0010_auto_20210416_2153'),
    ]

    operations = [
        migrations.AlterField(
            model_name='event',
            name='event_name',
            field=models.CharField(default='', max_length=24),
        ),
    ]
