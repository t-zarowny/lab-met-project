from rest_framework import serializers
from api import models
from api._serializers import grupy_serializers

class PrzyrzadyV1Serializer(serializers.ModelSerializer):
  idGrupa = grupy_serializers.GroupInstrumentsSerializer(many=False, read_only=True)
  class Meta:
    model = models.Przyrzady
    fields = ['id', 'nr', 'nazwa', 'idGrupa', 'aktStatus', 'dataOstatniejKontroli', 'dataNastepnejKontroli', 'nrAktualnegoSwiadectwa']
