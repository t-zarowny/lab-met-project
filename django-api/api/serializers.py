from django.contrib.auth.hashers import make_password
from django.contrib.auth.models import User
from rest_framework import serializers
from api.models import GroupInstruments, GrupaKartaPomiarow


class UserSerializer(serializers.HyperlinkedModelSerializer):
  class Meta:
    model = User
    fields = '__all__'
    # fields = ['id', 'username', 'email', 'first_name', 'last_name', 'is_staff', 'is_active']

  def create(self, validated_data):
    user = User.objects.create(
      username=validated_data['username'],
      email=validated_data['email'],
      first_name=validated_data['first_name'],
      last_name=validated_data['last_name'],
      is_staff=validated_data['is_staff'],
      is_active=validated_data['is_active'],
      password=make_password(validated_data['password'])
    )
    user.save()
    return user

class UserMiniSerializer(serializers.HyperlinkedModelSerializer):
  class Meta:
    model = User
    # fields = '__all__'
    fields = ['id', 'username', 'email', 'first_name', 'last_name', 'is_staff', 'is_active']

class GrupaKartaPomiarowSerializer(serializers.ModelSerializer):
  class Meta:
    model = GrupaKartaPomiarow
    fields = ['id', 'nazwa', 'link', 'idGrupa']


class GrupaKartaPomiarowSerializerMini(serializers.ModelSerializer):
  class Meta:
    model = GrupaKartaPomiarow
    fields = ['id', 'nazwa', 'link']


class GroupInstrumentsSerializer(serializers.ModelSerializer):
  karta = GrupaKartaPomiarowSerializerMini(many=True, read_only=True)

  class Meta:
    model = GroupInstruments
    fields = ['id', 'nazwa', 'metodaKontroli', 'karta']
