# Generated by Django 3.1.2 on 2020-11-24 18:48

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0029_auto_20201124_1843'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='swiadectwosprawdzenia',
            name='nrAktualnegoSwiadectwa',
        ),
    ]
