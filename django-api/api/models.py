from django.db import models
from django.contrib.auth.models import User

class Jednostki(models.Model):
  nazwa = models.CharField(max_length=32)
  skrot = models.CharField(max_length=32)

class GroupInstruments(models.Model):
    nazwa = models.CharField(max_length=32)
    nrGrupy = models.IntegerField(default=0)
    metodaKontroli = models.CharField(max_length=50)
    interwalWartosc = models.IntegerField(default=1)
    interwalJednostka = models.CharField(max_length=32, default="d")
    wielkoscBadana = models.ForeignKey(Jednostki, default=0, related_name='wielkoscBadana', on_delete=models.PROTECT, null=False)

class GrupaKartaPomiarow(models.Model):
    link = models.FileField(upload_to='kartyPomiarow/', null=False)
    nazwa = models.CharField(max_length=50, null=True)
    idGrupa = models.ForeignKey(GroupInstruments, related_name='karta', on_delete=models.CASCADE, null=True)

class Obszary(models.Model):
    nazwa = models.CharField(max_length=32)
    idUser = models.ForeignKey(User, related_name='obszar', on_delete=models.CASCADE, null=True)

class Lokalizacje(models.Model):
    nazwa = models.CharField(max_length=32)
    idObszar = models.ForeignKey(Obszary, related_name='lokalizacja', on_delete=models.PROTECT, null=True)

class Statusy(models.Model):
  nazwa = models.CharField(max_length=32)


class Przyrzady(models.Model):
    nazwa = models.CharField(max_length=32)
    typ = models.CharField(max_length=32)
    idGrupa = models.ForeignKey(GroupInstruments, related_name='przyrzad', on_delete=models.PROTECT, null=True)
    idLokalizacja = models.ForeignKey(Lokalizacje, related_name='przyrzad', on_delete=models.PROTECT, null=True)
    aktStatus = models.ForeignKey(Statusy, default=3, related_name='status', on_delete=models.PROTECT, null=False)
    # aktStatus = models.IntegerField(default=0)
    wzorzec = models.BooleanField(default=False)

class SprawdzeniaPlanowe(models.Model):
    idPrzyrzad = models.ForeignKey(Przyrzady, related_name='sprawdzeniaPlanowe', on_delete=models.CASCADE, null=False)
    dataPlanowa = models.DateField(null=False, blank=False)

