# Generated by Django 3.0.8 on 2020-08-07 11:38

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0007_auto_20200807_1122'),
    ]

    operations = [
        migrations.AddField(
            model_name='grupakartapomiarow',
            name='nazwa',
            field=models.CharField(max_length=50, null=True),
        ),
    ]