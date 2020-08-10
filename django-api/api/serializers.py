from django.contrib.auth.models import User
from rest_framework import serializers
from api.models import GroupInstruments, GrupaKartaPomiarow


class UserSerializer(serializers.HyperlinkedModelSerializer):
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

