# Generated by Django 3.1.7 on 2021-04-16 05:09

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0007_auto_20210416_0021'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='team',
            name='score',
        ),
    ]
