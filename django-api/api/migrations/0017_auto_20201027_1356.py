# Generated by Django 3.1.2 on 2020-10-27 13:56

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0016_auto_20201027_1342'),
    ]

    operations = [
        migrations.AlterField(
            model_name='przyrzady',
            name='aktStatus',
            field=models.ForeignKey(on_delete=django.db.models.deletion.PROTECT, related_name='status', to='api.statusy'),
        ),
    ]
