from rest_framework import serializers
from api import models
from api._serializers import przyrzady_serializers

class SwiadectwoSprawdzeniaHarmonogramSerializer(serializers.ModelSerializer):
  przedmiotId = przyrzady_serializers.PrzyrzadyV1Serializer(many=False, read_only=True)
  class Meta:
    model = models.SwiadectwoSprawdzenia
    fields = ['id','nrSwiadectwa','przedmiotId', 'dataSprawdzenia','dataNastepnejKontroli','wynikSprawdzenia']
