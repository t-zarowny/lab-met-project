# Generated by Django 3.1.2 on 2020-10-21 11:11

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0014_auto_20201021_1021'),
    ]

    operations = [
        migrations.RenameField(
            model_name='przyrzady',
            old_name='status',
            new_name='aktStatus',
        ),
    ]
