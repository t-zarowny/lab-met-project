# Generated by Django 3.1.2 on 2020-11-24 18:37

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0027_auto_20201124_1744'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='przyrzady',
            name='daty',
        ),
        migrations.DeleteModel(
            name='DatyPrzyrzadu',
        ),
    ]