# Generated by Django 3.1.2 on 2020-10-31 12:26

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0019_auto_20201027_1411'),
    ]

    operations = [
        migrations.AddField(
            model_name='groupinstruments',
            name='nrGrupy',
            field=models.IntegerField(default=0),
        ),
        migrations.AlterField(
            model_name='przyrzady',
            name='aktStatus',
            field=models.ForeignKey(default=3, on_delete=django.db.models.deletion.PROTECT, related_name='status', to='api.statusy'),
        ),
    ]