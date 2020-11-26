from django.contrib.auth.hashers import make_password
from django.contrib.auth.models import User
from rest_framework import serializers
# from api.models import GroupInstruments, GrupaKartaPomiarow, Obszary, Lokalizacje, Przyrzady
from api import models

class SwiadectwoSprawdzeniaPlikSerializer(serializers.ModelSerializer):
  class Meta:
    model = models.SwiadectwoSprawdzeniaPlik
    fields = ['id', 'nazwa', 'link', 'idSwiadectwoSprawdzenia']

class SwiadectwoSprawdzeniaSzablonSerializer(serializers.ModelSerializer):
  class Meta:
    model = models.SwiadectwoSprawdzeniaSzablon
    fields = ['id','grupaId','uzyteWzorce','warunkiSrodowiskowe']

class SwiadectwoSprawdzeniaSerializer(serializers.ModelSerializer):
  plik = SwiadectwoSprawdzeniaPlikSerializer(many=True, read_only=True)
  class Meta:
    model = models.SwiadectwoSprawdzenia
    fields = ['id','nrSwiadectwa','przedmiot','przedmiotId','metoda','uzyteWzorce','warunkiSrodowiskowe','dataSprawdzenia','dataNastepnejKontroli','wynikSprawdzenia','uwagi','sprawdzajacy','sprawdzenieZewnetrzne','plik']

class SwiadectwoSprawdzeniaMinSerializer(serializers.ModelSerializer):
  class Meta:
    model = models.SwiadectwoSprawdzenia
    fields = ['nrSwiadectwa']

class StatusSerializer(serializers.ModelSerializer):
  class Meta:
    model = models.Statusy
    fields = ['id','nazwa']

class SprawdzeniaPlanoweSerializer(serializers.ModelSerializer):
  class Meta:
    model = models.SprawdzeniaPlanowe
    fields = ['idPrzyrzad', 'dataPlanowa']

class SprawdzeniaPlanoweMiniSerializer(serializers.ModelSerializer):
  class Meta:
    model = models.SprawdzeniaPlanowe
    fields = ['dataPlanowa']

class PrzyrzadySerializer(serializers.ModelSerializer):
  sprawdzeniaPlanowe = SprawdzeniaPlanoweMiniSerializer(many=True, read_only=True)
  class Meta:
    model = models.Przyrzady
    fields = ['id', 'nr', 'nazwa', 'typ', 'nrFabryczny', 'zakres',  'idGrupa', 'idLokalizacja', 'aktStatus', 'wzorzec', 'sprawdzeniaPlanowe', 'dataOstatniejKontroli', 'dataNastepnejKontroli', 'nrAktualnegoSwiadectwa']

class PrzyrzadySerializerD1(serializers.ModelSerializer):
  sprawdzeniaPlanowe = SprawdzeniaPlanoweMiniSerializer(many=True, read_only=True)
  class Meta:
    model = models.Przyrzady
    fields = ['id', 'nr', 'nazwa', 'typ', 'nrFabryczny', 'zakres',  'idGrupa', 'idLokalizacja', 'aktStatus', 'wzorzec', 'sprawdzeniaPlanowe', 'dataOstatniejKontroli', 'dataNastepnejKontroli', 'nrAktualnegoSwiadectwa']
    depth = 1

class PrzyrzadySerializerD2(serializers.ModelSerializer):
  sprawdzeniaPlanowe = SprawdzeniaPlanoweMiniSerializer(many=True, read_only=True)
  class Meta:
    model = models.Przyrzady
    fields = ['id', 'nr', 'nazwa', 'typ', 'nrFabryczny', 'zakres',  'idGrupa', 'idLokalizacja', 'aktStatus', 'wzorzec', 'sprawdzeniaPlanowe', 'dataOstatniejKontroli', 'dataNastepnejKontroli', 'nrAktualnegoSwiadectwa']
    depth = 2

class PrzyrzadySerializerD3(serializers.ModelSerializer):
  sprawdzeniaPlanowe = SprawdzeniaPlanoweMiniSerializer(many=True, read_only=True)
  class Meta:
    model = models.Przyrzady
    fields = ['id', 'nr', 'nazwa', 'typ', 'nrFabryczny', 'zakres', 'idGrupa', 'idLokalizacja', 'aktStatus', 'wzorzec', 'sprawdzeniaPlanowe', 'dataOstatniejKontroli', 'dataNastepnejKontroli', 'nrAktualnegoSwiadectwa']
    depth = 3



class LokalizacjeSerializer(serializers.ModelSerializer):
  przyrzad = PrzyrzadySerializer(many=True, read_only=True)
  class Meta:
    model = models.Lokalizacje
    fields = ['id', 'nazwa', 'idObszar', 'przyrzad']

class LokalizacjeMiniSerializer(serializers.ModelSerializer):
  class Meta:
    model = models.Lokalizacje
    fields = ['id', 'nazwa']

class ObszaryMiniSerializer(serializers.ModelSerializer):
  class Meta:
    model = models.Obszary
    fields = ['id', 'nazwa']

class UserSerializer(serializers.HyperlinkedModelSerializer):
  class Meta:
    model = User
    # fields = '__all__'
    fields = ['id', 'username', 'email', 'first_name', 'last_name', 'is_staff', 'is_active']

  def validate_password(self, value: str) -> str:
          return make_password(value)

class UserPassSerializer(serializers.HyperlinkedModelSerializer):
  class Meta:
    model = User
    fields = ['password']

  def validate_password(self, value: str) -> str:
          return make_password(value)

class UserMiniSerializer(serializers.HyperlinkedModelSerializer):
  class Meta:
    model = User
    # fields = '__all__'
    fields = ['id', 'username', 'email', 'first_name', 'last_name', 'is_staff', 'is_active']

class UserObszarSerializer(serializers.HyperlinkedModelSerializer):
  obszar = ObszaryMiniSerializer(many=True, read_only=True)
  class Meta:
    model = User
    # fields = '__all__'
    fields = ['id', 'username', 'email', 'first_name', 'last_name', 'is_staff', 'is_active', 'obszar']

class ObszarySerializer(serializers.ModelSerializer):
  # idUser = UserMiniSerializer(many=False, read_only=True)
  lokalizacja = LokalizacjeMiniSerializer(many=True, read_only=True)
  class Meta:
    model = models.Obszary
    fields = ['id', 'nazwa', 'idUser', 'lokalizacja']

class ObszaryD1Serializer(serializers.ModelSerializer):
  # user = serializers.RelatedField(source='user', read_only=True)
  idUser = UserMiniSerializer(many=False, read_only=True)
  lokalizacja = LokalizacjeMiniSerializer(many=True, read_only=True)
  class Meta:
    model = models.Obszary
    fields = ['id', 'nazwa', 'idUser', 'lokalizacja']
    # depth = 1

class JednostkiBadaneSerializer(serializers.ModelSerializer):
  class Meta:
    model = models.JednostkiBadane
    fields = ['id', 'nazwa', 'skrot']

class JednostkiInterwalSerializer(serializers.ModelSerializer):
  class Meta:
    model = models.JednostkiInterwal
    fields = ['id', 'nazwa', 'skrot']

class GrupaKartaPomiarowSerializer(serializers.ModelSerializer):
  class Meta:
    model = models.GrupaKartaPomiarow
    fields = ['id', 'nazwa', 'link', 'idGrupa']


class GrupaKartaPomiarowSerializerMini(serializers.ModelSerializer):
  class Meta:
    model = models.GrupaKartaPomiarow
    fields = ['id', 'nazwa', 'link']


class GroupInstrumentsSerializer(serializers.ModelSerializer):
  karta = GrupaKartaPomiarowSerializerMini(many=True, read_only=True)
  przyrzad = PrzyrzadySerializer(many=True, read_only=True)
  class Meta:
    model = models.GroupInstruments
    fields = ['id', 'nrGrupy', 'nazwa', 'metodaKontroli', 'interwalWartosc', 'interwalJednostka', 'wielkoscBadana', 'karta', 'przyrzad']
    # fields = ['id', 'nrGrupy', 'nazwa', 'metodaKontroli', 'karta', 'przyrzad']

class GroupInstrumentsFullSerializer(serializers.ModelSerializer):
  karta = GrupaKartaPomiarowSerializerMini(many=True, read_only=True)
  przyrzad = PrzyrzadySerializerD3(many=True, read_only=True)
  wzor = PrzyrzadySerializerD3(many=True, read_only=True)
  class Meta:
    model = models.GroupInstruments
    fields = ['id', 'nrGrupy', 'nazwa', 'metodaKontroli', 'interwalWartosc', 'interwalJednostka', 'wielkoscBadana', 'karta', 'wzor', 'przyrzad']
    # fields = ['id', 'nrGrupy', 'nazwa', 'metodaKontroli', 'karta', 'przyrzad']
    depth = 3

class GroupInstruments1Serializer(serializers.ModelSerializer):
  karta = GrupaKartaPomiarowSerializerMini(many=True, read_only=True)
  wzor = PrzyrzadySerializerD3(many=True, read_only=True)
  class Meta:
    model = models.GroupInstruments
    fields = ['id', 'nrGrupy', 'nazwa', 'metodaKontroli', 'interwalWartosc', 'interwalJednostka', 'wielkoscBadana', 'karta', 'wzor']
    depth = 3

class PrzyrzadyFullSerializer(serializers.ModelSerializer):
  sprawdzeniaPlanowe = SprawdzeniaPlanoweMiniSerializer(many=True, read_only=True)
  # aktStatus = StatusSerializer(many=False, read_only=True)
  idGrupa = GroupInstruments1Serializer(many=False, read_only=True)
  swiadectwa = SwiadectwoSprawdzeniaSerializer(many=True, read_only=True)
  class Meta:
    model = models.Przyrzady
    fields = ['id', 'nr', 'nazwa', 'typ', 'nrFabryczny', 'zakres',  'idGrupa', 'idLokalizacja',
              'aktStatus', 'wzorzec', 'sprawdzeniaPlanowe', 'swiadectwa','dataOstatniejKontroli', 'dataNastepnejKontroli', 'nrAktualnegoSwiadectwa']
    depth = 3

class PrzyrzadyNrSerializer(serializers.ModelSerializer):
  class Meta:
    model = models.Przyrzady
    fields = ['nr']

class PrzyrzadyDatySerializer(serializers.ModelSerializer):
  class Meta:
    model = models.Przyrzady
    fields = ['id', 'dataOstatniejKontroli', 'dataNastepnejKontroli', 'nrAktualnegoSwiadectwa']
