# Generated by Django 3.0.8 on 2020-07-18 18:35

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='GroupInstruments',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('nazwa', models.CharField(max_length=32)),
                ('metodaKontroli', models.CharField(max_length=50)),
            ],
        ),
    ]
