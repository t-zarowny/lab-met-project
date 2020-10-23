from django.contrib.auth.hashers import make_password
from django.contrib.auth.models import User
from rest_framework import serializers
# from api.models import GroupInstruments, GrupaKartaPomiarow, Obszary, Lokalizacje, Przyrzady
from api import models

class SprawdzeniaPlanoweSerializer(serializers.ModelSerializer):
  class Meta:
    model = models.SprawdzeniaPlanowe
    fields = ['idPrzyrzad', 'dataPlanowa']

class SprawdzeniaPlanoweMiniSerializer(serializers.ModelSerializer):
  class Meta:
    model = models.SprawdzeniaPlanowe
    fields = ['dataPlanowa']

class PrzyrzadySerializer(serializers.ModelSerializer):
  sprawdzenia_planowe = SprawdzeniaPlanoweMiniSerializer(many=True, read_only=True)
  class Meta:
    model = models.Przyrzady
    fields = ['id', 'nazwa', 'typ', 'idGrupa', 'idLokalizacja', 'aktStatus', 'wzorzec', 'sprawdzenia_planowe']

class LokalizacjeSerializer(serializers.ModelSerializer):
  przyrzad = PrzyrzadySerializer(many=True, read_only=True)
  class Meta:
    model = models.Lokalizacje
    fields = ['id', 'nazwa', 'idObszar', 'przyrzad']

class LokalizacjeMiniSerializer(serializers.ModelSerializer):
  class Meta:
    model = models.Lokalizacje
    fields = ['id', 'nazwa']

class ObszarySerializer(serializers.ModelSerializer):
  lokalizacja = LokalizacjeMiniSerializer(many=True, read_only=True)
  class Meta:
    model = models.Obszary
    fields = ['id', 'nazwa', 'idUser', 'lokalizacja']

class ObszaryMiniSerializer(serializers.ModelSerializer):
  class Meta:
    model = models.Obszary
    fields = ['id', 'nazwa']

class UserSerializer(serializers.HyperlinkedModelSerializer):
  class Meta:
    model = User
    # fields = '__all__'
    fields = ['id', 'username', 'email', 'first_name', 'last_name', 'is_staff', 'is_active']

  # def create(self, validated_data):
  #   user = User.objects.create(
  #     username=validated_data['username'],
  #     email=validated_data['email'],
  #     first_name=validated_data['first_name'],
  #     last_name=validated_data['last_name'],
  #     is_staff=validated_data['is_staff'],
  #     is_active=validated_data['is_active'],
  #     password=make_password(validated_data['password'])
  #   )
  #   user.save()
  #   return user

  def validate_password(self, value: str) -> str:
          return make_password(value)

class UserPassSerializer(serializers.HyperlinkedModelSerializer):
  class Meta:
    model = User
    # fields = '__all__'
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



