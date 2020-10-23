from django.db import models
from django.contrib.auth.models import User


class GroupInstruments(models.Model):
    nazwa = models.CharField(max_length=32)
    metodaKontroli = models.CharField(max_length=50)
    interwalWartosc = models.IntegerField(default=1)
    interwalJednostka = models.CharField(max_length=32, default="d")
    jednostkaNazwa = models.CharField(max_length=32, default="milimetr")
    jednostkaSkrot = models.CharField(max_length=32, default="mm")


class GrupaKartaPomiarow(models.Model):
    link = models.FileField(upload_to='kartyPomiarow/', null=False)
    nazwa = models.CharField(max_length=50, null=True)
    idGrupa = models.ForeignKey(GroupInstruments, related_name='karta', on_delete=models.CASCADE, null=True)

class Obszary(models.Model):
    nazwa = models.CharField(max_length=32)
    idUser = models.ForeignKey(User, related_name='obszar', on_delete=models.CASCADE, null=True)

class Lokalizacje(models.Model):
    nazwa = models.CharField(max_length=32)
    idObszar = models.ForeignKey(Obszary, related_name='lokalizacja', on_delete=models.CASCADE, null=True)

class Przyrzady(models.Model):
    nazwa = models.CharField(max_length=32)
    typ = models.CharField(max_length=32)
    idGrupa = models.ForeignKey(GroupInstruments, related_name='przyrzad', on_delete=models.PROTECT, null=True)
    idLokalizacja = models.ForeignKey(Lokalizacje, related_name='przyrzad', on_delete=models.PROTECT, null=True)
    aktStatus = models.IntegerField(default=0)
    wzorzec = models.BooleanField(default=False)

class SprawdzeniaPlanowe(models.Model):
    idPrzyrzad = models.ForeignKey(Przyrzady, related_name='sprawdzenia_planowe', on_delete=models.CASCADE, null=False)
    dataPlanowa = models.DateField(null=False, blank=False)
