from django.contrib.auth.hashers import make_password
from django.contrib.auth.models import User
from rest_framework import serializers
# from api.models import GroupInstruments, GrupaKartaPomiarow, Obszary, Lokalizacje, Przyrzady
from api import models

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
    fields = ['id', 'nazwa', 'typ', 'idGrupa', 'idLokalizacja', 'aktStatus', 'wzorzec', 'sprawdzeniaPlanowe']

class PrzyrzadySerializerD1(serializers.ModelSerializer):
  sprawdzeniaPlanowe = SprawdzeniaPlanoweMiniSerializer(many=True, read_only=True)
  class Meta:
    model = models.Przyrzady
    fields = ['id', 'nazwa', 'typ', 'idGrupa', 'idLokalizacja', 'aktStatus', 'wzorzec', 'sprawdzeniaPlanowe']
    depth = 1

class PrzyrzadySerializerD2(serializers.ModelSerializer):
  sprawdzeniaPlanowe = SprawdzeniaPlanoweMiniSerializer(many=True, read_only=True)
  class Meta:
    model = models.Przyrzady
    fields = ['id', 'nazwa', 'typ', 'idGrupa', 'idLokalizacja', 'aktStatus', 'wzorzec', 'sprawdzeniaPlanowe']
    depth = 2

class PrzyrzadySerializerD3(serializers.ModelSerializer):
  sprawdzeniaPlanowe = SprawdzeniaPlanoweMiniSerializer(many=True, read_only=True)
  class Meta:
    model = models.Przyrzady
    fields = ['id', 'nazwa', 'typ', 'idGrupa', 'idLokalizacja', 'aktStatus', 'wzorzec', 'sprawdzeniaPlanowe']
    depth = 3

class PrzyrzadyFullSerializer(serializers.ModelSerializer):
  sprawdzeniaPlanowe = SprawdzeniaPlanoweMiniSerializer(many=True, read_only=True)
  # aktStatus = StatusSerializer(many=False, read_only=True)
  class Meta:
    model = models.Przyrzady
    fields = ['id', 'nazwa', 'typ', 'idGrupa', 'idLokalizacja', 'aktStatus', 'wzorzec', 'sprawdzeniaPlanowe']
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
    fields = ['id', 'nazwa', 'metodaKontroli', 'interwalWartosc', 'interwalJednostka', 'jednostkaNazwa', 'jednostkaSkrot', 'karta', 'przyrzad']


