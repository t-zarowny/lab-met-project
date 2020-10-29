# Generated by Django 3.0.8 on 2020-08-07 09:15

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0003_auto_20200721_1505'),
    ]

    operations = [
        migrations.CreateModel(
            name='GrupaKartaPomiarow',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('kartaPomiarow', models.FileField(upload_to='kartyPomiarow/')),
            ],
        ),
        migrations.AddField(
            model_name='groupinstruments',
            name='karta',
            field=models.OneToOneField(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, to='api.GrupaKartaPomiarow'),
        ),
    ]