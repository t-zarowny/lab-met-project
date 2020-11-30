from rest_framework import serializers
from api import models

class GroupInstrumentsSerializer(serializers.ModelSerializer):
  # karta = GrupaKartaPomiarowSerializerMini(many=True, read_only=True)
  # przyrzad = PrzyrzadySerializer(many=True, read_only=True)
  class Meta:
    model = models.GroupInstruments
    fields = ['id', 'nrGrupy']
