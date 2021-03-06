# Generated by Django 3.1.2 on 2020-11-01 13:48

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0021_auto_20201101_1346'),
    ]

    operations = [
        migrations.AddField(
            model_name='groupinstruments',
            name='interwalJednostka',
            field=models.ForeignKey(null=True, on_delete=django.db.models.deletion.PROTECT, related_name='grupa', to='api.jednostkiinterwal'),
        ),
        migrations.AddField(
            model_name='groupinstruments',
            name='interwalWartosc',
            field=models.IntegerField(default=1),
        ),
        migrations.AddField(
            model_name='groupinstruments',
            name='wielkoscBadana',
            field=models.ForeignKey(null=True, on_delete=django.db.models.deletion.PROTECT, related_name='grupa', to='api.jednostkibadane'),
        ),
    ]
