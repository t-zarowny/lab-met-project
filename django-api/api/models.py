from django.db import models


class GroupInstruments(models.Model):
    nazwa = models.CharField(max_length=32)
    metodaKontroli = models.CharField(max_length=50)


class GrupaKartaPomiarow(models.Model):
    link = models.FileField(upload_to='kartyPomiarow/', null=False)
    nazwa = models.CharField(max_length=50, null=True)
    idGrupa = models.ForeignKey(GroupInstruments, related_name='karta', on_delete=models.CASCADE, null=True)
