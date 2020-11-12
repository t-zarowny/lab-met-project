from django.db import models
from django.contrib.auth.models import User

class JednostkiBadane(models.Model):
  nazwa = models.CharField(max_length=32)
  skrot = models.CharField(max_length=32)

class JednostkiInterwal(models.Model):
  nazwa = models.CharField(max_length=32)
  skrot = models.CharField(max_length=32)

class GroupInstruments(models.Model):
    nazwa = models.CharField(max_length=32)
    nrGrupy = models.IntegerField(default=0)
    metodaKontroli = models.CharField(max_length=50)
    interwalWartosc = models.IntegerField(default=1)
    interwalJednostka = models.ForeignKey(JednostkiInterwal, related_name='grupa', on_delete=models.PROTECT, null=True)
    wielkoscBadana = models.ForeignKey(JednostkiBadane, related_name='grupa', on_delete=models.PROTECT, null=True)

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
    typ = models.CharField(max_length=32, null=True)
    nrFabryczny = models.CharField(max_length=50, null=True)
    zakres = models.CharField(max_length=50, null=True)
    idGrupa = models.ForeignKey(GroupInstruments, related_name='przyrzad', on_delete=models.PROTECT, null=True)
    idLokalizacja = models.ForeignKey(Lokalizacje, related_name='przyrzady', on_delete=models.PROTECT, null=True)
    aktStatus = models.ForeignKey(Statusy, default=3, related_name='status', on_delete=models.PROTECT, null=False)
    wzorzec = models.BooleanField(default=False)

class SprawdzeniaPlanowe(models.Model):
    idPrzyrzad = models.ForeignKey(Przyrzady, related_name='sprawdzeniaPlanowe', on_delete=models.CASCADE, null=False)
    dataPlanowa = models.DateField(null=False, blank=False)

class SwiadectwoSprawdzenia(models.Model):
  nrSwiadectwa = models.CharField(max_length=32, null=False)
  przedmiot = models.CharField(max_length=1000, null=False)
  przedmiotId = models.ForeignKey(Przyrzady, related_name='swiadectwa', on_delete=models.CASCADE, null=False)
  metoda = models.CharField(max_length=100, null=True)
  uzyteWzorce = models.CharField(max_length=255, null=True)
  warunkiSrodowiskowe = models.CharField(max_length=255, null=True)
  dataSprawdzenia = models.DateField(null=False)
  dataNastepnejKontroli = models.DateField(null=False)
  wynikSprawdzenia = models.BooleanField(default=False)
  sprawdzenieZewnetrzne = models.BooleanField(default=False)
  uwagi = models.CharField(max_length=1000, null=True)
  sprawdzajacy = models.CharField(max_length=255, null=False)

class SwiadectwoSprawdzeniaSzablon(models.Model):
  grupaId = models.ForeignKey(GroupInstruments, related_name='wzor', on_delete=models.CASCADE, null=False)
  uzyteWzorce = models.CharField(max_length=255, null=True)
  warunkiSrodowiskowe = models.CharField(max_length=255, null=True)


class SwiadectwoSprawdzeniaPlik(models.Model):
    link = models.FileField(upload_to='swiadectwa-sprawdzenia/', null=False)
    nazwa = models.CharField(max_length=50, null=True)
    idSwiadectwoSprawdzenia = models.ForeignKey(SwiadectwoSprawdzenia, related_name='plik', on_delete=models.CASCADE, null=True)
